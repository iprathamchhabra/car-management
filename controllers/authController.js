const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  console.log('Request received:', req.body); // Log the request body
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log('Error creating user:', error); // Log the error
    res.status(500).json({ message: 'Error creating user' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};
