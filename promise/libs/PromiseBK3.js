(function(window){
    function Promise(executor) {
        console.log('my Promise start');
        const self = this;
        self.status = 'pending';
        self.data = 'undefined';
        self.callbacks = [];

        function resolve(value) {
            if(self.status !== 'pending') return;
            self.status = 'resolve';
            self.data = value;
            setTimeout(()=>{
                if(self.callbacks.length>0){
                    self.callbacks.foreach((item, index)=>{
                        item.onResolved(value);
                    })
                }
            })
        }

        function reject(reason) {
            //debugger
            if(self.status !== 'pending') return;
            self.status = 'reject';
            self.data = reason;
            setTimeout(()=>{
                if(self.callbacks.length>0){
                    self.callbacks.forEach((item, index)=>{
                        item.onRejected(reason);
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
        onResolved = typeof onResolved == 'function' ? onResolved : value => value;
        onRejected = typeof onRejected == 'function' ? onRejected : reason => {throw reason};
        const self = this;
        return new Promise((resolve, reject)=>{
            function hanlder(callback) {
                try{
                    let result = callback(self.data);
                    if(result instanceof Promise){
                        result.then(resolve,reject)
                    } else{
                        resolve(result);
                    }
                }catch(error){
                    reject(error);
                }
            }
            if(self.status === 'pending'){
                self.callbacks.push({
                    onResolved(){ hanlder(onResolved); },
                    onRejected(){ hanlder(onRejected); }
                })
            } else if(self.status === 'resolve'){
                setTimeout(()=>{
                    hanlder(onResolved);
                })
            } else {
                setTimeout(()=>{
                    hanlder(onRejected);
                })
            }
        })
    }

    Promise.prototype.catch = function (rejected) {
        return this.then(undefined, rejected);
    }

    Promise.resolve = function (value) {
        return new Promise((resolve, reject)=>{
            if(value instanceof Promise){
                value.then({resolve, reject});
            } else {
                resolve(value);
            }
        })
    }

    Promise.reject = function (reason) {
        return new Promise((resolve, reject)=>{
            reject(reason);
        })
    }

    Promise.all = function (promises) {
        let pAll = new Array(promises.length);
        let num = 0;
        return new Promise((resolve, reject)=>{
            promises.forEach((p, index)=>{
                p.then(
                    value=>{
                        num++;
                        pAll[index] = value;
                        if(num == promises.length){
                            resolve(pAll);
                        }
                    },
                    season=>{
                        reject(season)
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
})(window)