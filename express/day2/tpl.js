const template = require('art-template');
let tpl = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        {{name}}
    </body>
    </html>
`;

let tt = template.render(tpl, {
    name: 'zls'
})
console.log(tt);