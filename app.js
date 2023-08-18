import express from "express";
import cors from "cors";
import { Wirite } from "./handle";


const app=express();
app.use(express.json());
app.use(cors());
app.use("",Wirite);

export const viteNodeApp=app;