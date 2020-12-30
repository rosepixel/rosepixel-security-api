import express from "express";
import cors from "cors";
import helmet from "helmet";

export const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
