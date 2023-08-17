
const express = require('express')

const connectToMongoDb = require('./utilities/database');
const { default: mongoose } = require('mongoose');

const PORT = 8080;
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const cron = require('node-cron')

connectToMongoDb();

const authRouter = require('./api/endpoints/auth');
const userRouter = require('./api/endpoints/user');
const downloadRouter = require('./api/endpoints/download');

app.use('/auth', authRouter);
app.use('/user', userRouter);

// cron.schedule("* * * * * *", function () {
//     console.log("---------------------");
//     console.log("running a task every day");
//     // change the status of appointments - inprogress to completed or not attended from scheduled
// });

app.use('/download', downloadRouter)

app.get('/', (req, res) => {
    res.send('Server running successfully....')
})

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log('Server is running on the port 8080')
    });
})