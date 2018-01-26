import React, { Component } from 'react';
import { types, onSnapshot } from 'mobx-state-tree';
import { Provider, observer, inject } from 'mobx-react';


const Counter = types.model('Counter', {
    count: types.number
}).actions(store => ({
    increase() {
        store.count++;
    }
}))

export const store = Counter.create({
    count: 0
});

@inject(({ store }) => ({ count: store.count, increase: store.increase }))
export default class App extends Component {
    render() {
        let { count, increase } = this.props;
        return (
            <div onClick={increase}>
                {count}
            </div>
        );
    }
}