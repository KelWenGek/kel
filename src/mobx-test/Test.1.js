import { observable, computed, autorun } from 'mobx';

// let numbers = observable([1, 2, 3]);
// let sum = computed(() => numbers.reduce((a, b) => a + b, 0));
// let disposer = autorun(() => console.log(sum.get()));

// numbers.push(4);


const age = observable(10);
const dispose = autorun(() => {
    if (age.get() < 0) {
        throw new Error('Age should not be negative');
    }
    console.log("Age", age.get());
});

age.set(18);
age.set(-10);
age.set(5);
dispose.onError(e => {
    alert('Please enter a valid age');
});

age.set(-5);