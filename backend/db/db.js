const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect(
  'mongodb+srv://coder4614:coder4614@cluster0.1ainqmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const accountSchema = new mongoose.Schema({
  userId: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  },
  balance:{
    type:Number,
    required:true
  }
})
const Account = mongoose.model("Account",accountSchema)
const User = mongoose.model("User", userSchema);

module.exports = { User ,Account};
