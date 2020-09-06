// var request = require("request");
const Axios = require('axios')

var options = {
  method: 'PATCH',
  url: 'https://life-economics.eu.auth0.com/api/v2/clients/7ctSHfArYYhX87Ikh8m5KbV7USeEIZco',
  headers: {
    'content-type': 'application/json',
    authorization: 'Bearer JBUTyLpWJH_wUobxw8z0eOuswlaVTQI0Kfv5ge91oeqU5PAKP7cb71os1Vgw8mKL',
    'cache-control': 'no-cache'
  },
  data: {initiate_login_uri: 'http://localhost:3100/'},
  json: true
};
async function login(req,res) {
    
    try {
     var result = await Axios(options)
     console.log(result);
     res.send(result)
        
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}
module.exports={
    login
}

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });