import { Application, Router } from "oak";
import { oakCors } from "oakCors";
import { parseLegal } from "parseLegal";

const port = 8050;

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello World";
  })
  .get("/api/:japanese", (context) => {
    if (!context?.params?.japanese) return;
    const japanese = decodeURIComponent(context.params.japanese);
    const legal = parseLegal(japanese);
    context.response.body = { japanese, legal };
  });

const app = new Application();
app.use(oakCors()); 
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${port} | http://localhost:${port}`);

await app.listen({ port });
