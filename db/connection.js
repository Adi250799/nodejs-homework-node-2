const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);

    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // zatrzymanie aplikacji w razie błędu
  }
};

module.exports = connectDb;
