const fs = require('fs');

fs.readFile('./data/hello.txt', function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log(data.toString());
    }
});

fs.writeFile('./data/write.txt', '2021,1,14', function(error){
    if(error){
        console.log(error);
    } else{
        console.log(error, '文件写入成功');
    }
});