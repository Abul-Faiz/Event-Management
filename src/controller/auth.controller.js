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
          role: "ADMIN"
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

const authController = { register, login };
module.exports = { authController };
