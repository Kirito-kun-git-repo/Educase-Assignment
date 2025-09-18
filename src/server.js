const express = require('express');
const logger =require('./utils/logger');

const helmet = require('helmet');
const cors=require("cors");
const routes=require('./routes/schoolRoutes');
require("dotenv").config();
const sequelize=require('./utils/db');

const PORT=process.env.PORT || 3000;
const app=express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api',routes);

// Start server only if DB is connected

async function init() {
  try {
    await sequelize.authenticate();
    console.log('DB connected ✅');

    // This will create all tables that do not exist
    await sequelize.sync({ alter: true }); // or { force: true } to drop and recreate
    // sequelize.sync({ force: true });


    console.log('Tables synced ✅');
  } catch (err) {
    console.error('DB sync error ❌', err);
  }
}

init();
app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });




