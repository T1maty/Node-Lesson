const express = require('express');
const mongoose = require('mongoose')
const authRouter = require("./routes/authRouter")
const PORT = process.env.PORT || 5000
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json())
app.use('/auth', authRouter)


app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

const start = async() => {
    try {

        await mongoose.connect( 'mongodb+srv://timofijfedorik:cE2yUUqBukPieapi@clustermongo.qczeqql.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log('server started on port ${PORT}'))
    } catch (e) {
        console.log(e)
    }
}

start()

//