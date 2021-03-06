import { observable, action } from 'mobx';
class MyState {

    @observable num1 = 0;
    @observable num2 = 100;


    @action addNum1 = () => this.num1++;
    @action addNum2 = () => this.num2++;

    @computed get total() {
        return this.num1 + this.num2;
    }
}

const newState = new MyState;