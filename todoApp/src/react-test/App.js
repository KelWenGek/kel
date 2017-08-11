import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import style from './wave.scss';


const withLog = WrappedComponent => {
    console.log('withlog');
    return class HelloHoc extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
}



// function curry(fn) {
//     return function curried() {
//         var context = this, args = [].slice.call(arguments);
//         return args.length >= fn.length ? fn.apply(context, args) : function () {
//             var rest = [].slice.call(arguments);
//             return curried.apply(context, args.concat(rest));
//         };
//     };
// }

// function add(a, b, c) {
//     return a + b + c;
// }


// const curriedAdd = curry(add);
// console.log(curriedAdd(1)(2)(3));
// console.log(curriedAdd(1)(2, 3));
// console.log(curriedAdd(1));


// let border = {
//     style: 'border',
//     generate: function (length, measure, type, color) {
//         return [this.style + ':', length + measure, type, color].join(' ') + ';';
//     }
// };

// border.curriedGenerate = curry(border.generate);
// console.log(border.curriedGenerate(2)('px')('solid')('#369'));


//想测试一下合并提交的文字信息
function max(/* variable argumengs */) {
    var args = [].slice.call(arguments);
    return Math.max.apply(null, args);
}

function range(start, end, step) {
    var stop = Math.max(start, end), start = Math.min(start, end), set = [];
    step = typeof step !== 'undefined' ? step : 1;
    for (var i = start; i <= stop; i += step) {
        set.push(i);
    }
    return set;
}

function curry(fn, n) {
    var arity = n || fn.length;
    return function curried() {
        var args = [].slice.call(arguments), context = this;
        return args.length >= arity ? fn.apply(context, args) : function () {
            var rest = [].slice.call(arguments);
            return curried.apply(context, args.concat(rest));
        };
    };
}

const curriedRange = curry(range, 2);
console.log(curriedRange(1)(10, 2));


var delay = 64;
var p = document.getElementById("p");
// var draw = "for(n+=7,i=delay,P='p.\\n';i-=1/delay;P+=P[i%2?(i%2*j-j+n/delay^j)&1:2])j=delay/i;p.innerHTML=P";
var draw = function () {
    var i = delay; // < ---------------
    var P = 'p.\n';
    var j;
    for (n += 7; i > 0; P += P[i % 2 ? (i % 2 * j - j + n / delay ^ j) & 1 : 2]) {
        j = delay / i; p.innerHTML = P;
        i -= 1 / delay;
    }
};
// var n = setInterval(draw, delay);
//父传给子
class Parent extends Component {
    state = {
        value: ''
    }
    constructor() {
        super();
    }

    handleChange = e => {
        this.value = e.target.value;
    }

    handleClick = () => {
        this.setState({
            value: this.value
        })
    }

    render() {
        return (
            <div>
                我是parent
                <input onChange={this.handleChange} />
                <div className="button" onClick={this.handleClick}>通知</div>
                <div>
                    <Child value={this.state.value} />
                </div>
            </div>
        );
    }
}


class Child extends Component {
    render() {
        const { value } = this.props;
        return (
            <div>
                我是Child，得到传下来的值：{value}
            </div>
        );
    }
}



//子传给父

class Parent1 extends Component {
    state = { value: '' }
    constructor() {
        super();
    }

    setValue = val => this.setState({ value: val })

    render() {
        return (
            <div>
                <div>
                    我是Parent,Value是:{this.state.value}
                </div>
                <Child1 setValue={this.setValue}></Child1>
            </div>
        );
    }
}

class Child1 extends Component {
    handleChange = e => {
        this.value = e.target.value;
    }

    handleClick = () => {
        const { setValue } = this.props;
        setValue(this.value);
    }

    render() {
        return (
            <div>
                我是Child
                <div className="card">
                    state 定义在 parent
                    <input onChange={this.handleChange} />
                    <div className="button" onClick={this.handleClick}>通知</div>
                </div>
            </div>
        );
    }
}

//state 定义在子组件里

class Parent2 extends Component {
    onChange = value => console.log(value, '来自child的value变化')
    render() {
        return (
            <div>
                <div>我是parent
                <Child2 onChange={this.onChange} />
                </div>
            </div>
        )
    }
}

class Child2 extends Component {
    state = { childValue: '' }
    constructor() {
        super();
    }
    childValChange = e => {
        this.childVal = e.target.value;
    }

    childValDispatch = () => {
        const { onChange } = this.props;
        this.setState({
            childValue: this.childVal
        }, () => onChange(this.state.childValue));
    }
    render() {
        return (
            <div>
                我是Child
                <div className="card">
                    state 定义在 child
                    <input onChange={this.childValChange} />
                    <button className="button" onClick={this.childValDispatch}>通知</button>
                </div>
            </div>
        );
    }
}


//兄弟组件通信

class Container extends Component {
    state = { value: '' }
    constructor() {
        super();
    }

    setValue = value => this.setState({ value })

    render() {
        return (
            <div>
                <A setValue={this.setValue}></A>
                <B value={this.state.value}></B>
            </div>
        )
    }
}

class A extends Component {
    handleChange = e => {
        this.value = e.target.value;
    }
    handleClick = () => {
        const { setValue } = this.props;
        setValue(this.value);
    }
    render() {
        return (
            <div className="card">
                我是Brother A, <input onChange={this.handleChange} />
                <button className="button" onClick={this.handleClick}>通知</button>
            </div>
        );
    }
}
const B = props => (
    <div className="card">
        我是Brother B, value是：
        {props.value}
    </div>
);

//利用context

class Context extends Component {

    static childContextTypes = {
        value: PropTypes.string,
        setValue: PropTypes.func
    }

    state = { value: '' }

    constructor() {
        super();
    }

    setValue = value => this.setState({ value })

    getChildContext() {
        return {
            value: this.state.value,
            setValue: this.setValue
        }
    }

    render() {
        return (
            <div>
                <AParent />
                <BParent />
            </div>
        );
    }
}

class AParent extends Component {
    render() {
        return (
            <div>
                <A1 />
            </div>
        );
    }
}

class A1 extends Component {
    static contextTypes = {
        setValue: PropTypes.func
    }

    handleChange = e => {
        this.value = e.target.value;
    }

    handleClick = () => {
        const { setValue } = this.context; //从context中获取该属性
        setValue(this.value);
    }

    render() {
        return (
            <div>
                我是Parent A下的 A,<input onChange={this.handleChange} />
                <button onClick={this.handleClick}>通知</button>
            </div>
        );
    }
}

class BParent extends Component {
    render() {
        return (
            <div>
                <B1 />
            </div>
        );
    }
}


class B1 extends Component {

    static contextTypes = {
        value: PropTypes.string
    }

    render() {
        return (
            <div>
                我是Parent B下的 B,value是:{this.context.value}
            </div>
        );
    }
}

class EventEmitter {
    _event = {}

    on(eventName, handle) {
        let listeners = this._event[eventName];
        if (!listeners || !listeners.length) {
            this._event[eventName] = [handle];
            return;
        }
        listeners.push(handle);
    }

    off(eventName, handle) {
        let listeners = this._event[eventName];
        this._event[eventName] = this.listeners.filter(l => l !== handle);
    }

    emit(eventName, ...args) {
        const listeners = this._event[eventName];
        if (listeners && listeners.length) {
            for (const l of listeners) {
                l(...args);
            }
        }
    }
}

const event = new EventEmitter;

const Listener = () => (
    <div>
        <A2 />
        <B2 />
    </div>
);

class A2 extends Component {

    handleChange = e => {
        this.value = e.target.value;
    }

    handleClick = () => event.emit('dispatch', this.value)

    render() {
        return (
            <div>
                我是Brother A, <input onChange={this.handleChange} />
                <button onClick={this.handleClick}>通知</button>
            </div>
        );
    }
}

class B2 extends Component {
    state = { value: '' }

    componentDidMount() {
        event.on('dispatch', this.valueChange);
    }

    componentWillUnmount() {
        event.off('dispatch', this.valueChange);
    }

    valueChange = value => this.setState({ value })


    render() {
        return (
            <div>
                我是Brother B,value是:{this.state.value}
            </div>
        );
    }


}





//@flow
@compose(connect(state => ({
    word: state.word
}), null, (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, dispatchProps, ownProps, { word: stateProps.word + 'custom' })
}, {
        getDisplayName: name => `Kel(${name})`
    }), withLog)
export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'kel',
            counter: 0
        };
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.counter !== nextState.counter;
    // }

    //测试提交参数
    //又加了一段注释
    //稍后重置
    handleClick = () => {
        console.log('not bind this');
        console.log(this);

        this.setState((prevState) => {
            return {
                counter: prevState.counter + 1
            }
        })
    }
    delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
    async f() {
        await this.delay(1000);
        console.log('after 1 second');
        await this.delay(2000);
        console.log('after another 2 seconds');
        await this.delay(3000);
        console.log('after another 3 seconds');
        return 'done';
        // throw new Error('error');
        // return 'hello world';
        // return await 1;
    }

    render() {
        this.f().then(v => console.log(v)).catch(v => console.log(v));
        let { word, dispatch } = this.props;
        return (
            <div>

                {/* <Parent2 /> */}
                {/* <Parent1 /> */}
                {/* <Container /> */}

                {/* <Context /> */}

                <Listener />
                <div className="container">
                    <div className="wave"></div>
                </div>
                <div>counter:{this.state.counter}</div>
                <div>{`Hello ${this.props.name} with the following words:`}</div>
                <p>{word}</p>
                <button
                    onClick={() => {
                        dispatch({ type: 'job' });
                    }}
                >
                    show my job
                </button>
                <button
                    onClick={() => {
                        dispatch((dispatch) => {
                            dispatch({ type: 'think' });
                            setTimeout(() => dispatch({ type: 'hobby' }), 3000);
                        });
                    }}
                >
                    show my hobby
                </button>
                <button onClick={this.handleClick}>
                    handle click
                </button>
            </div>
        );
    }
};