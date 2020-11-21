const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const query= req.body.cityName;
  const unit= "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=9207ad485e5f8ce59ff31095ecd4c7b7&units="+unit;
  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData= JSON.parse(data);
      const temp= weatherData.main.temp;
      const desc= weatherData.weather[0].description;
      const icon= weatherData.weather[0].icon;
      const iconURL= "http://openweathermap.org/img/wn/"+ icon + "@2x.png";

      res.write("<h1>The weather conditions in "+ query+ " are: </h1>");
      res.write("<h3>Temperature = "+ temp+ " degree celsius.</h3>");
      res.write("<h3>It is currently "+ desc+ "</h3>");
      res.write("<img src="+ iconURL +">");
      res.send();
    });
  });
});

app.listen(3000);
