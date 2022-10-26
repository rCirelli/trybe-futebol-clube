import * as express from 'express';
import MatchController from '../controllers/MatchController';

const router = express.Router();
const matchController = new MatchController();

router.get('/', (req, res) => matchController.getAll(req, res));
router.post('/', (req, res) => matchController.create(req, res));

export default router;
