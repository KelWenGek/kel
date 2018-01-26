const server = require('express')();
const Vue = require('vue');
let fs;
const renderer = require('vue-server-renderer').createRenderer({
    template: (fs = require('fs')).readFileSync('./index.template.html', 'utf-8')
});

const createApp = ctx => new Vue({
    data: {
        url: ctx.url,
        count: 0
    },
    methods: {
        add: function () {
            this.count++;
        }
    },
    template: `<div>访问的Url是:{{url}},count:{{count}}<button @click="add">add</button></div>`
});

server.get('*', (req, res) => {
    const app = createApp({ url: req.url });

    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        res.send(html);
    });
});

server.listen(3000);
