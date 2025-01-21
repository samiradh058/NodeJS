import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log(`Deserializing user with id: ${id}`);
  try {
    const findUser = await User.findById(id);
    if (!findUser) {
      throw new Error("User not found");
    }
    done(null, findUser);
  } catch (err) {
    console.error("Error in deserializing user:", err);
    done(err, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "name" }, async (username, password, done) => {
    try {
      console.log(`Authenticating user with username: ${username}`);

      const findUser = await User.findOne({ name: username });
      if (!findUser) {
        throw new Error("User not found");
      }
      if (findUser.password !== password) {
        throw new Error("Invalid password");
      }
      console.log("DONE authenticating user");
      done(null, findUser);
    } catch (err) {
      console.error("Error in authenticating user:", err);

      done(err, null);
    }
  })
);
