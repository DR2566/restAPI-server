const mysql = require('mysql');

class Database{
  constructor(){
    this.conn;
    this.databaseName = "Mateo";
  }
  createConnection(){
    this.conn = mysql.createConnection({
      host: "172.20.1.18",
      user: "user",
      database: this.databaseName
    });
    this.conn.connect((err)=>{
      if(err){
	console.log("something went wrong");
	};
      console.log("Connected!!!");
    });
  }
  executeGet(sql){
    const prom = new Promise((resolve, reject)=>{
      database.conn.query(sql, (err, res)=>{
        if(err){
          return reject(err);
        }
        return resolve(res);
      })
    })
    return prom;
  }
  executePost(sql, values){
    const prom = new Promise((resolve, reject)=>{
      database.conn.query(sql, [values],(err, res)=>{
        if(err){
          return reject(err);
        }
        return resolve(res);
      })
    })
    return prom;
  }
}


module.exports = database = new Database();
