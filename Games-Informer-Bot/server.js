'use strict';
const express = require('express');
const bodyparser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
const config = require('./config');
const fbeamer = require('./fbeamer');
const f = new fbeamer(config.FB);
const extractEntity = require('./extract');

const server = express();
const PORT = process.env.PORT||3000;
server.use(bodyparser.json()); // for parsing application/json
server.use(bodyparser.urlencoded({ extended: true })); // for parsing application/x-w

//req : object coming from Facebook
//res : response sending from the chatbot to facebook
server.get('/',(req, res) => f.registerHook(req,res));

server.post('/', bodyparser.json({
  verify: f.verifySignature.call(f)
  }));

server.post('/',(req, res, next) =>{
  return f.incoming(req, res, async data =>{
    
    try {
      
      if(data.type=='text'){
        //console.log("Text: ",data);
        //console.log("Intents", data.message.nlp.intents)
        //console.log("Entities", data.message.nlp.entities)
        let nlpdata = null;
        switch(data.message.nlp.intents[0].name){
          case "greetings":
            await f.txt(data.sender, "Hi ! I'm the Games Informer Bot ! Your source of information on video games ! 😎 \nForgot the developer/publisher or the release date of a specific game ?\nWant to know where you can play or buy a game ?\nOr maybe you want to see little more about a game with a trailer?\nOr You want to experience a game's beautiful soundtack ?\nI'm here for you ! 😉");
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}`);
            break;
          case "gameinfo":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.img(data.sender, nlpdata.image);
            await f.txt(data.sender, nlpdata.txt);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "platforms":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "releasedate":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "stores":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "developer":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "publisher":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "genres":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "recommendedgames":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.img(data.sender, nlpdata.image1);
            await f.txt(data.sender, nlpdata.txt1);
            await f.img(data.sender, nlpdata.image2);
            await f.txt(data.sender, nlpdata.txt2);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "trailer":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.txt(data.sender, nlpdata.url);
            await f.img(data.sender, nlpdata.thumbnail);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "ost":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.txt(data.sender, nlpdata.url);
            await f.img(data.sender, nlpdata.thumbnail);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "games":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.img(data.sender, nlpdata.img1);
            await f.txt(data.sender, nlpdata.txt1);
            await f.img(data.sender, nlpdata.img2);
            await f.txt(data.sender, nlpdata.txt2);
            await f.img(data.sender, nlpdata.img3);
            await f.txt(data.sender, nlpdata.txt3);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "upcominggames":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.img(data.sender, nlpdata.img1);
            await f.txt(data.sender, nlpdata.txt1);
            await f.img(data.sender, nlpdata.img2);
            await f.txt(data.sender, nlpdata.txt2);
            await f.img(data.sender, nlpdata.img3);
            await f.txt(data.sender, nlpdata.txt3);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "highestratedgames":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.img(data.sender, nlpdata.img1);
            await f.txt(data.sender, nlpdata.txt1);
            await f.img(data.sender, nlpdata.img2);
            await f.txt(data.sender, nlpdata.txt2);
            await f.img(data.sender, nlpdata.img3);
            await f.txt(data.sender, nlpdata.txt3);
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;
          case "populargames":
            nlpdata = await extractEntity.nlpData(data.message.nlp);
            await f.txt(data.sender, nlpdata.txt);
            await f.img(data.sender, nlpdata.img1);
            await f.txt(data.sender, nlpdata.txt1);
            await f.img(data.sender, nlpdata.img2);
            await f.txt(data.sender, nlpdata.txt2);
            await f.img(data.sender, nlpdata.img3);
            await f.txt(data.sender, nlpdata.txt3); 
            await f.txt(data.sender,`intent : ${data.message.nlp.intents[0].name}, entities : ${getEntities(data.message.nlp.entities)}`);
            break;

          
          default:
            break;
        }
      }
      else if(data.type=='image'){
        await f.txt(data.sender, "Nice pic ! :)");
      }

    }
    catch(e){
      f.txt(data.sender, "Sorry, I didn't understand :(");
      console.log(e);
    }
  });
});

const getEntities = (entities) =>{
  let e = "";
  if(typeof entities['game:game']!== 'undefined'){e += `game:${entities['game:game'][0].value}, `};
  if(typeof entities['genre:genre']!== 'undefined'){e += `genre:${entities['genre:genre'][0].value}, `};
  if(typeof entities['developer:developer']!== 'undefined'){e += `developer:${entities['developer:developer'][0].value}, `};
  if(typeof entities['publisher:publisher']!== 'undefined'){e += `publisher:${entities['publisher:publisher'][0].value}, `};
  if(typeof entities['releaseyear:releaseyear']!== 'undefined'){e += `releaseyear:${entities['releaseyear:releaseyear'][0].value}, `};
  if(typeof entities['platform:platform']!== 'undefined'){e += `platform:${entities['platform:platform'][0].value}, `};
  //e += entities['game:game'][0].name
  //entities.forEach(function(ent){
  //    e += ent.name + ",";
  //  
  //})
  return e;
}

server.listen(PORT,() => console.log(`The bot server is running on port ${PORT}`));