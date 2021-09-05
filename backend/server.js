const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());


const CONNECTION_URL = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;
// console.log(CONNECTION_URL);
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => app.listen(PORT, () => console.log(`Connection is established and running on port: ${PORT}`)))
  .catch((err) => console.log(err.message));
mongoose.set('useFindAndModify', false);
// mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })



//ROUTES

app.use('/', testRouter);
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});