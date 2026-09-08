const config = require("./config/env");
const connectDb = require("./config/db");
const app = require("./app");

const startServer = async () => {
    await connectDb();
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
};

startServer();