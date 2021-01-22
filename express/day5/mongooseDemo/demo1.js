const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://localhost:27017/test', { useUrlClient: true });

const Cat = mongoose.model('Cat', { name: String });

for (let i = 0; i < 10; i++) {

    const kitty = new Cat({ name: 'zaoan'+i });
    kitty.save().then(() => console.log('meow'));
}