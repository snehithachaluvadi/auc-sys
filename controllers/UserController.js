const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  signUp: async (req, res) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.json('User added!');
    } catch (error) {
      res.status(500).json('Error: ' + error.message);
    }
  },

  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json('Invalid credentials');
      }

      // Optionally generate token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'yoursecretkey', {
        expiresIn: '1h'
      });

      res.json({ message: 'Sign-in successful!', token });
    } catch (error) {
      res.status(500).json('Error: ' + error.message);
    }
  }
};

module.exports = userController;