import * as express from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = express.Router();
const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.home(req, res));

export default router;
