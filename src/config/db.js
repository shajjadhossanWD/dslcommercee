const mongoose = require("mongoose");

exports.makeDb = () => {
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    // Update here mongodb access credential
    'mongodb://localhost:27017/dslcommerce ',

    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  );
  mongoose.set("useFindAndModify", false);
};