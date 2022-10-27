import * as express from 'express';
import MatchController from '../controllers/MatchController';
import matchValidation from '../middleware/validations/match.middleware';

const router = express.Router();
const matchController = new MatchController();

router.get('/', (req, res) => matchController.getAll(req, res));
router.post('/', matchValidation, (req, res) => matchController.create(req, res));
router.patch('/:id/finish', (req, res) => matchController.finishMatch(req, res));

export default router;
