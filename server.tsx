import { Application, Router } from "./serverDeps.ts";

import { React, ReactDOMServer } from "./clientDeps.ts";
import { Cron, ObsidianRouter, gql } from "./serverDeps.ts";


const PORT = 3000;
const app = new Application();

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
 });
