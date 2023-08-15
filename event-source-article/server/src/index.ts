import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 4000;

app.get("/event-source", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders(); // flush the headers to establish SSE

  /* 
  This is where you would store business logic and fetch data from your event driven provider
  This could be PubSub / NATS just to name a couple of examples 
  */
  let counter = 0;
  let interValID = setInterval(() => {
    counter++;
    if (counter > 10) {
      clearInterval(interValID);
      res.end(); // terminates SSE session
      return;
    }
    res.write(`event: interval\n`);
    res.write(`id: interval${counter} \n`);
    res.write(`data: ${JSON.stringify({ num: counter })}\n\n`); // res.write() instead of res.send()
  }, 1000);

  // If client closes connection, stop sending events
  res.on("close", () => {
    clearInterval(interValID);

    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
