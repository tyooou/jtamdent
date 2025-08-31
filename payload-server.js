const payload = require("payload");

payload
  .init({
    secret: process.env.PAYLOAD_SECRET || "some-secret",
    mongoURL: process.env.MONGO_URL || "mongodb://localhost:27017/payload",
    express: require("express")(),
  })
  .then(() => {
    console.log("Payload initialized");
  });
