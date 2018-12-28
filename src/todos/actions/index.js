import * as types from '../constants/ActionTypes'
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(__dirname+'/data.db');

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const loadTodo = () => {
    console.log("loadTodo");
    return async (dispatch )=> {
      console.log("async");
      db.serialize(()=>{
            db.all("SELECT * FROM todo", (err, row) =>{
                 var res={};
                 res.error=err;
                 res.data=row;
                 dispatch({ type: types.LOAD_TODO_RES, res });
            });
      });
  };
}
