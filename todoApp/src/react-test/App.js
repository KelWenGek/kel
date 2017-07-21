import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';



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

    render() {
        let { word, dispatch } = this.props;
        return (
            <div>
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