import { OAuth2Strategy } from "passport-google-oauth";

var GoogleStrategy = new OAuth2Strategy({
    clientID: "1009097666797-uhn2u1uahjoo7d9loh1tqs7eijhee6nr.apps.googleusercontent.com",
    clientSecret: "dytScghaMzJ1oelxGumXkHtu",
    callbackURL: "/auth/callback"
},
function(accessToken, refreshToken, profile, done) {
    process.nextTick(() => {
        return done(null, profile);
    })
})

export default GoogleStrategy;