const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./Db');
database.createConnection();


app.use(cors({origin: "*"}));
app.use(express.json());

app.get('/temperature', (req, res)=>{
  let sql = `SELECT * FROM ${"temperature"};`;
  database.executeGet(sql) //this method returns a promise
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{console.log(err)})
})
app.get('/humidity', (req, res)=>{
  let sql = `SELECT * FROM ${"humidity"};`;
  database.executeGet(sql)
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{console.log(err)})
})


app.post('/temperature/post', (req, res)=>{
  let dataObject = req.body;
  console.log(req.body);
  console.log(dataObject.value.toString());
  console.log(dataObject.create_time);
  let sql = `INSERT INTO ${"temperature"}(value, create_time) VALUES ?`;
  let values = [
    [dataObject.value.toString(), dataObject.create_time.toString()]
  ];
  database.executePost(sql, values)
    .then((result)=>res.send("successfully added"))
    .catch((err)=>{console.log(err)});
})

app.listen(3333);