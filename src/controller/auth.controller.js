const { authService } = require("../service/auth.service");

async function register(req, res) {
  /*
      #swagger.tags = ['Authentication']
      #swagger.summary = "SignUp API"
      #swagger.parameters['body'] = {
      in : 'body',
      description : "user or admin can signUp here",
      required : true,
      schema : {
          name: "Abul Faiz",
          email: "abulfaiz428@gmail.com",
          password: "Login@123",
          role: "ADMIN",
          favoriteGenres: ["Action", "Sci-Fi"],
      }
}
  */
  const result = await authService.signUp(req.body);
  return res.send(result);
}

async function login(req, res) {
  /*
     #swagger.tags = ['Authentication']
     #swagger.summary = 'Login API'
     #swagger.parameters['body'] = {
     in : 'body',
     description : 'User or Admin can login here',
     required : true,
     schema : {
         email : "jay@gmail.com",
         password : "Login@123"
     }
  }
*/
  const result = await authService.login(req.body);
  return res.send(result);
}

async function passwordRequest(req, res) {
  /*
  #swagger.tags = ['Authentication']
  #swagger.summary = 'Password request API via Email'
  #swagger.parameters['body'] = {
  in : 'body',
  required : true,
  schema : {
  email : "abulfaiz428@gmail.com",
    }
}
*/
  const result = await authService.requestPassword(req.body.email);
  return res.send(result);
}

async function resetPassword(req, res) {
  /*
     #swagger.tags = ['Authentication']
     #swagger.summary = 'Reset Password API'
     #swagger.parameters['body'] = {
     in : 'body',
     description : 'User or Admin can reset password here',
     required : true,
     schema : {
     token : "any",
     newPassword : "Login@123#"
          }
      }
  */
  const { token, newPassword } = req.body;
  const result = await authService.reset(token, newPassword);
  return res.send(result);
}

const authController = { register, login, passwordRequest, resetPassword };
module.exports = { authController };
