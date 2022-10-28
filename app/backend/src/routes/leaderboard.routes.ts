import * as express from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = express.Router();
const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.leaderboard(req, res));
router.get('/away', (req, res) => leaderboardController.leaderboard(req, res));

export default router;
