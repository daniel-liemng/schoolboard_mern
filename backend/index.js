const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('colors');

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const courseRoutes = require('./routes/course');
const adminRoutes = require('./routes/admin');
const instructorRoutes = require('./routes/instructor');
const sessionRoutes = require('./routes/session');

const connectDB = require('./db/connectDB');
const ErrorHandler = require('./middlewares/ErrorHandler');

dotenv.config();

connectDB();

const app = express();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
//   );
//   next();
// });

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
  cors({
    // origin: 'http://localhost:5173',
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5173'
        : 'https://schoolboard.vercel.app',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api/sessions', sessionRoutes);

app.use(ErrorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server on port ${PORT}`.bgYellow));
