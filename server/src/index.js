import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import { Server as SocketIOServer } from "socket.io";
import { connectDB } from "./db.js";
import createPostsRouter from "./routes/posts.js";
import { errorHandler } from "./middleware/error.js";

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

async function main() {
  await connectDB(process.env.MONGO_URI);

  const app = express();
  const server = http.createServer(app);
  const io = new SocketIOServer(server, { cors: { origin: CLIENT_ORIGIN } });

  app.use(cors({ origin: CLIENT_ORIGIN }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/", (req, res) =>
    res.json({ status: "ok", service: "discussion-forum" })
  );
  app.use("/posts", createPostsRouter({ io }));

  app.use(errorHandler);

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected", socket.id);
    socket.on("disconnect", () =>
      console.log("🔌 Socket disconnected", socket.id)
    );
  });

  server.listen(PORT, () =>
    console.log(`🚀 API listening on http://localhost:${PORT}`)
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
