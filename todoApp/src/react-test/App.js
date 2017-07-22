import React, { Component } from 'react';
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


//@flow
@compose(connect(state => ({
    word: state.word
}), null, (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, dispatchProps, ownProps, { word: stateProps.word + 'custom' })
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
        // await this.delay(1000);
        // await this.delay(2000);
        // await this.delay(3000);
        // return 'done';
        // throw new Error('error');
        // return 'hello world';
        return await 1;
    }

    render() {
        this.f().then(v => console.log(v)).catch(v => console.log(v));
        let { word, dispatch } = this.props;
        return (
            <div>
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