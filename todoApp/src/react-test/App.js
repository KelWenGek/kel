
import React, { Component } from 'react';
import { connect } from 'react-redux';

//@flow
export default connect(state => ({
    word: state.word
}))(class Hello extends Component {

    render() {
        let { word, dispatch } = this.props;
        return (
            <div>
                <div>Hello Kel with the following words:</div>
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
            </div>
        );
    }
})