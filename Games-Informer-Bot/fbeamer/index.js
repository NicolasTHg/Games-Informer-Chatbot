'use strict'

const crypto = require('crypto');
const request = require('request');
const apiVersion = 'v6.0';
//To define the webhook as a reusable model
class FBeamer {

  constructor ({pageAccessToken, VerifyToken}){
    try{  //Verify if the 2 parameters are given or not
        this.pageAccessToken = pageAccessToken;
        this.verifyToken = VerifyToken;
      }
      catch (error){
        console.error(error);
      }
  }

  registerHook(req, res) {
    const params = req.query;
    const mode = params['hub.mode'],
    token = params['hub.verify_token'],
    challenge = params['hub.challenge'];
    // if mode === 'subscribe ' and token === verify token , then send back challenge
    try {
      if(mode === 'subscribe' && token === this.verifyToken) {
          console.log("The Webhook is registered !");
          return res.send(challenge);
        } else {
          console.log("Could not register webhook !");
          return res.sendStatus(200) ;
        }
      } catch(e) {
        console.log(e);
      }
  }

  verifySignature(req , res , buf) {
    return (req, res, buf) => {
      if(req.method === 'POST '){
        try {
          // get x-hub - signature here
          /* this code generates a hash using the given appSecret */
          let tempo_hash = crypto.createHmac('sha1', this.appSecret).update(buf, 'utf -8');
          let hash = hash.digest('hex');
          // complete the rest of code by yourself
          let hash_req = req.headers['x-hub-signature'];
          hash_req = hash_req.substring(5);
          if (hash == hash_req) {
            console.log("Hash code verification is OK !");
          } else {
            throw "Hash code verification go throw error !"
          } 
        } catch(e) {
          console.log(e);
        }
      }
    }
  }

//parses the structure and fetches the message
  incoming(req,res,cb) {
    res.sendStatus(200);
    // Extract the body of the POST request
    if(req.body.object === 'page' && req.body.entry) {
      let data = req.body;
      //console.log(data)
      // for on page objects
      data.entry.forEach(pageObj => {
        // for on messageObjs if messaging of each page exists
        if(pageObj.messaging){
          pageObj.messaging.forEach(messageObj => {
            console.log(messageObj);
        
            if(messageObj.postback){
              // handle postbacks
            }
            else {
              // handle messages
                let mess = this.messageHandler(messageObj);
                return cb(mess);
            }
          })
        }
      })
    }
  }

  messageHandler(obj){
    let sender = obj.sender.id;
    let message = obj.message;
    if(message.text){
      let obj = {
        sender : sender,
        type :'text',
        content :message.text,
        message : message
      }
      return obj;
    } else if (message.attachments){
      console.log("Image to handle !");
      console.log(message.attachments);
      let obj = {
        sender : sender,
        type :'image',
        //content :message.attachment,
        message : message
      }
      console.log("Obj :", obj);
      return obj;
    }
  }


  sendMessage(payload){
    return new Promise((resolve, reject ) => {
    request ({
      uri: `https://graph.facebook.com/${apiVersion}/me/messages`,
      qs:{
        access_token : this.pageAccessToken
      },
      method: 'POST',
      json: payload
      }, (error, response, body ) => {
        if (!error && response.statusCode === 200) {
          resolve({
            mid: body.message_id
          });
        } else {
          reject(error);
        }
      });
    });
  }

//for sending the text messages to the facebook
  txt(id, text, messaging_type = 'RESPONSE'){
    /* this is an object for creating the payload according to Table 1 in the following .*/
    let obj = {
      messaging_type,
      recipient:{
        id : id
      },
      message: {
        text : text
      }
    }
    console.log("send txt:",obj);
    return this.sendMessage(obj);
  }

//for sending an image message to the FBM
  img(id, image_url, messaging_type = 'RESPONSE'){
    /* this is an object for creating the payload according to Table 1 in the following .*/
    let obj = {
      messaging_type,
      recipient:{
        id : id
      },
      message: {
        attachment: {
          type : "image",
          payload: {
            url: image_url
          }
        }
      }
    }
    console.log("send image:",obj);
    return this.sendMessage(obj);
  }

}

module.exports = FBeamer;
