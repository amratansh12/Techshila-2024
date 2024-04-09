const user = require("../Models/userModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

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
