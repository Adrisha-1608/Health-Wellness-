import { Request, Response } from 'express';
import { createGoal, getUserGoals, updateGoal } from '../services/goalService';
import { sendSuccessResponse, sendErrorResponse } from '../common/response/response.message';
import { HTTP_CODES } from '../common/statuscodes/httpStatusCodes';
import { ErrorMessages } from '../common/statuscodes/status message';

export const addGoal = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    sendErrorResponse(res, ErrorMessages.UNAUTHORIZED, HTTP_CODES.UNAUTHORIZED);
    return;
  }

  try {
    const goalData = {
      ...req.body,
      userId,
    };

    const goal = await createGoal(goalData);
    sendSuccessResponse(res, 'Goal created successfully', goal, HTTP_CODES.CREATED);
  } catch (error) {
    console.error('Error creating goal:', error);
    sendErrorResponse(res, ErrorMessages.INTERNAL_ERROR, HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
};

export const fetchGoals = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    sendErrorResponse(res, ErrorMessages.UNAUTHORIZED, HTTP_CODES.UNAUTHORIZED);
    return;
  }

  try {
    const goals = await getUserGoals(userId);
    sendSuccessResponse(res, 'Goals fetched successfully', goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    sendErrorResponse(res, ErrorMessages.INTERNAL_ERROR, HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
};

export const editGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goalId = req.params.id;
    const updated = await updateGoal(goalId, req.body);
    sendSuccessResponse(res, 'Goal updated successfully', updated);
  } catch (error) {
    console.error('Error updating goal:', error);
    sendErrorResponse(res, ErrorMessages.INTERNAL_ERROR, HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
};
