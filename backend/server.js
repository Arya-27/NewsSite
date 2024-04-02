import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// cors middleware
app.use(
  cors({
    origin: ["https://news-site-silk.vercel.app", "http://127.0.0.1:5500"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    exposedHeaders: ["set-cookie"],
  })
);

const port = 3000;

const API_KEY = process.env.NEWSAPI_KEY;
const url = "https://newsapi.org/v2/everything?q=";

app.get("/", (req, res) => {
  res.send("Hello from Node.js server!");
});

app.get("/news", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const newsData = await response.json();
    res.json(newsData); // Send news data back to client-side
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching news");
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));