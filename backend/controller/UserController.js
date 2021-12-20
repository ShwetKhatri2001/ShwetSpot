import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';

export default class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await this.userService.getAll();

    res.json(users);
  });

  getUserById = asyncHandler(async (req, res) => {
    const user = await this.userService.getById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json(user);
  });

  getUserProfile = asyncHandler(async (req, res) => {
    const user = await this.userService.getProfile(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json(user);
  });

  authUser = asyncHandler(async (req, res) => {
    const authenticatedUser = await this.userService.authenticate(
      req.body.email,
      req.body.password
    );

    if (!authenticatedUser) {
      res.status(401);
      throw new Error('Authentication failed');
    }

    res.json(authenticatedUser);
  });

  registerUser = asyncHandler(async (req, res) => {
    const registeredUser = await this.userService.register(
      req.body.name,
      req.body.email,
      req.body.money,
      req.body.password
    );

    if (!registeredUser) {
      res.status(400);
      throw new Error('Failed to register user');
    }

    res.status(201).json(registeredUser);
  });

  updateUser = asyncHandler(async (req, res) => {
    const updatedUser = await this.userService.update(
      req.params.id,
      req.body.name,
      req.body.email,
      req.body.money,
      req.body.isAdmin
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error('Failed to update user');
    }

    res.json(updatedUser);
  });

  updateUserProfile = asyncHandler(async (req, res) => {
    const updatedUser = await this.userService.updateProfile(
      req.user._id,
      req.body.name,
      req.body.email,
      req.body.money,
      req.body.password,
      req.body.profilePicture
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error('Failed to update user');
    }

    res.json(updatedUser);
  });

  deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
}
