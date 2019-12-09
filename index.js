
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')



const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');

const app = express();
const router = express.Router();



app.use(require('morgan')('dev'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/actions',  { useUnifiedTopology: true,  useNewUrlParser: true  });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});



app.use('/actions/events', eventRoutes);
app.use('/actions/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.use('/', router);
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));

module.exports = app;