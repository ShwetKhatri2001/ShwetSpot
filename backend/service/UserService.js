import generateToken from '../utils/generateToken.js';
import User from '../model/userModel.js';

export default class UserService {
  constructor() {}

  getAll = async () => {
    return await User.find({});
  };

  getById = async userId => {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      throw new Error(`User with ${userId} not found`);
    }

    return user;
  };

  getProfile = async userId => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      money: user.money,
      profilePicture: user.profilePicture,
      isAdmin: user.isAdmin,
    };
  };

  authenticate = async (email, password) => {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        money: user.money,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      };
    } else {
      throw new Error('Invalid email or password');
    }
  };

  register = async (name, email, money, password) => {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const registeredUser = await User.create({ name, email, money, password });

    if (!registeredUser) {
      throw new Error('Invalid user data');
    }

    return {
      _id: registeredUser._id,
      name: registeredUser.name,
      email: registeredUser.email,
      money: registeredUser.money,
      isAdmin: registeredUser.isAdmin,
      token: generateToken(registeredUser._id),
    };
  };

  update = async (userId, userName, userEmail, userMoney, userIsAdmin) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.name = userName;
    user.email = userEmail;
    user.money = userMoney;
    user.isAdmin = userIsAdmin;

    const updatedUser = await user.save();

    return {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      money: updatedUser.money,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    };
  };

  updateProfile = async (
    userId,
    userName,
    userEmail,
    userMoney,
    userPassword,
    userProfilePicture
  ) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(`User with ${userId} not found`);
    }

    user.name = userName;
    user.email = userEmail;
    user.money = userMoney;
    user.profilePicture = userProfilePicture;
    if (userPassword) {
      user.password = userPassword;
    }

    const updatedUser = await user.save();

    return {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      money: updatedUser.money,
      isAdmin: updatedUser.isAdmin,
      profilePicture: updatedUser.profilePicture,
    };
  };

  delete = async userId => {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(`User with ${userId} not found`);
    }

    return await user.remove();
  };
}
