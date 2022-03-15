const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("config");

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("jwtSecret"),
    },
    function (jwt_payload, done) {
      process.nextTick(() => {
        done(null, jwt_payload);
      });
    }
  )
);

function authValidator() {
  return passport.authenticate("jwt", { session: false });
}

module.exports = authValidator;
