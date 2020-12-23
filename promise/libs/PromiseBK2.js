(function (window) {
    function Promise(executor) {
        var self = this;
        self.status = 'pending';
        self.data = 'undefined';
        self.callbacks = [];

        function resolve(value) {
            if(self.status !== 'pending') return;
            self.status = 'resolve';
            self.data = value;
            setTimeout(()=>{
                if(self.callbacks.length>0){
                    self.callbacks.forEach((items)=>{
                        items.onResolved(value)
                    })
                }
            })
        }

        function reject(reason) {
            if(self.status !== 'pending') return;
            this.status = 'reject';
            self.data = reason;
            setTimeout(()=>{
                if(self.callbacks.length>0){
                    self.callbacks.forEach((items)=>{
                        items.onRejected(reason)
                    })
                }
            })
        }
        try{
            executor(resolve, reject);
        }catch(error){
            reject(error);
        }

    }

    Promise.prototype.then = function(onResolved, onRejected){
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw onRejected}
        onResolved = typeof onResolved === 'function' ? onResolved : value => value
        const self = this;

        return new Promise((resolve, reject)=>{
            function hanlde(callback) {
                try {
                    const result = callback(self.data)
                    if(result instanceof Promise){
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                }catch(error){
                    reject(error)
                }
            }
            if(self.status === 'pending'){
                self.callbacks.push({
                    onResolved(){ hanlde(onResolved) },
                    onRejected(){ hanlde(onRejected)}
                })
            } else if(self.status === 'resolved'){
                setTimeout(()=>{
                    hanlde(onResolved)
                })
            } else {
                setTimeout(()=>{
                    hanlde(onRejected)
                })
            }
        })
    }

    Promise.prototype.catch = function(rejected){
        return this.then(undefined, rejected);
    }

    Promise.resolve = function(value){
        return new Promise((resolve, reject)=>{
            if(value instanceof Promise){
                value.then({resolve, reject})
            } else {
                resolve(value)
            }
        })
    }

    Promise.reject = function(reason){
        return new Promise((resolve, reject)=>{
            reject(reason)
        })
    }

    Promise.all = function(promises){
       const values = new Array(promises.length);
       let num = 0;
       return new Promise((resolve, reject)=>{
           promises.forEach((item, index)=>{
               item.then(
                   value=>{
                       num++
                       values[index] = value
                       if(num == promises.length){
                            resolve(values)
                       }
                   },
                   reason=>{
                       reject(reason)
                   }
               )
           })
       })
    }

    Promise.race = function(promises){
        return new Promise((resolve, reject)=>{
            promises.forEach((p, index)=>{
                p.then(
                    value=>{
                        resolve(values)
                    },
                    reason=>{
                        reject(reason)
                    }
                )
            })
        })
    }

    window.Promise = Promise;
})(window)