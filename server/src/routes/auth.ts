import express from 'express';
import { AuthController } from '../controllers';
import { validator } from '../middlewares';

const router = express.Router();

export default (() => {
  router.post('/register', validator('register'), AuthController.register);
  router.post('/login', validator('login'), AuthController.login);
  router.post('/refresh-token', AuthController.refreshToken);
  router.post('/logout', AuthController.logOut);

  return router;
})();
