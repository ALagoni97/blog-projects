import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 4000;

app.get("/event-source", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  /* 
  Store business logic here - Fetch from external sources (Message broker)
  */
  let counter = 0;
  let interval = setInterval(() => {
    counter++;
    if (counter > 10) {
      clearInterval(interval);
      res.end();
    }
    res.write(`event: interval\n`);
    res.write(`id: interval${counter} \n`);
    res.write(`data: ${JSON.stringify({ num: counter })}\n\n`);
  }, 1000);

  res.on("close", () => {
    clearInterval(interval);

    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
