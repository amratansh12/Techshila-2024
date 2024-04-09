const user = require("../Models/userModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const privateKey =
  process.env.PRIVATE_KEY || "yaHpMr3OGwPdQN0aBK0J0UxEhSnqzgZI";

const jwtEncode = (payload) => {
  const token = jwt.sign(payload, privateKey);
  return token;
};
exports.signup = async (req, res) => {
  try {
    // Extract email and password from the req.body object
    const { email, password, name, contactNumber, role } = req.body;

    // Check if the email is already in use
    let userExists = await user.findOne({ email });

    if (userExists) {
      res.status(401).json({ message: "Email is already in use." });
      return;
    }

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw new Error("Internal Server Error");
      const userId = uuid.v4();
      // Create a new user
      let newUser = new user({
        email,
        userId,
        password: hash,
        name,
        contactNumber,
        role,
      });

      // Save user to database
      newUser.save().then(() => {
        const payload = {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        };
        const token = jwtEncode(payload);
        res.json({ message: "User created successfully", token });
      });
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    // Extract email and password from the req.body object
    const { email, password } = req.body;

    // Check if the email exists
    let userExists = await user.findOne({ email });

    if (!userExists) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    // Compare the password
    bcrypt.compare(password, userExists.password, (err, result) => {
      // if (err) throw new Error("Internal Server Error");
      if (result) {
        const payload = {
          name: userExists.name,
          email: userExists.email,
          role: userExists.role,
        };
        const token = jwtEncode(payload);
        res.status(200).json({ message: "Login Successful", token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }
  if(!token){
    return res.status(401).json({message: "Unauthorized. Please login to get access"});
  }
  const decoded = await promisify(jwt.verify)(token, privateKey);
  
  const currentUser = await user.findOne({email: decoded.email});
  if(!currentUser){
    return res.status(401).json({message: "User does not exist"});
  }
  req.user = currentUser;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return res.status(403).json({message: "You do not have permission to perform this action"});
    }
    next();
  }
};


exports.getAllUsers = async (req, res) => {
  const users = await user.find();

  res.status(200).json({
      status: "success",
      data: {
          users,
      },
  });
};