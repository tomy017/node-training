import express from 'express';
import UserController from '../controllers/user-controller';
const router = express.Router();
const controller = new UserController();

router.get('/signup', (req, res) => {
  controller.signup(req, res);
})

export default router;