const Task = require("../model/index").task;
const User = require("../model/index").user;
var ObjectId = require('mongodb').ObjectID;
const getTodo =async(req, res) => {
  try{
    const user = await User.findById(req.userId);
    res.json({
      task:user.task
    })
  }catch(e){
    res.status(403).json({
      message:"unable to fetch todos"
    })
  }
};

const createTodo =async(req, res) => {
  try{
    const task = {task:req.body.task};
    const user = await User.findById(req.userId);
    user.task.push(task);
    const updatedUser = await user.save();
    res.json({
      message:"successfully added todos"
    })
  }catch(e){
    console.log(e);
    res.status(403).json({message:"unable to create todos"})
  }
};

const updateTodo = async(req, res) => {
  try{
    await User.updateOne(
      {
          '_id':req.userId,
          'task._id':req.query.taskId
      },
      {
          $set: { 'task.$.task' : req.body.task } 
      }
  );
  res.json({
    message:"updated todos"
  });
  }catch(e){
    console.log(e);
    res.status(403).json({
      message:"unable to update todos"
    })
  }
};

const deleteTodo = async(req, res) => {
  try{
    const updateTodosForUser = await User.updateOne({"_id": ObjectId(`${req.userId}`)},{
      $pull: {
        task: {
          "_id": ObjectId(`${req.query.taskId}`)
        }
      }
    });
    res.json({
      message:"todos deleted succesfully"
    })

  }catch(e){
    console.log(e)
    res.status(403).json({
      message:"unable to delete todos"
    })
  }
};

module.exports = { getTodo, createTodo, updateTodo, deleteTodo };
