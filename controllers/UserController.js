const User = require('../models/UserModel');

const userController = {
  signUp: async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = new User({ username, password });
      await newUser.save();
      res.json('User added!');
    } catch (error) {
      res.status(400).json('Error: ' + error.message);
    }
  },

  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      
      if (user) {
        res.json('Sign-in successful!');
      } else {
        res.status(401).json('Invalid credentials');
      }
    } catch (error) {
      res.status(400).json('Error: ' + error.message);
    }
  },
  
};

module.exports = userController;