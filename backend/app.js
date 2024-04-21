const express=require('express');
const bodyparser=require('body-parser');

const sequelize=require('./util/database');

const app=express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });

const userRoutes=require('./routes/user');

require('dotenv').config();

app.use('/user',userRoutes);

(async () => {
    try {
        await sequelize.sync();
        app.listen(3000);
    } catch (e) {
        console.log(e);
    }
})();
