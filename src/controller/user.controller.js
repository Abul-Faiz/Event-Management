const { userService } = require("../service/user.service");

async function userList(req, res) {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Get all users'
  const { pageNumber, pageSize, name } = req.query;
  const result = await userService.getAll(pageNumber, pageSize, name);
  return res.send(result);
}

async function userID(req, res) {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Get by Id'
  const { userId } = req.params;
  const result = await userService.getById(userId);
  return res.send(result);
}

async function userUpdate(req, res) {
  /*
      #swagger.tags = ['Profile']
      #swagger.summary = "profile update API"
      #swagger.parameters['body'] = {
      in : 'body',
      description : "user can update their profile here",
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
  const { userId } = req.params;
  const result = await userService.updateProfile(userId, req.body);
  return res.send(result);
}

async function userDelete(req, res) {
  // #swagger.tags = ['Profile']
  // #swagger.summary = 'Delete user API'
  const { userId } = req.params;
  const result = await userService.deleteUser(userId);
  return res.send(result);
}

const userController = { userList, userID, userUpdate, userDelete };
module.exports = { userController };
