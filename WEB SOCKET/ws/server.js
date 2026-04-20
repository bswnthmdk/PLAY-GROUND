import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// 0: CONNECTING
// 1: OPEN (Then state when the connection is open and ready to communicate)
// 2: CLOSING
// 3: CLOSED

// Connection Event
wss.on("connection", (socket, req) => {
  const ip = req.socket.remoteAddress; // Get the client's IP address

  //   Message Event
  socket.on("message", (rawData) => {
    const msg = rawData.toString();

    console.log({ rawData }); // Log the raw data received from the client

    console.log(`${ip}: ${msg}`); // Log the client's IP address along with the message

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(`Server Broadcast: ${msg}`); // Broadcast the message to all connected clients
      }
    });
  });

  //   Error Event
  socket.on("error", (err) => {
    console.error(`Error from ${ip}:`, err); // Log any errors that occur with the client's connection
  });

  //   Close Event
  socket.on("close", () => {
    console.log(`Connection closed: ${ip}`); // Log when the client's connection is closed
  });
});

console.log("Server is live on ws://localhost:8080");
