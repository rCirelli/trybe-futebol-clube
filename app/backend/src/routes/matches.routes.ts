import * as express from 'express';
import MatchController from '../controllers/MatchController';
import matchValidation from '../middleware/validations/match.middleware';
import tokenAuth from '../middleware/auth/tokenAuthentication';

const router = express.Router();
const matchController = new MatchController();

router.get('/', (req, res) => matchController.getAll(req, res));
router.post('/', tokenAuth, matchValidation, (req, res) => matchController.create(req, res));
router.patch('/:id/finish', (req, res) => matchController.finishMatch(req, res));
router.patch('/:id', (req, res) => matchController.setGoals(req, res));

export default router;
