const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const http = require('http');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');
const path = require('path');
const PORT = process.env.PORT || 3000;

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const fileRouter = require('./routes/upload');
const departmentRouter = require('./routes/department');
const positionRouter = require('./routes/position');
const cityRouter = require('./routes/city');
const countryRouter = require('./routes/country')



dotenv.config();

/**Connect to DB */
mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to DB')
})
/**Middleware */
app.use(express.json());
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Expose-Headers','Authorization');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization', 'X-Requested-With, Accept, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Accept', '*')
    next();
})
// app.use('/uploads',express.static('/uploads'));
app.use(mongoSanitize({replaceWith:'_'}))
app.use(express.static(path.join(__dirname, './public/uploads')));

// app.use(cors);
app.use('/api/user', authRouter);
app.use('/api/user/manage',userRouter);
app.use('/api/file', fileRouter);
app.use('/api/department', departmentRouter);
app.use('/api/position', positionRouter);
app.use('/api/address/city', cityRouter);
app.use('/api/address/country', countryRouter);

const server = http.createServer(app);
app.listen(PORT, () => {
    console.log('Server Up and running at PORT ' + PORT)
})

// {
//     "first_name": "Ivan",
//     "middle_name": "Dimitrov",
//     "last_name": "Georgiev",
//     "country": "Bulgaria",
//     "city": "Plovdiv",
//     "zip": "83298",
//     "email": "ivanka@ivanov.bg",
//     "password": "req.password",
//     "position": "dev",
//     "department":"5eb1478b79e8c437123003c9"
// }

// {
//     "first_name": "Anna",
//     "middle_name": "Stoilova",
//     "last_name": "Petrova",
//     "address": {
//         "country": "Bulgaria",
//         "city": "Plovdiv",
//         "zip": 4000,
//         "street": "25 Street"
//     },
//     "email": "stoilova1@abv.bg",
//     "password": "hakdka77",
//     "position": "Administrator",
//     "department": "Sales"
// }