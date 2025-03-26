import { createHmac, hash, randomBytes } from "node:crypto";
import { model, Schema } from "mongoose";
import { createTokenForUser } from "../services/authentication.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      // to hash password we will use this salt
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      // enum ka matlab hum apni values ko list kar rahe hain. We can't give any values other than USER and ADMIN
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  // whenever we try to save a user this function will run and the salt and hashed password will be generated
  const user = this;

  if (!user.isModified("password")) return;

  // Now hashing the password (encrypting)

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password; // hashed password stored in DB at the time of signup

    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password");

    // return { ...user, password: undefined, salt: undefined };

    const token = createTokenForUser(user);

    return token;
  }
);

const User = model("user", userSchema);

export default User;
