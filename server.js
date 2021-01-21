require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');

const app = express();

app.use(express.json());
app.use(cors());

// Routes 
app.use('/users', userRouter)
app.use('/api/notes', noteRouter)


// Listen server
app.get('/', (req, res) => res.json("Hello everyone, this is my notes app"))

const PORT = process.env.PORT;

app.listen(PORT, _ => console.log(`Servier is running on port `, PORT));

// Connect to mongoDb
const URI = process.env.DB_URL

mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    err => {
        if (err)
            throw Error
        console.log(`Connected to MongoDB `)
    }
)