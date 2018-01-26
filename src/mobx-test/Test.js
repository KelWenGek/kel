// import { types, onSnapshot } from 'mobx-state-tree';


// const Todo = types.model('Todo', {
//     title: types.string,
//     done: false
// }).actions(self => ({
//     toggle() {
//         self.done = !self.done;
//     }
// }));


// const Store = types.model('Store', {
//     todos: types.array(Todo)
// });


// const store = Store.create({
//     todos: [{ title: 'Get coffee' }]
// });


// onSnapshot(store, snapshot => console.dir(snapshot));

// store.todos[0].toggle();
import React, { Component } from 'react'
import { render } from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

let timerData = observable({
    secondsPassed: 0
});


const Timer = observer(class Timer extends Component {

    @observable secondsPassed = 0;

    componentWillMount() {
        setInterval(() => {
            this.secondsPassed++;
        }, 1000);
    }

    render() {
        return (
            <span>Seconds passed : {this.secondsPassed}</span>
        )
    }
});
// const Timer = observer(({ timerData }) =>
//     <span>Seconds passed : {timerData.secondsPassed}</span>
// )



render(<Timer />, document.getElementById('app'))