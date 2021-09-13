const request = require('request');
//Url for the video game database api
const base = 'https://api.rawg.io/api/';
const key = "22adaa62ba514e16abe7ccb667b77ac3";
//URL for the youtube api (for trailers and OSTs)
const yt_base ="https://www.googleapis.com/youtube/v3/";
const yt_key ="AIzaSyDQ0S69sc56NxqKqHEE_DMWrstq-YcwqKk";

//Get recommended games via Collaborative Filtering Recommender System in Python (see the other replit) 
var getRecommendedGames=(game)=>
    new Promise((resolve, reject) => {
			// Create an HTTP POST request
			request({
				uri: 'https://recommendersystGamesInformerBot.nicolasthg.repl.co/recommend',
				qs: {
					game_name: game
				},
				method: 'GET',

			}, (error, response, body) => {
				if (!error && response.statusCode === 200) {
          data=JSON.parse(body);
          console.log(data)
          if(data.games==null){
            resolve(null);
          } else {
            resolve(JSON.parse(data.games));
          }
				} else {
					reject(error);
				}
			});
		});


//receive nlp data and an entity name
//return the value of the selected entity
const extractEntity = (nlp , entity) =>{
  var entities = nlp.entities
  //console.log("entities",entities)


  if(entity == "game" && entities["game:game"][0].confidence >= 0.8) {
    return entities["game:game"][0].value;
  } else if(entity == "developer" && typeof entities["developer:developer"]!== 'undefined') {
    return entities["developer:developer"][0].value;
  } else if(entity == "platform" && typeof entities["platform:platform"]!== 'undefined') {
    return entities["platform:platform"][0].value;
  }  else if(entity == "publisher" && typeof entities["publisher:publisher"]!== 'undefined') {
    return entities["publisher:publisher"][0].value;
  }  else if(entity == "releaseyear" && typeof entities["releaseyear:releaseyear"]!== 'undefined') {
    return entities["releaseyear:releaseyear"][0].value;
  }  else if(entity == "genre" && typeof entities["genre:genre"]!== 'undefined') {
    return entities["genre:genre"][0].value;
  }
  else{
    return null;
  }
}

const extractIntent = (nlp) =>{
  var intent =  nlp.intents;
  //console.log("intents",intent);
  return intent;
}


//Return a simplify json a game searched by name
const getGameBySearch = (game,releaseyear=null,platform=null) => {
  //Properties to change the url
  var url = base + "games?";
  var propertiesObject = { key:key, search:game};
  if(releaseyear){propertiesObject["dates"]=`${releaseyear}-01-01,${releaseyear}-12-31`};
  if(platform){propertiesObject["platforms"]=platform};
  return new Promise((resolve,reject) => {
      request({url:url,qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        try{  
          let json = JSON.parse(body);
          json = json.results[0];
          resolve(json);
        } catch(error) {
          reject(error);
        }
    });  
  });
}

//get details of the game obtained with the id
const getGameDetails = (gameid) => {
  //Properties to change the url
  var url = base + `games/${gameid}?`;
  var propertiesObject = {key:key};
  return new Promise((resolve,reject) => {
      request({url:url,qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        try{  
          let json = JSON.parse(body);
          resolve(json);
        } catch(error) {
          reject(error);
        }
    });  
  });
}

//Return games according to parameters
const getGames = (mode,releaseyear=null,platform=null,genre=null,developer=null,publisher=null ) => {
  //Properties to change the url
  var url = base + `games?`;
  var propertiesObject = {key:key};
  if(releaseyear){propertiesObject["dates"]=`${releaseyear}-01-01,${releaseyear}-12-31`};
  if(platform){propertiesObject["platforms"]=platform};
  if(genre){propertiesObject["genres"]=genre};
  if(developer){propertiesObject["developers"]=developer};
  if(publisher){propertiesObject["publishers"]=publisher};
  if(mode=="highestrated"){
    propertiesObject["ordering"]="-metacritic";
  } else if(mode=="popular"){
    propertiesObject["ordering"]="-added";
  } else if(mode=="upcoming"){
    propertiesObject["dates"]=`2021-04-05,2022-12-31`
    propertiesObject["ordering"]="-added";
  } else {
  }
  var url = base + "games?";
  return new Promise((resolve,reject) => {
      request({url:url,qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        try{  
          let json = JSON.parse(body);
          resolve(json.results);
        } catch(error) {
          reject(error);
        }
    });  
  });
}

//Get stores for a game
const getGameStores = (gameid) => {
  var url = base + `games/${gameid}/stores?`;
  var propertiesObject = {key:key};
  return new Promise((resolve,reject) => {
      request({url:url,qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        try{  
          let json = JSON.parse(body);
          resolve(json);
        } catch(error) {
          reject(error);
        }
    });  
  });
}

//Get a Trailer for a game
const getTrailer = (game) => {
  var url = yt_base + `search?`;
  var propertiesObject = {
    part:"snippet",
    q:`trailer ${game}`,
    key:yt_key,
    type:"video"
  };
  return new Promise((resolve,reject) => {
      request({url:url,qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        try{  
          let json = JSON.parse(body);
          resolve(json.items[0]);
        } catch(error) {
          reject(error);
        }
    });  
  });
}
//Get the OST for a game
const getOST = (game) => {
  var url = yt_base + `search?`;
  var propertiesObject = {
    part:"snippet",
    q:`soundtrack ${game}`,
    key:yt_key,
    type:"playlist"
  };
  return new Promise((resolve,reject) => {
      request({url:url,qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        try{  
          let json = JSON.parse(body);
          resolve(json.items[0]);
        } catch(error) {
          reject(error);
        }
    });  
  });
}

//Get developer Id searched by name
const getDeveloperIdBySearch = (dev) => {
  //Properties to change the url
  var url = base + "developers?";
  var propertiesObject = { key:key, search:dev};
  return new Promise((resolve,reject) => {
      request({url:url,qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        try{  
          let json = JSON.parse(body);
          let dev_id = json.results[0].id;
          resolve(dev_id);
        } catch(error) {
          reject(error);
        }
    });  
  });
}
//Get publisher Id searched by name
const getPublisherIdBySearch = (pub) => {
  //Properties to change the url
  var url = base + "publishers?";
  var propertiesObject = { key:key, search:dev};
  return new Promise((resolve,reject) => {
      request({url:url,qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        try{  
          let json = JSON.parse(body);
          let pub_id = json.results[0].id;
          resolve(pub_id);
        } catch(error) {
          reject(error);
        }
    });  
  });
}
//Get platform id
const getPlatformId = (platform) => {
  //Properties to change the url
  var url = base + "platforms?";
  var propertiesObject = { key:key};
  return new Promise((resolve,reject) => {
      request({url:url,qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        try{  
          let json = JSON.parse(body);
          let platforms = json.results;
          let i =0;
          let platform_id = null;
          //Can't search by name so i iterate until i find the platform
          while(platform_id == null){
            if(platforms[i].name.toLowerCase()==platform){
              platform_id = platforms[i].id;
            }
            i = i +1;
          }
          resolve(platform_id);
        } catch(error) {
          reject(error);
        }
    });  
  });
}

//Method to convert an array to a string

//parameter = array
const platformsToString =(platforms) =>{
  let str="";
  platforms.forEach(plt=>str += " "+plt.platform.name+",");
  str = str.substring(0, str.length - 1);
  return str;
}

//parameter = array
const developersToString =(developers) =>{
  let str="";
  developers.forEach(dev=>str += " "+dev.name+",");
  str = str.substring(0, str.length - 1);
  return str;
}

//parameter = array
const publishersToString =(publishers) =>{
  let str="";
  publishers.forEach(pub=>str += " "+pub.name+",");
  str = str.substring(0, str.length - 1);
  return str;
}

//parameter = array
const genresToString =(genres) =>{
  let str="";
  genres.forEach(g=>str += " "+g.name+",");
  str = str.substring(0, str.length - 1);
  return str;
}

const storesToString = (stores,urls) =>{
  let str="";
  stores.forEach(function(s){
    str += `▪️ ${s.store.name} : ${getUrlStore(urls,s.store.id)}\n`;
  })
  return str;
}


const getUrlStore = (urls,storeid) =>{
  let u = null;
  urls.forEach(function(url){
    if(url.store_id == storeid){
      u = url.url;
    }
  })
  return u;
}

module.exports.nlpData = nlpData => {
  return new Promise(async function(resolve, reject) {
    let intent = extractIntent(nlpData);
    if(intent) {
      // Get data (including id) about the game
      try {
        var intents =['games','highestratedgames','populargames','upcominggames'];
        console.log("Intent",intent[0].name);
      //different entities for different intents
        if(intents.includes(intent[0].name)){
          let developer = extractEntity(nlpData ,'developer');
          if(developer){var developer_id = await getDeveloperIdBySearch(developer)};
          let publisher = extractEntity(nlpData ,'publisher');
          if(publisher){var publisher_id = await getDeveloperIdBySearch(publisher)};
          let platform = extractEntity(nlpData ,'platform');
          if(platform){var platform_id = await getPlatformId(platform)};
          var releaseyear = extractEntity(nlpData ,'releaseyear');
          var genre = extractEntity(nlpData ,'genre');
        } else{
          var game = extractEntity(nlpData ,'game');
          let game_releaseyear = extractEntity(nlpData ,'releaseyear');
          let game_platform = extractEntity(nlpData ,'platform');
          if(game_platform){var game_platform_id = await getPlatformId(game_platform)};
          console.log(game,game_releaseyear,game_platform);
          var gameData = await getGameBySearch(game,game_releaseyear,game_platform_id);
        }
        
        switch(intent[0].name){
          case "gameinfo":
            console.log(gameData.id);
            let gameDetails = await getGameDetails(gameData.id);
            //console.log(gameDetails);
            resolve({
              id :gameDetails.id,
              name :gameDetails.name,
              image : gameDetails.background_image,
              txt : `🔴   ${gameDetails.name}   \n📆 Release Date : ${gameDetails.released} \n✏️ Metacritic : ${gameDetails.metacritic} \n🎮 Platforms :${platformsToString(gameDetails.platforms)}\n💻 Developers : ${developersToString(gameDetails.developers)}\n💾 Publishers : ${publishersToString(gameDetails.publishers)}\n🕹 Genres :${genresToString(gameDetails.genres)}`
            });
            break;
          case "releasedate":
            let today_date = new Date();
            let str = gameData.released;
            let release_date = new Date(str.substring(0,4),str.substring(5,7),str.substring(8,10));
            if(today_date<release_date){
              resolve({
                id :gameData.id,
                name :gameData.name,
                txt : `📆 ${gameData.name} will be released on ${gameData.released}.`
            });
            } else {
              resolve({
                id :gameData.id,
                name :gameData.name,
                txt : `📆 ${gameData.name} was released on ${gameData.released}.`
              });
            }
            break;
          case "publisher":
            let gameDetails_pub = await getGameDetails(gameData.id);
            resolve({
                id :gameDetails_pub.id,
                name :gameDetails_pub.name,
                txt : `💾 ${gameDetails_pub.name} was published by${publishersToString(gameDetails_pub.publishers)}.`
              });
            break;
          case "developer":
            let gameDetails_dev = await getGameDetails(gameData.id);
            resolve({
                id :gameDetails_dev.id,
                name :gameDetails_dev.name,
                txt : `💻 ${gameDetails_dev.name} was developped by${developersToString(gameDetails_dev.developers)}.`
              });
            break;
          case "stores":
            console.log(gameData.id);
            let gameStores= await getGameStores(gameData.id);
            resolve({
                id :gameData.id,
                name :gameData.name,
                txt : `🛒 You can buy ${gameData.name} on :\n${storesToString(gameData.stores,gameStores.results)}`
              });
            break;
          case "platforms":
            console.log(gameData.id);
            resolve({
                id :gameData.id,
                name :gameData.name,
                txt : `🎮 You can play ${gameData.name} on${platformsToString(gameData.platforms)}.`
              });
            break;
          case "genres":
            console.log(gameData.id);
            resolve({
                id :gameData.id,
                name :gameData.name,
                txt : `🕹 ${gameData.name} is a${genresToString(gameData.genres)} game.`
              });
            break;
          case "recommendedgames":
            let recommendedgames =await getRecommendedGames(gameData.name);
            console.log(recommendedgames)
            if(recommendedgames==null){
              resolve({
                id :gameData.id,
                name :gameData.name,
                txt : `Sorry! ${gameData.name} have not enough ratings.`
              });
            } else{
              let i=0;
              //Recommand 2 games liked by users
              let game1 =recommendedgames.data[i][0];
              if(gameData.name == game1){
                i=i+1;
                game1 =recommendedgames.data[i][0];
              }
              i = i+1;
              let game2 =recommendedgames.data[i][0];
              if(gameData.name == game2){
                i=i+1;
                game2 =recommendedgames.data[i][0];
              }
              //Get details and images from these recommended games
              let gameData1 = await getGameBySearch(game1);
              let gameDetails1 = await getGameDetails(gameData1.id);
              let gameData2 = await getGameBySearch(game2);
              let gameDetails2 = await getGameDetails(gameData2.id);
              resolve({
                id :gameData.id,
                name :gameData.name,
                txt : `People who liked ${gameData.name}, also like :`,
                txt1 : `🔴  ${gameDetails1.name}`,
                image1 : gameDetails1.background_image,
                txt2 : `🔴  ${gameDetails2.name}`,
                image2 : gameDetails2.background_image,
              });
            }
            break;
          case "trailer":
            let trailer = await getTrailer(gameData.name);
            resolve({
                id :gameData.id,
                name :gameData.name,
                url:`https://youtu.be/${trailer.id.videoId}`,
                thumbnail:trailer.snippet.thumbnails.medium.url,
                txt : `🎬 Trailer of ${gameData.name} :`,
                title:trailer.snippet.title,
            });
            break;
          case "ost":
            let ost = await getOST(gameData.name);
            resolve({
                id :gameData.id,
                name :gameData.name,
                url:`https://youtu.be/playlist?list=${ost.id.playlistId}`,
                thumbnail:ost.snippet.thumbnails.medium.url,
                txt : `🎧 Soundtrack of ${gameData.name} :`,
                title:ost.snippet.title,
            });
            break;
          case "games":
            let list_games = await getGames("list",releaseyear,platform_id,genre,developer_id,publisher_id);
            let g1 = list_games[0];
            let g2 = list_games[1];
            let g3 = list_games[2];
            resolve({
                txt : `Here are some games :`,
                txt1 :`🔴 ${g1.name} (${g1.released})`,
                img1 : g1.background_image,
                txt2 :`🔴 ${g2.name} (${g2.released})`,
                img2 : g2.background_image,
                txt3 :`🔴 ${g3.name} (${g3.released})`,
                img3 : g3.background_image,
              }); 
            break;
          case "upcominggames":
            let upcominggames = await getGames("upcoming",null,platform_id,genre,developer_id,publisher_id); 
            let up_g1 = upcominggames[0];
            let up_g2 = upcominggames[1];
            let up_g3 = upcominggames[2];
            resolve({
                txt : `Here are some upcoming games :`,
                txt1 :`📅 ${up_g1.name} (${up_g1.released})`,
                img1 : up_g1.background_image,
                txt2 :`📅 ${up_g2.name} (${up_g2.released})`,
                img2 : up_g2.background_image,
                txt3 :`📅 ${up_g3.name} (${up_g3.released})`,
                img3 : up_g3.background_image,
              });  
            break;
          case "highestratedgames":
            let highestratedgames = await getGames("highestrated",releaseyear,platform_id,genre,developer_id,publisher_id);
            let hr_g1 = highestratedgames[0];
            let hr_g2 = highestratedgames[1];
            let hr_g3 = highestratedgames[2];
            resolve({
                txt : `Here are the highest rated games :`,
                txt1 :`🥇 ${hr_g1.name} (${hr_g1.released})`,
                img1 : hr_g1.background_image,
                txt2 :`🥈 ${hr_g2.name} (${hr_g2.released})`,
                img2 : hr_g2.background_image,
                txt3 :`🥉 ${hr_g3.name} (${hr_g3.released})`,
                img3 : hr_g3.background_image,
              });  
            break;
          case "populargames":
            let populargames = await getGames("popular",releaseyear,platform_id,genre,developer_id,publisher_id);
            let p_g1 = populargames[0];
            let p_g2 = populargames[1];
            let p_g3 = populargames[2];
            resolve({
                txt : `Here are some popular games :`,
                txt1 :`🎖 ${p_g1.name} (${p_g1.released})`,
                img1 : p_g1.background_image,
                txt2 :`🎖 ${p_g2.name} (${p_g2.released})`,
                img2 : p_g2.background_image,
                txt3 :`🎖 ${p_g3.name} (${p_g3.released})`,
                img3 : p_g3.background_image,
              });  
            break;
          default:
            console.log('default');
            break;
        }
      } catch(error) {
        reject(error);
      }
    } else {
      resolve({
        txt : "I'm sorry I didn't understand you!",
      });
    }
  });
}