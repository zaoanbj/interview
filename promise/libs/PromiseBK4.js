(function(window){
    function Promise(executor){
        self = this;
        self.status = 'pending';
        self.data = undefined;
        self.callbacks = [];

        function resolve(value) {
            if(self.status != 'pending') return;
            self.status = 'resolved';
            self.data = value;
            if(self.callbacks.length > 0) {
                setTimeout(()=>{
                    self.callbacks.forEach(item => {
                        item.onResolved(value);
                    })
                })
            }
        }

        function reject(reason) {
            if(self.status != 'pending' ) return;
            self.status = 'rejected';
            self.data = reason;
            if(self.callbacks.length > 0) {
                setTimeout(()=>{
                    self.callbacks.forEach(item => {
                        item.onRejected(reason);
                    })
                })
            }
        }

        try{
            executor(resolve, reject);
        }catch(error){
            reject(error);
        }
    }

    Promise.prototype.then = function(onResolved, onRejected){
        var self = this;
        onResolved = onResolved === typeof 'function' ? onResolved : value => value;
        onRejected = onRejected === typeof 'function' ? onRejected : reason => { throw reason };
        return new Promise((resolve, reject) => {
            function  handle(callback) {
                try{
                    var result = callback(self.data);
                    if(result instanceof Promise){
                        result.then(resolve, reject)
                    } else {
                        resolve(result);
                    }
                }catch(error){
                    reject(error)
                }
            }
            if(self.status === "resolved"){
                setTimeout(()=>{
                    handle("onResolved")
                })
            } else if(self.status === 'rejected'){
                setTimeout(()=>{
                    handle("onRejected")
                })
            } else {
                self.callbacks.push({
                    onResolved(value){
                        handle("onResolved")
                    },
                    onRejected(reason){
                        handle("onRejected")
                    }
                })
            }
        })
    }

    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, rejected);
    }

    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            if(value instanceof Promise){
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }

    Promise.reject = function(reason){
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    Promise.all = function (promises) {
        var arr = new Array(promises.length);
        var num = 0;
        return new Promise((resolve, reject)=>{
            promises.forEach((item, index)=>{
                item.then(
                    value =>{
                        num++;
                        arr[index] = value;
                        if(promises.length == num){
                            resolve(arr);
                        }
                    },
                    reason => reject(season)
                )
            })
        })
    }

    Promise.race = function (promises) {
        return new Promise((resolve, reject)=>{
            promises.forEach((p, index)=>{
                p.then(
                    value=>{
                        resolve(value);
                    },
                    season=>{
                        reject(season)
                    }
                )
            })
        })
    }

    window.Promise = Promise;
})(window);