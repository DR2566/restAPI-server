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
      password: "oh.j5Ri[4Xcpv!lf",
      database: this.databaseName
    });
    let prom = new Promise((resolve, reject)=>{
      this.conn.connect((err)=>{
        if(err){
          console.log("something went wrong");
          reject();
        }else{
          console.log("Connected!!!");        
          resolve();
        }
      });
    })
    return prom;
  }
  async executeGet(sql){
    await this.createConnection();
    const prom = new Promise((resolve, reject)=>{
      this.conn.query(sql, (err, res)=>{
        if(err){
          return reject(err);
        }
        return resolve(res);
      })
    })
    this.conn.end();
    return prom;
  }
  async executePost(sql, values){
    await this.createConnection();
    const prom = new Promise((resolve, reject)=>{
      this.conn.query(sql, [values],(err, res)=>{
        if(err){
          return reject(err);
        }
        return resolve(res);
      })
    })
    this.conn.end();
    return prom;
  }

  async executeAuth(user){
    await this.createConnection();
    const prom = new Promise((resolve, reject)=>{
      let sql = `SELECT password FROM auth WHERE user = '${user}'`;
      this.conn.query(sql, (err, res)=>{
        if(err){
          return reject(err);
        }
        return resolve(res);
      })
    })
    return prom
  }

  getTime(){
    let clock = new Date();
    var date = String(clock.getFullYear())+'-'+String((clock.getMonth()+1)).padStart(2, "0")+'-'+String(clock.getDate()).padStart(2, "0");
    var time = String(clock.getHours()).padStart(2, "0") + ":" + String(clock.getMinutes()).padStart(2, "0") + ":" + String(clock.getSeconds()).padStart(2, "0");
    let timeStamp = date +';'+time;
    console.log(timeStamp);
    return timeStamp;
  }
}


module.exports = database = new Database();
