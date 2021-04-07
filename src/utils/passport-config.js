import { OAuth2Strategy } from "passport-google-oauth";
import 'dotenv/config';

var GoogleStrategy = new OAuth2Strategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "/auth/callback"
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(() => {
        return done(null, profile);
    })
})

export default GoogleStrategy;