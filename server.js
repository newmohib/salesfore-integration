const express = require('express');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const GoogleStrategy = require('passport-google-oauth20');
const passportConfig = require('./passport-config')
const { checkAuthenticated } = require('./helper/middleware')
const config = require('./config/index');
var sf = require('node-salesforce');
const port = config.port;

app.set('view-engine', 'ejs');
app.use(flash());
app.use(cors())
// app.use(session({
//     secret: config.secret,
//     saveUninitialized: true,
//     resave: true,
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(passportConfig)

// app.get('/', (req, res) => {
//     res.render('index.ejs')
// });

// app.get('/home',  (req, res) => {
//     console.log("user", req.user);
//     res.send("success Login")
// });

// app.get('/login', passport.authenticate('google', { scope: ['profile'] }));

// app.get('/oauth',
//     passport.authenticate('google', {
//         successRedirect: "http://localhost:3000",
//         failureRedirect: "/"

//     }),

// );

app.get('/login/success', (req, res) => {
    res.send({ status: 200 })
});

app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect("/")
})


app.post('/test', (req, res) => {

    const selesforceLogin = () => {

        let conn = new sf.Connection({
            oauth2: {
                loginUrl: "https://login.salesforce.com",
                clientId: "3MVG959Nd8JMmavRcWoor8gqTZssli.oQ6avykUjUM3YkjVQdhk0CEon8BU0_maWwqRPJTkjgJTP_yTcfnXjt",
                clientSecret: "C649A1D64248D00BD4E070CF107DBCD2FBDBE4C50D1D025AC3B9CD1D9396AEF4",
                grantType: "password"
            }
        }
        );
        return new Promise(function (resolve, reject) {
            conn.login("mohibidb-akks@force.com", "@@mohib100@@YFB6LYy1t54CoSDjig4NTR08R", function (err, userInfo) {

                console.log("test-4", conn);
                if (err) {
                    // console.log('error',err)
                    reject(err)
                }
                let tokenInstance = {
                    'accessToken': conn.accessToken,
                    'instance': conn.instanceUrl,
                }
                resolve(tokenInstance)
            })

        })
    }
    console.log("test-3");
    selesforceLogin().then(function (result) {
        console.log("access token", result);

        //
        // let conn = new sf.Connection({
        //     instanceUrl: result.instance,
        //     accessToken: result.accessToken
        // });

        // const salesforceProfile = () => {
        //     return new Promise((resolve, reject) => {
        //         // console.log('body', req.body.veevaId);
        //         conn.sobject("Account")
        //             // .find({},'FirstName')
        //             // .limit(2)
        //             .execute((err, records) => {

        //                 //  if (err) {
        //                 //      if(err.errorCode === 'INVALID_SESSION_ID'){
        //                 //          this.getIccAccessToken(req).then( (response) => {
        //                 //              this.isIccAccountExists(req);
        //                 //          }).catch( err => {
        //                 //              reject(false)
        //                 //          })
        //                 //      }
        //                 //      response.failure.errors[0].code=10007;
        //                 //      response.failure.errors[0].message="Service not avaiable ";
        //                 //      //console.log("resp",response.failure)
        //                 //      reject(response.failure)
        //                 //  }

        //                 //  if(records.length>0){
        //                 //      resolve(records[0]);
        //                 //  }else {
        //                 //      response.failure.errors[0].code=10005;
        //                 //      response.failure.errors[0].message="No veeva account found";
        //                 //      //  console.log("resp",response.failure)
        //                 //      reject(response.failure)
        //                 //  }

        //                 console.log("records", records);
        //                 console.log("err", err);

        //             });
        //     })
        // }

        // salesforceProfile().then(result => {
        //     console.log("result",result);
        //     res.send(result)

        // }).catch(err => {
        //     console.log("err",err);
        // })

        res.send(result)
    }).catch(err => {
        console.log('error');
        res.send(err)
    })

})















app.listen(port, function (e) {
    console.log('Server running at port', port);
});
