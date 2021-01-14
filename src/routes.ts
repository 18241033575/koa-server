import Router from '@koa/router';

import AuthController from './controller/auth';
import UserController from './controller/user';

const unprotectedRouter = new Router();

unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.post('/auth/register', AuthController.register);

const protectedRouter = new Router();

// user相关路由
protectedRouter.get('/user', UserController.listUsers);
protectedRouter.get('/user/:id', UserController.showUserDetail);
protectedRouter.put('/user/:id', UserController.updateUser);
protectedRouter.delete('/user/:id', UserController.deleteUser);

export {
    protectedRouter,
    unprotectedRouter
};
