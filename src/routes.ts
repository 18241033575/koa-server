import Router from '@koa/router';

import AuthController from './controller/auth';
import UserController from './controller/user';

const router = new Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);


// user相关路由
router.get('/user', UserController.listUsers);
router.get('/user/:id', UserController.showUserDetail);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);


export default router;