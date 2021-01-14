import { Context } from "koa";

export function logger() {
    return async (ctx: Context, next: () => Promise<void>) => {
        const start = new Date().getTime();
        await next();
        const ms = new Date().getTime() - start;
        console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
    }
}
