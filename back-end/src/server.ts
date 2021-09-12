import http from "http";

import app from "@src/app";

const PORT = process.env.PORT || 4000;

export const httpServer = http.createServer(app);


httpServer.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
