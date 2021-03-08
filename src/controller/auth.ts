import { Context } from "koa";
import * as argon2 from "argon2";
import { getManager } from "typeorm";
import jwt from 'jsonwebtoken';
const lodash = require("lodash");

import { User } from '../entity/user';
import { JWT_SECRET } from "../constants";
import {ForbiddenRepeat, UnauthorizedException} from "../exceptions";

export default class AuthController {
    public static async login(ctx: Context) {
        const userRepository = getManager().getRepository(User);
        const user = await userRepository
            .createQueryBuilder()
            // @ts-ignore
            .where({name: ctx.request.body.name})
            .addSelect('User.password')
            .getOne();

        if (!user) {
            throw new UnauthorizedException('用户名不存在');
            // @ts-ignore
        } else if (user.password !== ctx.request.body.password) {
            throw new UnauthorizedException('密码错误')
        } else {
            ctx.status = 200;
            ctx.body = { token: jwt.sign({ id: user.id }, JWT_SECRET) };
        }
    }


    public static async register(ctx: Context) {
        const userRepository = getManager().getRepository(User);
        const userCheck = await userRepository.findOne();
        if (!lodash.isEmpty(userCheck)) {
            throw new ForbiddenRepeat();
        }
        const newUser = new User();
        // @ts-ignore
        newUser.name = ctx.request.body.name;
        // @ts-ignore
        newUser.email = ctx.request.body.email;
        // @ts-ignore
        // newUser.password = await argon2.hash(ctx.request.body.password);
        newUser.password = ctx.request.body.password;
        console.log(newUser);
        const user = await userRepository.save(newUser);
        console.log(user);
        ctx.status = 201;
        ctx.body = user;
    }
}
