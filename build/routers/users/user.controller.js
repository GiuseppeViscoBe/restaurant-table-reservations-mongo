"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = __importDefault(require("../../models/users/user.schema"));
const mongoose_1 = __importDefault(require("mongoose"));
// const getUsers = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   res.status(200).json("user gotten");
// };
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const existingUser = yield user_schema_1.default.findOne({
            name: name,
            email: email,
        });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }
        const newUser = new user_schema_1.default({
            name: name,
            email: email,
        });
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const errorMessages = Object.values(error.errors)
                .map((error) => error.message)
                .join(", ");
            const errorCustom = new Error(errorMessages);
            errorCustom.statusCode = 400;
            next(errorCustom);
        }
        else {
            next(error);
        }
    }
});
exports.default = {
    createUser,
};
