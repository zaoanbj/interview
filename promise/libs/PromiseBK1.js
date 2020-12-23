(function (window) {
    function Promise(executor) {
        var self = this;
        self.status = 'pending';
        self.data = undefined;
        self.callbacks = [];

        function resolve(value) {
            //console.log(value);
            if(self.status !== 'pending') return
            self.status = 'resolved';
            self.data = value;
            setTimeout(()=>{
                if(self.callbacks.length > 0){
                    self.callbacks.forEach((items)=>{
                        items.onResolved(value);
                    })
                }
            })
        }

        function reject(reason) {
            //console.log(reason);
            if(self.status !== 'pending') return
            self.status = 'rejected';
            self.data = reason;
            setTimeout(()=>{
                if(self.callbacks.length > 0){
                    self.callbacks.forEach((items)=>{
                        items.onRejected(reason);
                    })
                }
            })
        }

        try{
            executor(resolve,reject);
        }catch(error){
            //console.log(error);
            reject(error);
        }

    }

    Promise.prototype.then = function(onResolved, onRejected){
        onResolved = typeof onResolved === 'function' ? onResolved : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
        var self = this;
        return new Promise((resolve, reject)=>{
            function handle(callback) {
                try{
                    var result = callback(self.data);
                    if(result instanceof Promise) {
                        result.then(resolve,reject);
                    } else {
                        resolve(result);
                    }
                }catch(error){
                    reject(error);
                }
            }

            if(self.status === 'pending') {
                self.callbacks.push({
                    onResolved(){
                        handle(onResolved);
                    },
                    onRejected(){
                        handle(onRejected);
                    }
                })
            } else if(self.status === 'resolved') {
                setTimeout(()=>{
                    handle(onResolved);
                })
            } else {
                setTimeout(()=>{
                    handle(onRejected);
                })
            }
        })
    }

    Promise.prototype.catch = function(rejected){
        return this.then(undefined, rejected);
    }
    
    Promise.resolve = function (value) {
        return new Promise((resolve,reject)=>{
            if(value instanceof Promise){
                value.then(resolve,reject);
            } else {
                resolve(value);
            }
        })
    }

    Promise.reject = function(reason) {
        return new Promise((resolve, reject)=>{
            reject(reason);
        })
    }

    Promise.all =function (promises) {
        var values = new Array(promises.length);
        var num = 0;
        return new Promise((resolve, reject)=>{
            promises.forEach((p, index)=>{
                Promise.resolve(p).then(
                    value => {
                        num++;
                        values[index] = value;
                        if(num == promises.length){
                            resolve(values);
                        }
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }

    Promise.race = function (promises) {
        return new Promise((resolve, reject)=>{
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                  value => {
                    resolve(value);
                  },
                  reason =>{
                    reject(reason);
                  }
              )
            })
        })
    }

    window.Promise = Promise
})(window);