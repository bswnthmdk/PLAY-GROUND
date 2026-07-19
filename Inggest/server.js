import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest.js";
import { helloFunction } from "./functions.js";

const app = express();

// Add this
app.use(express.json());

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [helloFunction],
  }),
);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
