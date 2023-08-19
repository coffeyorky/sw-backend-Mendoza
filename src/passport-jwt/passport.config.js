const passport = require("passport");
const { createHash } = require("../utils/brcyptPass");
const LocalStrategy = require("passport-local").Strategy;
const GitHudStrategy = require("passport-github2");
const jwt = require("passport-jwt");
const userModel = require("../dao/models/user.model");

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookie"];
  }
  return token;
};

const initializePassport = () => {

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "CoderS3cR3t@",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  //  passport.use(
  //    "register",
  //    new LocalStrategy(
  //      {
  //        passReqToCallback: true,
  //        usernameField: "email",
  //      },
  //      async (req, email, password, done) => {
  //        try {
  //          const { first_name, last_name, username } = req.body;
  //          const user = await userModel.findOne({ email });
  //          console.log({ user });
  //          if (user) {
  //            done(null, false, { message: "existe el usuario" });
  //          }
  //          const hashedPassword = createHash(password);

  //          const newUser = {
  //          first_name,
  //            last_name,
  //            username,
  //            email,
  //            password: hashedPassword,
  //          };
  //          const newu = await userModel.create(newUser);

  //          return done(null, newu);
  //        } catch (error) {
  //          console.log(error);
  //          return done(error);
  //        }
  //      }
  //    )
  //  );

  //  passport.use(
  //    "login",
  //    new LocalStrategy(
  //      {
  //        usernameField: "email,",
  //      },
  //      async (email, password, done) => {
  //        try {
  //          const user = await userModel.findOne({ email });
  //          if (!user) {
  //            return done(null, false);
  //          }
  //          const isValidPassword = checkValidPassword({
  //            hashedPassword: user.password,
  //            password,
  //          });
  //          if (!isValidPassword) {
  //            done(null, false);
  //          }
  //        } catch (error) {
  //          console.log(error);
  //          return done(error);
  //        }
  //      }
  //    )
  //  );

   passport.use(
     "github",
     new GitHudStrategy({
       clientID: "Iv1.1d03719415bb11c8",
       clientSecret: "653442fecb2cb5c6d6b78f8b72a12944badf472f",
       callbackURL: "http://localhost:8080/session/githubcallback",
       scope: ["user:email"] ,
     },
     async (token, refreshToken, profile, done) => {
       try{
         console.log({ email: profile.emails[0].value })
       const user = await userModel.findOne({ email: profile.emails[0].value})
       if(!user) {
         const newUser = {
           first_name: profile.name,
           last_name: profile.name,
           username: profile.username,
           email: profile.emails[0].value
         }
         const result = await userModel.create(newUser)
         return done(null, result)
       } else {
         return done(null, user)
       }
       } catch (error) {
         console.log(error)
       }}
     ));

   passport.serializeUser((user, done) => {
     done(null, user._id);
   });
   passport.deserializeUser(async (id, done) => {
     try {
       const user = await userModel.findById(id);
       done(null, user);
     } catch (error) {
       done(error);
     }
   });
};

module.exports = {
  initializePassport,
};

// privateKey: 653442fecb2cb5c6d6b78f8b72a12944badf472f
// clientId: Iv1.1d03719415bb11c8
