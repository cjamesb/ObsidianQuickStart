/** @format */

import { Application, Router } from "./serverDeps.ts";
import { React, ReactDOMServer } from "./clientDeps.ts";
import { Cron, ObsidianRouter, gql } from "./serverDeps.ts";
import App from "./client/app.tsx";
import { staticFileMiddleware } from "./staticFileMiddleware.ts";
import resolvers from "./server/resolvers.ts";
import types from "./server/schema.ts";
import { createDb } from "./server/db/db.ts";

const PORT = 3000;
const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  //console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

//create and seed DB
createDb();

// Create Route
const router = new Router();

router.get("/", (ctx: any) => {
  try {
    const body = (ReactDOMServer as any).renderToString(<App />);
    ctx.response.body = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Obsidian Film Showcase</title>
      </head>
      <body>
        <div id="root">${body}</div>
        <script src="/static/client.tsx" defer></script>
      </body>
      </html>`;
  } catch (err) {
    console.log({ error: err });
  }
});

// for bundling the hydrated app
const { files, diagnostics } = await Deno.emit("./client/client.tsx", {
  bundle: "module",
});

//Router for serving bundle
const bundleRouter = new Router();
bundleRouter.get("/static/client.js", (ctx) => {
  ctx.response.headers.set("Content-Type", "text/html");

  ctx.response.body = files["deno:///bundle.js"];
});

//Attach routes
app.use(router.routes());
app.use(staticFileMiddleware);
app.use(bundleRouter.routes());
app.use(router.allowedMethods());

// setting up the ObsidianRouter interface
interface ObsRouter extends Router {
  obsidianSchema?: any;
}

//Now we create the GraphQLRouter
const GraphQLRouter = await ObsidianRouter<ObsRouter>({
  Router,
  // context: () => console.log('hi, Cameron'),
  typeDefs: types, // need to input some types
  resolvers: resolvers, //need to input some resolvers
  redisPort: 6379,
  useCache: true,
  usePlayground: true,
  useQueryCache: true,
  useRebuildCache: true,
});

// now we attach the graphql router routes to our app
app.use(GraphQLRouter.routes(), GraphQLRouter.allowedMethods());

// adds an eventListener to listen at PORT
app.addEventListener("listen", () => {
  console.log(`listening on localhost:${PORT}`);
});

await app.listen({ port: PORT });
