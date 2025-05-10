import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import redisClient from '../config/redisClient';
import { sendErrorResponse } from '../common/response/response.message'; 
import { HTTP_CODES } from '../common/statuscodes/httpStatusCodes'; 
import { ErrorMessages } from '../common/statuscodes/status message';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; username: string };
      token?: string;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    console.error('No Bearer token found in headers');
    sendErrorResponse(res, ErrorMessages.UNAUTHORIZED, HTTP_CODES.UNAUTHORIZED);
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('Token received:', token); 

  const isBlacklisted = await redisClient.get(`bl_${token}`);
  if (isBlacklisted) {
    console.error('Token is blacklisted');
    sendErrorResponse(res, ErrorMessages.INVALID_TOKEN, HTTP_CODES.UNAUTHORIZED);
    return;
  }

  try {
    const decoded = verifyToken(token);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    req.token = token;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    sendErrorResponse(res, ErrorMessages.INVALID_TOKEN, HTTP_CODES.UNAUTHORIZED);
  }
};








