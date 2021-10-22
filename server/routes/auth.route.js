const authController = require("../controller/auth.controller");
const {verifySignUp} = require("../middleware/index");
module.exports = function(app) {
    app.use((req, res, next)=>{
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.post("/api/auth/signup",[...verifySignUp.signUpBodyValidator,verifySignUp.checkDuplicateUsernameOrEmail],authController.signup);
    app.post("/api/auth/signin",authController.signin);

  };