import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import { solve, verify } from "./solve";

const app = express();

app.get("/api/solve", async (req: Request, res: Response) => {
  try {
    let length = Number(req.query.length);
    if (isNaN(length) || length <= 0) {
      return res.status(400).json({ error: "Length is invalid." });
    }
    if (!length) length = 5;
    const result = await solve(length);
    return res.json({ result });
  }
  catch (error) {
    return res.status(500).send("An error occurred, Please try again.");
  }
});

app.get("/api/verify", async (req: Request, res: Response) => {
  try {
    const word = req.query.word as string;
    if (!word || word.length < 1) {
      return res.status(400).json({ error: "Word is required." });
    }
    const result = await verify(word);
    return res.json(result);
  }
  catch (error) {
    return res.status(500).send("An error occurred, Please try again.");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});