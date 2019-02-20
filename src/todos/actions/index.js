import * as types from '../constants/ActionTypes'
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(__dirname+'/data.db');

// export const addTodo = text => ({ type: types.ADD_TODO, text })
// export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const deleteTodo = (id) => {
    return async (dispatch )=> {
      console.log("async");
      db.serialize(()=>{
        var cmd="delete from   todo where id="+id;
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
             var res={};
             res.error=err;
             res.data=row;
             dispatch({ type: types.LOAD_TODO_RES, res });
        });
      });
  };
}
// export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const editTodo = (id,text) => {
    return async (dispatch )=> {
      db.serialize(()=>{
        var cmd="update todo set text='"+text+"' where id="+id;
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
             var res={};
             res.error=err;
             res.data=row;
             dispatch({ type: types.LOAD_TODO_RES, res });
        });
      });
  };
}

// export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeTodo = (id) => {
    return async (dispatch )=> {
      db.serialize(()=>{
        var cmd="update todo set completed=1 where id="+id;
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
             var res={};
             res.error=err;
             res.data=row;
             dispatch({ type: types.LOAD_TODO_RES, res });
        });
      });
  };
}
// export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const completeAll = () => {
    return async (dispatch )=> {
      db.serialize(()=>{
        var cmd="update todo set completed=1 ";
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
             var res={};
             res.error=err;
             res.data=row;
             dispatch({ type: types.LOAD_TODO_RES, res });
        });
      });
  };
}
// export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const clearCompleted = () => {
    return async (dispatch )=> {
      db.serialize(()=>{
        var cmd="delete from  todo where completed=1 ";
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
             var res={};
             res.error=err;
             res.data=row;
             dispatch({ type: types.LOAD_TODO_RES, res });
        });
      });
  };
}

export const loadTodo = () => {
    return async (dispatch )=> {
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
export const addTodo = (text) => {
    return async (dispatch )=> {
      db.serialize(()=>{
        var cmd="insert into  todo(text,completed) values('"+text+"',0)";
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
             var res={};
             res.error=err;
             res.data=row;
             dispatch({ type: types.LOAD_TODO_RES, res });
        });
      });
  };
}

