let css=require('./index.styl');
console.log(css);
const toString = Object.prototype.toString;
const isFunction = o => toString.call(o) === '[object Function]';
const isArray = o => toString.call(o) === '[object Array]';
const flip = fn => (...args) => fn.apply(this, args.reverse());
const rightCurry = (fn, n = fn.length) => {
    let reversedFn = flip(fn);
    return function curried(...args) {
        let context = this;
        return args.length >= n ? reversedFn.apply(context, args.slice(0, n)) : (...argsArr) => curried.apply(context, args.concat(argsArr));
    }
}
function useWith(fn, ...txfn) {
    const _transform = (args) => args.map((arg, i) => txfn[i](arg));
    return function (...argArr) {
        let targs = argArr.slice(0, txfn.length),
            remaining = argArr.slice(txfn.length);
        return fn.apply(this, _transform(targs).concat(remaining));
    }
}
const filterWith = rightCurry((list, fn) => list.filter(fn));
const greaterThanOrEqualTo = rightCurry((a, b) => a >= b);
const getWith = rightCurry((obj, prop) => obj[prop]);
const thirtyDaysAgo = (new Date()).getTime() - (86400000 * 30);
const within30Days = useWith(greaterThanOrEqualTo(thirtyDaysAgo), getWith('published'));
const dates = [
    { id: 1, published: (new Date('2017-07-29')).getTime() },
    { id: 2, published: (new Date('2017-05-01')).getTime() }
];
const list = [
    { id: 1, author: 'Dave', age: 40, tag: ['functional programming'] },
    { id: 2, author: 'Dan', age: 35, tag: ['promises', 'es6'] },
    { id: 3, author: 'Kurt', age: 44, tag: ['promises', 'futures'] },
    { id: 4, author: 'Josh', age: 33, tag: ['es6', 'destructuring'] },
    { id: 5, author: 'Kel', age: 27, tag: ['promises', 'destructuring'] }

];


function group(list, prop) {
    return list.reduce((grouped, item) => {
        let key = isFunction(prop) ? prop.apply(this, [item]) : item[prop];
        grouped[key] = grouped[key] || [];
        grouped[key].push(item);
        return grouped;
    }, {});
}

const groupBy = rightCurry(group);
const groupBy40 = groupBy(item => item.age < 40 ? 'under40' : 'over40');
const groupByTag = groupBy('tag');

const mapWith = rightCurry((list, fn) => list.map(fn));
function pair(list, listFn) {
    isArray(list) || (list = [list]);
    (isFunction(listFn) || isArray(listFn)) || (listFn = [listFn]);
    return flatMapWith(itemLeft => mapWith(itemRight => [itemLeft, itemRight])(isFunction(listFn) ? listFn.call(this, itemLeft) : listFn))(list);
}
const pairWith = rightCurry(pair);

const flatten = (list) => list.reduce((items, item) => isArray(item) ? items.concat(item) : item, []);

const flatMap = (list, fn) => flatten(list.map(fn));
const flatMapWith = rightCurry(flatMap);

const bytags = pairWith(getWith('tag'))(list);

const groupedtags = groupBy(getWith(1), bytags);

function mapObject(obj, fn) {
    return Object.keys(obj).reduce(function (res, key) {
        res[key] = fn.apply(this, [key, obj[key]]);
        return res;
    }, {});
}

const mapObjectWith = rightCurry(mapObject);





function pluck(list, prop) {
    return mapWith(getWith(prop))(list);
}
const pluckWith = rightCurry(pluck);

function getPostRecords(prop, pair) {
    return pluckWith(0)(pair);
}


const finalgroups = mapObjectWith(getPostRecords)(groupedtags);

console.log(groupedtags);
console.log(finalgroups);






