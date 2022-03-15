import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth User and Get Token
// @route GET /api/users/login
// @access Public
const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //   console.log(req.body);
  const user = await User.findOne({ email });
  if (user) {
    if (await user.matchPassword(password)) {
      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid password');
    }
  } else {
    res.status(401);
    throw new Error('User Email is not registered');
  }
});

// @desc Get User Profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  //   console.log(user);
  if (user) {
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Not Authorised, Invalid Token.');
  }
});

export { userAuth, getUserProfile };
