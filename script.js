const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./Db');
const axios = require('axios');


app.use(cors({origin: "*"}));
app.use(express.json());

//****************** SENSOR TESTER *******************//

app.get('/test', (req, res)=>{
  axios.get('http://172.20.2.190:1111/test')
    .then((data)=>{
      console.log(data.data);
      res.send(data.data);
    })
    .catch((err)=>{
      console.log(err);
    })
})

//****************** SENSOR TESTER *******************//

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
app.get('/pressure', (req, res)=>{
  let sql = `SELECT * FROM ${"pressure"};`;
  database.executeGet(sql)
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{console.log(err)})
})
app.get('/uv', (req, res)=>{
  let sql = `SELECT * FROM ${"uv"};`;
  database.executeGet(sql)
    .then((result)=>{
      res.send(result);
    })
    .catch((err)=>{console.log(err)})
})


app.post('/temperature/post', (req, res)=>{
  let dataObject = req.body;
  let sql = `INSERT INTO temperature(value, create_time) VALUES ?`;
  let values = [
    [dataObject.value.toString(), database.getTime()]
  ];
  database.executePost(sql, values)
    .then((result)=>res.send("successfully added"))
    .catch((err)=>{console.log(err)});
})
app.post('/humidity/post', (req, res)=>{
  let dataObject = req.body;
  let sql = `INSERT INTO humidity(value, create_time) VALUES ?`;
  let values = [
    [dataObject.value.toString(), database.getTime()]
  ];
  database.executePost(sql, values)
    .then((result)=>res.send("successfully added"))
    .catch((err)=>{console.log(err)});
})
app.post('/pressure/post', (req, res)=>{
  let dataObject = req.body;
  let sql = `INSERT INTO pressure(value, create_time) VALUES ?`;
  let values = [
    [dataObject.value.toString(), database.getTime()]
  ];
  database.executePost(sql, values)
    .then((result)=>res.send("successfully added"))
    .catch((err)=>{console.log(err)});
})
app.post('/uv/post', (req, res)=>{
  let dataObject = req.body;
  let sql = `INSERT INTO uv(value, create_time) VALUES ?`;
  let values = [
    [dataObject.value.toString(), database.getTime()]
  ];
  database.executePost(sql, values)
    .then((result)=>res.send("successfully added"))
    .catch((err)=>{console.log(err)});
})

//****************** AUTHENTICATION *******************//

app.post('/auth/post', (req, res)=>{
  let dataObject = req.body;
  let user = dataObject.user;
  let password = dataObject.password;
  database.executeAuth(user, password)
    .then((result)=>{
      if(result.length){ // if there is such user
        let associatedPassword = result[0].password;
        if(associatedPassword === password){ // if the credentials matches
          res.send('true'); // the authentication passed successfully
        }else{
          res.send('false'); // the password for that user doesn't match the right password
        }        
      }else{
        res.send('false') // if there is no such user
      }
    })
    .catch((err)=>{
      console.log(err);
      res.send(err);
    })
})

//****************** AUTHENTICATION *******************//


app.listen(3333);