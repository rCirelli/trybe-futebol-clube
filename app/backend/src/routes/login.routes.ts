import * as express from 'express';

const router = express.Router();

router.get('/', (_req, res) => { res.status(200).send('ok'); });

export default router;
