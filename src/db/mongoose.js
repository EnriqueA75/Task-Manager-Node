const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect(process.env.MONGO_RURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

