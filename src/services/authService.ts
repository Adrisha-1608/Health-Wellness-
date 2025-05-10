import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwtUtils';
import redisClient from '../config/redisClient';
import { User } from '../models/userModel';
import { logger } from '../utils/logger';
import { sendSuccessResponse, sendErrorResponse } from '../common/response/response.message';
import { HTTP_CODES } from '../common/statuscodes/httpStatusCodes'; 
import { ErrorMessages, SuccessMessages } from '../common/statuscodes/status message';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    logger.warn(`Registration attempt with missing fields. Username: ${username}`);
    sendErrorResponse(res, ErrorMessages.INVALID_CREDENTIALS, HTTP_CODES.BAD_REQUEST);
    return;
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      logger.warn(`User with username ${username} already exists`);
      sendErrorResponse(res, ErrorMessages.USER_EXISTS, HTTP_CODES.CONFLICT);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    logger.info(`User ${username} registered successfully`);
    sendSuccessResponse(res, SuccessMessages.REGISTERED, null, HTTP_CODES.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error registering user ${username}: ${error.message}`);
    } else {
      logger.error(`Error registering user ${username}: ${String(error)}`);
    }
    sendErrorResponse(res, ErrorMessages.INTERNAL_ERROR, HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn(`Failed login attempt for username: ${username}`);
      sendErrorResponse(res, ErrorMessages.INVALID_CREDENTIALS, HTTP_CODES.UNAUTHORIZED);
      return;
    }

    const token = signToken({ id: user._id, username: user.username });
    logger.info(`User ${username} logged in successfully`);
    sendSuccessResponse(res, SuccessMessages.LOGGED_IN, { token });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error logging in user ${username}: ${error.message}`);
    } else {
      logger.error(`Error logging in user ${username}: ${String(error)}`);
    }
    sendErrorResponse(res, ErrorMessages.INTERNAL_ERROR, HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
};


export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.token;
  if (token) {
    try {
      await redisClient.set(`bl_${token}`, '1');
      logger.info(`User logged out and token ${token} invalidated`);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error invalidating token ${token}: ${error.message}`);
      } else {
        logger.error(`Error invalidating token ${token}: ${String(error)}`);
      }
    }
  }

  sendSuccessResponse(res, SuccessMessages.LOGGED_OUT);
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, email, ...otherFields } = req.body;

    if (!userId) {
      logger.warn('Profile update attempt with invalid user ID');
      sendErrorResponse(res, ErrorMessages.USER_NOT_FOUND, HTTP_CODES.BAD_REQUEST);
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, ...otherFields },
      { new: true }
    );

    if (!updatedUser) {
      logger.warn(`User with ID ${userId} not found during profile update`);
      sendErrorResponse(res, ErrorMessages.USER_NOT_FOUND, HTTP_CODES.NOT_FOUND);
      return;
    }

    logger.info(`User ${userId} updated their profile`);
    sendSuccessResponse(res, 'Profile updated successfully', updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error updating profile for user ${req.user?.id}: ${error.message}`);
    } else {
      logger.error(`Error updating profile for user ${req.user?.id}: ${String(error)}`);
    }
    sendErrorResponse(res, ErrorMessages.INTERNAL_ERROR, HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
};







