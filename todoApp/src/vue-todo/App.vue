<template>
  <div>
    <div :class="$style.todoapp">
      <header class="header">
        <h1>todos</h1>
        <input :class="$style['new-todo']" type="text" placeholder="What needs to be done?" @keyup.enter="addTodo($event)">
        <input :class="$style['toggle-all']" :style="{display:todoCount===0?'none':'block'}" type="checkbox" :checked="isToggleAll"
          @click="toggleAll($event)">
      </header>
      <div :class="$style.main">
        <transition-group tag="ul" :class="$style['todo-list']" name="demo" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight" mode="out-in">
          <li :class="{[$style.editing]:editing===todo.id,[$style.completed]:todo.completed}" v-for="todo in visibleTodoList" :key="todo.id">
            <div :class="$style.view">
              <input type="checkbox" :class="$style.toggle" :checked="todo.completed" @click="toggleTodo(todo.id)">
              <label @dblclick="edit(todo.id)">{{todo.text}}</label>
              <div :class="$style.destroy" @click="remove(todo.id)"></div>
            </div>
            <input type="text" v-todo-focus :class="$style.edit" :value="todo.text" @keyup.enter="save(todo.id,$event)" />
          </li>
        </transition-group>
      </div>
      <footer :class="$style.footer" :style="{display:todoCount===0?'none':'block'}">
        <span :class="$style['todo-count']">
          {{todoCount+' item'+(todoCount>1?'s':'')+' left'}}
        </span>
        <ul :class="$style.filters">
          <li v-for="filter in filterStrs">
            <a :class="{[$style.selected]:filter===curFilter}" href="javascript:void(0)" @click="doFilter(filter)">
               {{filter}}
            </a>
          </li>
        </ul>
        <a :class="$style['clear-completed']" @click="clear">
            clear-completed
        </a>
      </footer>
    </div>
    <div :class="$style.info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="javascript:void(0)">Kel Wen</a></p>
    </div>
  </div>
</template>
<script>
  //now head to develop branch

  const getUuid = function () {
    var i, random;
    var uuid = '';
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
        .toString(16);
    }
    return uuid;
  };
  const utils = {
    store(namespace, data) {
      if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
      }

      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || [];
    }
  }
  const NAMESPACE = Symbol.for('vue-todo');
  //过滤器
  const filters = [Symbol.for('All'), Symbol.for('Completed'), Symbol.for('Active')];
  const [F_ALL, F_COMPLETED, F_ACTIVE] = filters;
  import { OrderedSet } from 'immutable';
  export default {
    name: 'app',
    data() {
      return {
        todos: OrderedSet(utils.store(Symbol.keyFor(NAMESPACE))),
        curFilter: Symbol.keyFor(F_ALL),
        filters: filters,
        editing: ''
      }
    },
    computed: {
      filterStrs() {
        return this.filters.map(filter => Symbol.keyFor(filter));
      },
      visibleTodoList() {
        let curFilter = Symbol.for(this.curFilter);
        switch (curFilter) {
          case F_ALL:
            return this.todos.toJS();
          case F_COMPLETED:
            return this.todos.filter(todo => todo.completed).toJS();
          case F_ACTIVE:
            return this.todos.filter(todo => !todo.completed).toJS();
          default:
            return this.todos.toJS();
        }
      },
      todoCount() {
        return this.todos.size;
      },
      isToggleAll: {
        get() {
          return this.todos.filter(todo => !todo.completed).size === 0;
        },
        set(val) {
          this.todos = this.todos.map(todo => {
            return Object.assign(todo, {
              completed: val
            });
          });
        }
      }
    },
    created() {

    },
    methods: {
      store() {
        utils.store(Symbol.keyFor(NAMESPACE), this.todos);
      },
      addTodo(event) {
        let text = event.target.value.trim();
        if (!text || this.todos.some(todo => todo.text === text)) {
          console.log('do not duplicate the todo');
          return false;
        }
        this.todos = this.todos.add({
          text,
          completed: false,
          id: getUuid()
        });
        this.store();
        event.target.value = '';
      },
      toggleTodo(id) {
        this.todos = this.todos.map(todo => {
          let _todo;
          if (todo.id === id) {
            _todo = Object.assign({
              ...todo,
            }, {
                completed: !todo.completed
              });
          } else {
            _todo = todo;
          }
          return _todo;
        });
        this.store();
      },
      toggleAll(event) {
        this.isToggleAll = event.target.checked;
        this.store();
      },
      remove(id) {
        this.todos = this.todos.delete(this.todos.find(todo => todo.id === id));
        this.store();
      },
      edit(id) {
        this.editing = id;
      },
      save(id, event) {
        let text = event.target.value;
        if (!text) {
          return this.remove(id);
        }
        if (this.todos.some(todo => todo.id !== id && todo.text === text)) {
          console.log('there is already a very identical todo');
          return;
        }
        this.todos = this.todos.map(todo => {
          let _todo;
          if (todo.id === id) {
            _todo = Object.assign(todo, {
              text
            });
          } else {
            _todo = todo;
          }
          return _todo;
        });
        this.store();
        this.editing = '';
      },
      doFilter(filter) {
        this.curFilter = filter;
      },
      clear() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.store();
      }
    },
    directives: {
      'todo-focus': function (el, binding) {
        el.focus();
      }
    }

  }

</script>
<style>
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  
  .list-enter,
  .list-leave-active {
    position: absolute;
    opacity: 0;
    transform: translateX(-30px);
  }
  
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  
  .bounce-leave-active {
    animation: bounce-out 0.5s;
  }
  
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
<style module>
  html,
  body {
    margin: 0;
    padding: 0;
  }
  
  button {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
  
  body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
    font-weight: 300;
  }
  
  button,
  input[type="checkbox"] {
    outline: none;
  }
  
  .hidden {
    display: none;
  }
  
  .todoapp {
    background: #fff;
    margin: 130px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }
  
  .todoapp input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  
  .todoapp input::-moz-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  
  .todoapp input::input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
  
  .todoapp h1 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }
  
  .new-todo,
  .edit {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
  
  .new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
  
  .main {
    position: relative;
    z-index: 2;
    border-top: 1px solid #e6e6e6;
  }
  
  label[for='toggle-all'] {
    display: none;
  }
  
  .toggle-all {
    position: absolute;
    top: 12px;
    left: -12px;
    width: 60px;
    height: 34px;
    text-align: center;
    border: none;
    /* Mobile Safari */
  }
  
  .toggle-all:before {
    content: '❯';
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }
  
  .toggle-all:checked:before {
    color: #737373;
  }
  
  .todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .todo-list li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
  }
  
  .todo-list li:last-child {
    border-bottom: none;
  }
  
  .todo-list li.editing {
    border-bottom: none;
    padding: 0;
  }
  
  .todo-list li.editing .edit {
    display: block;
    width: 506px;
    padding: 13px 17px 12px 17px;
    margin: 0 0 0 43px;
  }
  
  .todo-list li.editing .view {
    display: none;
  }
  
  .todo-list li .toggle {
    text-align: center;
    width: 40px;
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    /* Mobile Safari */
    -webkit-appearance: none;
    appearance: none;
  }
  
  .todo-list li .toggle:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
  }
  
  .todo-list li .toggle:checked:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
  }
  
  .todo-list li label {
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }
  
  .todo-list li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
  }
  
  .todo-list li .destroy {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;
  }
  
  .todo-list li .destroy:hover {
    color: #af5b5e;
  }
  
  .todo-list li .destroy:after {
    content: '×';
  }
  
  .todo-list li:hover .destroy {
    display: block;
  }
  
  .todo-list li .edit {
    display: none;
  }
  
  .todo-list li.editing:last-child {
    margin-bottom: -1px;
  }
  
  .footer {
    color: #777;
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }
  
  .footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  
  .todo-count {
    float: left;
    text-align: left;
  }
  
  .todo-count strong {
    font-weight: 300;
  }
  
  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
  }
  
  .filters li {
    display: inline;
  }
  
  .filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }
  
  .filters li a.selected,
  .filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }
  
  .filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }
  
  .clear-completed,
  html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
  }
  
  .clear-completed:hover {
    text-decoration: underline;
  }
  
  .info {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }
  
  .info p {
    line-height: 1;
  }
  
  .info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }
  
  .info a:hover {
    text-decoration: underline;
  }
  /*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
  
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    .toggle-all,
    .todo-list li .toggle {
      background: none;
    }
    .todo-list li .toggle {
      height: 40px;
    }
    .toggle-all {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
      -webkit-appearance: none;
      appearance: none;
    }
  }
  
  @media (max-width: 430px) {
    .footer {
      height: 50px;
    }
    .filters {
      bottom: 10px;
    }
  }
</style>