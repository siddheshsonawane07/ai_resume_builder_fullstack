import express, { json, query } from "express";
import cors from "cors";
const app = express();

app.listen(3000, () => {
  console.log("listening on port 3000");
});


//middleware
app.use(cors());
app.use(json());

app.get("/api/hello", (req, res) => {
  res.send("hello from server");
});