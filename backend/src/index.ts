import path from "path";
import express from "express";
import { api } from "./api";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, "../build")));

// api routes
api(app);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
