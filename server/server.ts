
import express, { Express, Request, Response } from "express";
import sqlite3 from 'sqlite3';
import cors from 'cors';

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
app.use(cors());
app.options('*',cors());


app.post("/painscale", (req: Request, res: Response) => {
  const { weightLoss, fever, cough, pain } = req.body;
  db.run(
    `INSERT INTO symptoms (weight_loss, fever, cough, pain) VALUES (?, ?, ?, ?)`,
    [weightLoss, fever, cough, pain],
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

app.delete("/painscale/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  db.run(`DELETE FROM symptoms WHERE id = ?`, [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Data deleted successfully" });
  });
})

app.get("/painscale", (req: Request, res: Response) => {
  db.all(`SELECT * FROM symptoms`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
