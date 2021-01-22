const fs = require('fs');

fs.readFile('./tt.txt', 'utf8', function (error, data) {
    if (error) {
        console.log(error);
    }
    console.log(data);

    fs.writeFile('./tt.txt', `${data}utf8utf8utf8zhang`, function (error) {
        if (error) {
            throw error
        }
        console.log('success');
    })
})

fs.readFile('./tt.txt', 'utf8', function (error, data) {
    if (error) {
        console.log(error);
    }
    console.log(data);
})