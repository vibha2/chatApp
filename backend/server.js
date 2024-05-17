const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const cors = require('cors');

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
dotenv.config();

//middlewares
app.use(express.json()); //to accept json data

//database connect
const database = require("./config/database");
database.connect();


const PORT = process.env.PORT || 9000;

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req,res) => {
    res.send("API is running");
})

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

// app.get('/api/v1/chat', (req,res) => {
//     res.send(chats);
// })

// app.get('/api/chat/v1/:id', (req, res) => {
//     console.log(req.params.id);
//     const singleChat = chats.find((c) => c._id === req.params.id);
//     res.send(singleChat);
// })



app.listen(PORT, console.log(`Server is started on PORT ${PORT}`));