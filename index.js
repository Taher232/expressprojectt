//get a server 
const express = require ('express');
const app = express();
const fs = require('fs');
const path = require ('path');

//create middleware

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var day = today.getDay();//0 for Sunday, 1 for Monday, 2 for Tuesday
var dateTime = day+' '+date+' '+time;
var hour = today.getHours();

const checkDate = (req,res,next)=>{
    (day >=1 && day <=5 ) && (hour >=9 && hour <= 17) ?
    next():
    res.send("<h1> our service is only available during working hours (Monday to Friday,  from 9 to 17)</h1>")
};



// //Call middleware
app.use(checkDate);
app.use(express.static(path.join(__dirname,'public')));

// Define Port
const PORT = process.env.PORT || 5000


// app.get("/", (req,res) => {
//     res.sendFile(path.join(__dirname,"public","index.html"))
// })

//Define route
app.get('/', (req,res) =>{
    fs.readFile('public/index.html','utf-8',(err,data)=>{
        err ? console.log('404 not found ')
        :res.send(data);
    });
    
});

app.listen(PORT , () => console.log(`server running on port ${PORT}`));