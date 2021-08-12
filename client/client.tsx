/** @format */

import { React, ReactDom } from "../clientDeps.ts";
import App from "./app.tsx";

(ReactDom as any).hydrate(<App />, document.getElementById("root"));
