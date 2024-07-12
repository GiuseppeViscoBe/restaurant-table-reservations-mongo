import IUser from "./user.interface";
import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
});

const User = model<IUser>("User", userSchema);

export default User;
