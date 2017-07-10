import { OrderedSet } from 'immutable';

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
    return OrderedSet((store && JSON.parse(store)));
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
    if (this.todos.every(todo => todo.text !== text)) {
      this.todos = this.todos.add({
        id: util.uuid(),
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
      .todos
      .map(todo => {
        let _todo;
        if (todo.id === id) {
          _todo = Object.assign({}, todo, {
            completed: !todo.completed
          });
        } else {
          _todo = todo;
        }
        return _todo;
      });

    this.set();

    return this.todos;

  }

  remove({ id }) {
    this.todos = this.todos.delete(this.todos.find(todo => todo.id === id));

    this.set();
    return this.todos;
  }

  save({ id, text }) {
    this.todos = this
      .todos
      .map(todo => {
        let _todo;
        if (todo.id === id) {
          _todo = Object.assign({}, todo, { text });
        } else {
          _todo = todo;
        }
        return _todo;
      });
    this.set();
    return this.todos;
  }
}
