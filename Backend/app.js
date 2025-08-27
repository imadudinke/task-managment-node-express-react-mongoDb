"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./Routes/routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 5000;
const startServer = async () => {
    console.log("starting server...");
    await (0, db_1.connectDB)();
    app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
    app.use((0, cookie_parser_1.default)());
    app.use("/", routes_1.default);
    app.listen(PORT, () => {
        console.log(`The server is running: ${PORT} `);
    });
};
startServer();
//# sourceMappingURL=app.js.map