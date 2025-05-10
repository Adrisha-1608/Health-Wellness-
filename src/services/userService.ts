import { Request, Response } from 'express';
import ScheduledJob from '../models/ScheduledJob';
import { scheduleReminder } from '../jobs/jobScheduler';
import { sendSuccessResponse, sendErrorResponse } from '../common/response/response.message';
import { HTTP_CODES } from '../common/statuscodes/httpStatusCodes'; 
import { ErrorMessages, SuccessMessages } from '../common/statuscodes/status message';
import { logger } from '../utils/logger'; 

export const createJob = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { type, time } = req.body;

  if (!userId || !type || !time) {
    logger.warn(`Missing required fields for job creation: userId=${userId}, type=${type}, time=${time}`);
    sendErrorResponse(res, 'Missing required fields', HTTP_CODES.BAD_REQUEST);
    return;
  }

  try {
    logger.info(`Scheduling job for user ${userId} with type ${type} at ${time}`);
    await scheduleReminder(userId, type, time);
    logger.info(`Job scheduled successfully for user ${userId} with type ${type} at ${time}`);
    sendSuccessResponse(res, SuccessMessages.JOB_CREATED, null, HTTP_CODES.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Job scheduling failed for user ${userId}: ${error.message}`);
    } else {
      logger.error(`Job scheduling failed for user ${userId}: ${String(error)}`);
    }
    sendErrorResponse(res, ErrorMessages.INTERNAL_ERROR);
  }
};

export const getUserJobs = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    logger.warn(`Unauthorized access attempt by userId=${userId}`);
    sendErrorResponse(res, ErrorMessages.UNAUTHORIZED, HTTP_CODES.UNAUTHORIZED);
    return;
  }

  try {
    logger.info(`Fetching jobs for user ${userId}`);
    const jobs = await ScheduledJob.find({ userId });
    logger.info(`Jobs retrieved successfully for user ${userId}`);
    sendSuccessResponse(res, 'Jobs retrieved successfully', jobs);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error fetching jobs for user ${userId}: ${error.message}`);
    } else {
      logger.error(`Error fetching jobs for user ${userId}: ${String(error)}`);
    }
    sendErrorResponse(res, ErrorMessages.INTERNAL_ERROR);
  }
};













