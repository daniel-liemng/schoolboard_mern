const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('colors');

const userRoutes = require('./routes/user');

const connectDB = require('./db/connectDB');
const ErrorHandler = require('./middlewares/ErrorHandler');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api/users', userRoutes);

app.use(ErrorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server on port ${PORT}`.bgYellow));
