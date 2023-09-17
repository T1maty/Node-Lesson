const express = require('express');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000

const app = express();

const start = async() => {
    try {

        await mongoose.connect('mongodb+srv://holozai:43215670Tf@@cluster0.a4gi7re.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log('server started on port ${PORT}'))
    } catch (e) {
        console.log(e)
    }
}

start()