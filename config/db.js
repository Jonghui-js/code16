const mongoose = require('mongoose');
const config = require('config');
//디폴트.js에서 몽고uri를 가지고온다.
const db = config.get('mongoURI');

// .connect(uri, 옵션들)
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
