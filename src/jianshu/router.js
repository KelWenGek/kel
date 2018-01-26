const path = require('path');
const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const superagent = require('superagent');
const charset = require('superagent-charset');
const async = require('async');
const cheerio = require('cheerio');
const ejsExcel = require('ejsexcel');
const config = require('./config');
charset(superagent);
axios.defaults.baseURL = 'http://www.jianshu.com/'

router.get('/', (req, res, next) => {
    // console.log(req);
    res.render('index', { title: 'Express' });
});

router.post('/spider', (req, res, next) => {
    let startTime = Number(req.body.startTime),
        endTime = Number(req.body.endTime);
    crawlUserCenter(res, startTime, endTime);
});


let _baseUrl = "http://www.jianshu.com",
    _currentCount = 0,
    _errorUrls = [];

const fetchUrl = (url, callback) => {
    let fetchStart = Date.now();
    superagent
        .get(url)
        .charset('utf-8')
        .end((err, res) => {
            if (err) {
                _errorUrls.push(url);
                console.log(`抓取[${url}]出错`);
                return false;
            }
            let fetchSpend = Date.now() - fetchStart;
            console.log(`抓取${url}成功,耗时${fetchSpend}毫秒,现在并发数为${_currentCount}`);
            callback(res.text);
        });
};


const fetchHtmlFromUrl = async (url, callback) => {
    let fetchStart = Date.now();
    try {
        let { data: html } = await axios.get(url);
        let fetchSpend = Date.now() - fetchStart;
        console.log(`抓取${url}成功,耗时${fetchSpend}毫秒,现在并发数为${_currentCount}`);
        callback(html);
    } catch (e) {
        _errorUrls.push(url);
        console.log(`抓取[${url}]出错`);
        return false;
    }

};

const removeSame = arr => {
    const map = {};
    const newArr = [];
    arr.forEach(i => {
        if (!map[i.title]) {
            newArr.push(i);
            map[i.title] = true;
        }
    });
    return newArr;
}


const crawlUserCenterByAxios = async (res, startTime, endTime) => {
    const centerUrlArr = config.data;
    // return await axios.get(centerUrlArr[0].url);
    const responses = await axios.all(centerUrlArr.map(item => axios.get(item.url)));
    console.log(responses[0].data);
    console.log(responses[0].status);
    responses.forEach((response, idx) => response.status === 200 && fs.writeFileSync(path.resolve(__dirname, `html${idx}.html`), response.data));
    res.json({
        content: '请求成功'
    });
    // .then(responses => {
    //     console.log(responses[0].data);
    //     responses.forEach((response, idx) => fs.writeFileSync(path.resolve(__dirname, `html${idx}.html`), response.data));
    //     res.json({
    //         content: '请求成功'
    //     });

    // });
}

const crawlUserCenter = (res, startTime, endTime) => {
    const centerUrlArr = config.data;
    async.concatLimit(centerUrlArr, 5,
        (elem, callback) => {
            _currentCount++;
            fetchUrl(elem.url, (html) => {
                const $ = cheerio.load(html);
                const detailUrlArr = getDetailUrlCollections($, startTime, endTime);
                callback(null, detailUrlArr);
            })
        },
        (err, detailUrlArr) => {
            _currentCount = 0;
            try {
                crawArticleDetail(detailUrlArr, res);
            } catch (e) {
                console.log(e);
            }
            return false;
        });
};


const getDetailUrlCollections = ($, startTime, endTime) => {
    let articleList = $('#list-container .note-list li'), detailUrlCollections = [];
    for (let i = 0, article, len = articleList.length; i < len; i++) {
        article = articleList.eq(i);
        let createAt = article.find('.author .time').attr('data-shared-at'),
            createAtTime = new Date(createAt).getTime();
        if (createAtTime >= startTime && createAtTime <= endTime) {
            let articleUrl = article.find('.title').attr('href');
            detailUrlCollections.push([_baseUrl, articleUrl].join(''));
        }
    }
    return detailUrlCollections;
};


const crawArticleDetail = (detailUrls, res) => {
    // console.log(detailUrls);
    // return;
    // const detailUrlArr = spreadDetailUrl(detailUrls);
    async.mapLimit(detailUrls, 5, (url, callback) => {
        _currentCount++;
        fetchUrl(url, (html) => {
            let $ = cheerio.load(html, { decodeEntities: false });
            const data = {
                title: $('.article .title').html(),
                wordage: $('.article .wordage').html(),
                publishTime: $('.article .publish-time').html(),
                author: $('.author .name a').html()
            };
            callback(null, data);
        })
    }, (err, resData) => {
        let result = resData.length ? removeSame(resData) : resData;
        let sumUpData = result.length ? sumUpResult(result) : [];
        res.json({
            data: result,
            sumUpData
        });
        createExcel(result, sumUpData);
        console.info(`抓取数据完毕,共抓取了${result.length}篇文章,其中错误数为${_errorUrls.length}条`);
        _errorUrls.length > 0 && console.info(`其中错误url为${_errorUrls.join('\n')}`);
        return false;
    })
};


const createExcel = (dataArr, sumUpData) => {
    const exlBuf = fs.readFileSync(config.excelFile.path + 'report.xlsx');
    const data = [[{ "table_name": "7班简书统计表", "date": formatTime() }], dataArr, sumUpData];
    ejsExcel.renderExcel(exlBuf, data).then(exlBuf2 => {
        fs.writeFileSync(config.excelFile.path + "report2.xlsx", exlBuf2);
        console.log("生成excel表成功");
    }).catch(err => {
        console.log("生成excel表失败");
    })

};

const formatTime = () => {
    let timestamp = new Date();
    let y = timestamp.getFullYear();
    let mon = timestamp.getMonth() + 1;
    let day = timestamp.getDate();
    mon = Number(mon) > 10 ? mon : '0' + mon;
    day = Number(mon) > 10 ? day : '0' + day;
    return y + '-' + mon + '-' + day;
}

const spreadDetailUrl = (urls) => {
    const urlCollections = [];
    urls.forEach((item) => {
        item.forEach((url) => {
            urlCollections.push(url);
        });
    });
    return urlCollections;
}


const sumUpResult = (dataArr) => {
    const obj = {},
        arr = [];
    dataArr.forEach((item, index) => {
        const author = item.author;
        const wordage = item.wordage.match(/\d+/g)[0];
        if (obj[author]) {
            obj[author].push(wordage);
        } else {
            obj[author] = [wordage];
        }
    });
    for (let name in obj) {
        const dataObj = {};
        dataObj.name = name;
        dataObj.num = obj[name].length;
        dataObj.wordageNum = obj[name].reduce((count, v) => Number(count) + Number(v), 0);
        arr.push(dataObj);
    }
    return arr;
}


module.exports = router;