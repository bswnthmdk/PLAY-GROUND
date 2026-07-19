import { inngest } from "./inngest.js";

await inngest.send({
  name: "app/hello",
  data: {
    name: "Biswanath",
  },
});

console.log("Event sent");
