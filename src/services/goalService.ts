import { Goal } from '../models/goalModel';
import { logger } from '../utils/logger';  // Import the logger

/**
 * Create a new goal.
 */
export const createGoal = async (goalData: any) => {
  try {
    const goal = new Goal(goalData);
    await goal.save();
    logger.info(`Goal created for user ${goalData.userId} with title: ${goalData.title}`);
    return goal;
  } catch (error) {
    logger.error(`Error creating goal for user ${goalData.userId}: ${(error as Error).message}`);
    throw new Error('Error creating goal');
  }
};

/**
 * Get all goals for a user.
 */
export const getUserGoals = async (userId: string) => {
  try {
    const goals = await Goal.find({ userId });
    logger.info(`Fetched goals for user ${userId}`);
    return goals;
  } catch (error) {
    logger.error(`Error fetching goals for user ${userId}: ${(error as Error).message}`);
    throw new Error('Error fetching goals');
  }
};

/**
 * Update a specific goal.
 */
export const updateGoal = async (goalId: string, updates: any) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(goalId, updates, { new: true });
    if (!updatedGoal) {
      logger.warn(`Goal with ID ${goalId} not found during update`);
      throw new Error('Goal not found');
    }
    logger.info(`Goal with ID ${goalId} updated successfully`);
    return updatedGoal;
  } catch (error) {
    logger.error(`Error updating goal with ID ${goalId}: ${(error as Error).message}`);
    throw new Error('Error updating goal');
  }
};



// import { Goal } from '../models/goalModel';

// export const createGoal = async (goalData: any) => {
//   const goal = new Goal(goalData);
//   return await goal.save();
// };

// export const getUserGoals = async (userId: string) => {
//   return await Goal.find({ userId });
// };

// export const updateGoal = async (goalId: string, updates: any) => {
//   return await Goal.findByIdAndUpdate(goalId, updates, { new: true });
// };
