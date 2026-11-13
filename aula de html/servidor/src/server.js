import http from 'http';
import { json } from "./middlewares/json.js";
import { manipuladorDeRotas } from "./routes.js";

const server = http.createServer(async (request, response) => {
  await json(request, response);
  await manipuladorDeRotas(request, response);
});

server.listen(3000, () => {
  console.log("API rodando na porta 3000: http://localhost:3000");
});
