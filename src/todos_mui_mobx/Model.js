import { makeAutoObservable } from "mobx"
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(__dirname+'/data.db');
const map_func=(one,idx)=>{
                one.completed=one.completed===1?true:false;
                return one
}
export default class Todo {
  todos=[{id:0,text:"0000",completed: false}];
  constructor() {
    //  autorun(() => {
    //     console.log(this.todos);
  	 // });
    makeAutoObservable(this)
  }
  actions={
    addTodo:(text)=>{
      this.addTodo(text);
    },
    clearCompleted:()=>{
      this.clearCompleted();
    },
    completeAll:()=>{
      this.completeAll();
    },
    loadTodo:()=>{
      this.loadTodo();
    },
    editTodo:(id,text)=>{
      this.editTodo(id,text);
    },
    completeTodo:(id)=>{
      this.completeTodo(id);
    },
    deleteTodo:(id)=>{
      this.deleteTodo(id);
    },
  };
  clearCompleted =()=>{
      db.serialize(()=>{
        var cmd="delete from  todo where completed=1 ";
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
              this.todos=row.map(map_func);
        });
      });   
  }
  completeAll=()=>{
      db.serialize(()=>{
        var cmd="update todo set completed=1 ";
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
             this.todos=row.map(map_func);
        });
      });    
  }
  addTodo=(text)=>{
     db.serialize(()=>{
        var cmd="insert into  todo(text,completed) values('"+text+"',0)";
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
              this.todos=row.map(map_func);
        });
      });
  }//id, text
  completeTodo=(id)=>{
      db.serialize(()=>{
        var cmd="update todo set completed=1 where id="+id;
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
              this.todos=row.map(map_func);
        });
      });  }//id, text
  deleteTodo=(id)=>{
      db.serialize(()=>{
        var cmd="delete from   todo where id="+id;
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
              this.todos=row.map(map_func);
        });
      });
  }//id, text
  editTodo=(id,text)=>{
      db.serialize(()=>{
        var cmd="update todo set text='"+text+"' where id="+id;
        db.run(cmd);
        db.all("SELECT * FROM todo", (err, row) =>{
             this.todos=row.map(map_func);
        });
      });
  }//id, text
  loadTodo=()=>{
      db.serialize(()=>{
            db.all("SELECT * FROM todo", (err, row) =>{
                this.todos=row.map(map_func);
            });
      });
  }//id, text
}
