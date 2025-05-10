import express from 'express';
import { notifyUser } from '../services/notificationService';
import { sendErrorResponse, sendSuccessResponse } from '../common/response/response.message';
import { HTTP_CODES } from '../common/statuscodes/httpStatusCodes';
import { ErrorMessages, SuccessMessages } from '../common/statuscodes/status message';
import { logger } from '../utils/logger';

const router = express.Router();

router.get('/', (req, res) => {
  sendSuccessResponse(res, 'Notification service is up and running!');
});


router.post('/send', async (req: express.Request, res: express.Response): Promise<void> => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    sendErrorResponse(res, ErrorMessages.MISSING_FIELDS, HTTP_CODES.BAD_REQUEST);
    return;
  }

  try {
    await notifyUser(userId, message);
    sendSuccessResponse(res, SuccessMessages.NOTIFICATION_SENT);
  } catch (error) {
    logger.error('Error sending notification:', error);
    sendErrorResponse(res, ErrorMessages.INTERNAL_ERROR, HTTP_CODES.INTERNAL_SERVER_ERROR);
  }
});

export default router;
