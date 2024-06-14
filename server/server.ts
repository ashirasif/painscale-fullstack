
import express, { Express, Request, Response } from "express";
import sqlite3 from 'sqlite3';


const app: Express = express();
const port = process.env.PORT || 3000;

// Create and connect to the SQLite database and store it in memory
const db = new sqlite3.Database(':memory:');

// Create a table to store the pain scale data
db.run(`
  CREATE TABLE symptoms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  weight_loss TEXT CHECK(weight_loss IN ('yes', 'no')),
  fever TEXT CHECK(fever IN ('yes', 'no')),
  cough TEXT CHECK(cough IN ('yes', 'no')),
  pain INTEGER
  );
`);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/painscale", (req: Request, res: Response) => {
  const { weight_loss, fever, cough, pain } = req.body;
  db.run(
    `INSERT INTO symptoms (weight_loss, fever, cough, pain) VALUES (?, ?, ?, ?)`,
    [weight_loss, fever, cough, pain],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: "Data inserted successfully" });
    }
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
