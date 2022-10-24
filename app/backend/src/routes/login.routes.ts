import * as express from 'express';
import LoginController from '../controllers/LoginController';
import validation from '../middleware/validations/login.middleware';

const router = express.Router();

router.post('/', validation, (req, res) => LoginController.login(req, res));
router.get('/validate', (req, res) => LoginController.validate(req, res));

export default router;
