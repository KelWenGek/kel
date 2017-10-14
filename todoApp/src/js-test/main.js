function Promise(fn) {
  var callbacks = [],
    value,
    state = 'pending';

  this.then = function (onFulfilled, onRejected) {
    return new Promise(function (resolve, reject) {
      handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject
      });
    });
  };

  function handle(callback) {
    if (state === 'pending') {
      callbacks.push(callback);
      return;
    }
    var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
      ret;
    if (cb === null) {
      cb = state === 'fulfilled' ? callback.resolve : callback.reject;
      cb(value);
      return;
    }
    try {
      ret = cb(value);
      callback.resolve(ret);
    } catch (e) {
      callback.reject(e);
    }
  }

  function resolve(newValue) {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;
      if (typeof then === 'function') {
        then.call(newValue, resolve, reject);
        return;
      }
    }
    state = 'fulfilled';
    value = newValue;
    execute();
  }

  function reject(reason) {
    state = 'rejected';
    value = reason;
    execute();
  }

  function execute() {
    setTimeout(function () {
      callbacks.forEach(function (callback) {
        handle(callback);
      });
    }, 0);
  }

  fn(resolve, reject);
}

window.Promise = Promise;

function getUserId() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      // resolve('kel');
      reject('出错了');
    }, 1000);
  });
}

function getUserJobById(id) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('hello ' + id);
    }, 2000);
  });
}


getUserId().then(getUserJobById).then(console.log, console.log);