const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud');

const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

/* const silence = new Kitten({ name: 'Silence' });

silence.save((error, res) => {
    if (error) {
        console.log(error);
    } else {
        console.log('ok', res);
    }
}) */

Kitten.find((error, res)=>{
    if (error) {
        console.log(error);
    } else {
        console.log('ok', res);
    }
})