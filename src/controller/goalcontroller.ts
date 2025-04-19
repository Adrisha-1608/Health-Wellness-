import { Request, Response } from 'express';
import { createGoal, getUserGoals, updateGoal } from '../services/goalService';
//import { addGoal } from '../controller/goalcontroller';


export const addGoal = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: Missing user ID' });
    return;
  }

  const goalData = {
    ...req.body,
    userId,
  };

  const goal = await createGoal(goalData);
  res.status(201).json(goal);
};

export const fetchGoals = async (req: Request, res: Response) :Promise<void>=> {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: Missing user ID' });
    return;
  }

  const goals = await getUserGoals(userId);
  res.json(goals);
};

export const editGoal = async (req: Request, res: Response) => {
  const goalId = req.params.id;
  const updated = await updateGoal(goalId, req.body);
  res.json(updated);
};
