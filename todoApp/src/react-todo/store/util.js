import { OrderedSet, OrderedMap } from 'immutable';

export let util = {
  uuid: function () {
    var i,
      random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12
        ? 4
        : (i === 16
          ? (random & 3 | 8)
          : random)).toString(16);
    }

    return uuid;
  },

  pluralize: function (count, word) {
    return count === 1
      ? word
      : word + 's';
  },

  store: function (namespace, data) {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var store = localStorage.getItem(namespace);
    return OrderedMap((store && JSON.parse(store)) || {});
  }
};

export class Model {
  constructor(ns) {
    this.ns = ns;
    this.todos = util.store(ns);
  }

  set(datas) {
    util.store(this.ns, datas
      ? datas
      : this.todos);
  }

  add({ text }) {
    const id = util.uuid();
    if (this.todos.every((todo, id) => todo.text !== text)) {
      this.todos = this.todos.set(id, {
        id,
        text,
        completed: false
      });
    } else {
      console.log('不要重复添加');
    }

    this.set();

    return this.todos;
  }

  toggle({ id }) {
    this.todos = this
      .todos.update(id, todo => {
        return Object.assign({}, todo, {
          completed: !todo.completed
        });
      });

    this.set();
    return this.todos;

  }

  toggleAll({ checked }) {
    this.todos = this.todos.map(todo => {
      return Object.assign({}, todo, { completed: checked });
    });
    this.set();
    return this.todos;
  }

  remove({ id }) {
    this.todos = this.todos.delete(id);
    this.set();
    return this.todos;
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.set();
    return this.todos;
  }

  save({ id, text }) {
    this.todos = this
      .todos.update(id, todo => {
        return Object.assign({}, todo, { text });
      })

    this.set();
    return this.todos;
  }
}
