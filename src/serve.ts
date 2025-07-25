import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./routers/main";

const server = express();
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.use(express.json());

server.use(mainRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`servidor rodando em http://localhost:${PORT}`);
})