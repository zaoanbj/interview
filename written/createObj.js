createObj('a,b,c'); // {a: {b: {c: null}}}

function createObj(txt) {
    var obj = {}, arr = [], result = obj;
    if (txt.typeof == 'string') {
        arr = txt.split('.');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != obj) {
                if (i == arr.length - 1) {
                    obj[arr[i]] = null
                } else {
                    obj[arr[i]] = {}
                    obj = obj[i]
                }
            }
        }
    }
    return result
}