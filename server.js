const express = require("express")
const axios = require("axios")
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,resp)=>{
    resp.sendFile(__dirname+"/index.html")   
})
    
app.post("/",(req,resp)=>{
    const query = req.body.city
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=56711fd65b8cff24bc26aece15852e31&units=metric"
    axios.get(url).then((res)=>{
    console.log(res.data);
    const temperature = res.data.main.temp
    const description = res.data.weather[0].description
    const icon = res.data.weather[0].icon
    const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
    resp.write("<h1>The temperature in "+query+" is " + temperature + " degrees Celcius</h1>")
    resp.write("<p>The weather description is "+ description +"</p>")
    resp.write("<img src="+imageurl+">")
    resp.send()
    })
   
})
app.listen(3000,()=>{
    console.log("Port has succesfully started running");
})