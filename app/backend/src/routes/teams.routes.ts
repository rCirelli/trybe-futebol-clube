import * as express from 'express';
import TeamController from '../controllers/TeamController';

const router = express.Router();
const teamController = new TeamController();

router.get('/', (req, res) => teamController.getAll(req, res));

export default router;
