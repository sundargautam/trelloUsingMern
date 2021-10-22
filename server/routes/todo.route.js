const taskController = require("../controller/todo.controller");
const {authJwt} = require("../middleware/index");
module.exports = function(app) {
    app.use((req, res, next)=>{
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/api/todos",[authJwt.verifyToken],taskController.getTodo);
    app.post("/api/todos",[authJwt.verifyToken],taskController.createTodo);
    app.put("/api/todos",[authJwt.verifyToken],taskController.updateTodo);
    app.delete("/api/todos",[authJwt.verifyToken],taskController.deleteTodo);
  };