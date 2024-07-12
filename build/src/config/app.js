"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("../routers/user/user.router"));
const db_config_1 = __importDefault(require("./db.config"));
const errorHandler_middleware_1 = __importDefault(require("../middlewares/errorHandler.middleware"));
const app = (0, express_1.default)();
(0, db_config_1.default)();
app.use(express_1.default.json());
app.use(user_router_1.default);
app.use(errorHandler_middleware_1.default);
exports.default = app;
