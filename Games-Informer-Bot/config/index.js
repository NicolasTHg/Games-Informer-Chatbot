'use strict';
//For security, for accessing the tokens from the dev.json file

if(process.env.NODE_ENV === 'production') {
  module.exports = {
    FB: {
      pageAccessToken : process.env.pageAccessToken ,
      VerifyToken : process.env.VerifyToken,
      appSecret : process.env.appSecret
    },
    RAWG : process.env.RAWG
    //api key of the RAWG video games database
  }
} else {
  module.exports = require('./development.json');
}