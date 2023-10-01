const SERVER_SECRET = "SecretoQueSoloConoceElServer";

const passport = require('passport');
const passportJwt = require('passport-jwt');
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

passport.use( 
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: SERVER_SECRET,
        }, 
        (jwtPayload, done) => {
            const user = jwtPayload;
            return done(null, user);
        }
    )
);

const jwtValidMDW = passport.authenticate('jwt', { session: false });

module.exports = { jwtValidMDW, SERVER_SECRET }; 