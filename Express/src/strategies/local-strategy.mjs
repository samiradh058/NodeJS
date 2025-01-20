import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const findUser = users.find((user) => user.id === id);
    if (!findUser) {
      throw new Error("User not found");
    }
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "name" }, (username, password, done) => {
    console.log("username", username);
    console.log("password", password);
    try {
      const findUser = users.find((user) => user.name === username);
      if (!findUser) {
        throw new Error("User not found");
      }
      if (findUser.password !== password) {
        throw new Error("Invalid credentials");
      }
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
