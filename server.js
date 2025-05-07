require('dotenv').config();
const app = require('./app');
const connectDb = require('./db/connection');

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
});
