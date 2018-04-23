var axios = require('axios');
var articleQuery = function(topic, beginYear, endYear){

  var authKey = "01160434757a4bfc9274da360c67075d";

  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" +
                  topic + "&begin_date=" + beginYear + "0101" + "&end_date=" + endYear + "1231";

  return new Promise(function (fulfill, reject){
    axios.get(queryURL).then(function(response) {
      var result = [];
      if (response.data.response.docs[0]) {
        for(var i=0; i<response.data.response.docs.length; i++){
            if(i==5){
            break;
          }
          else {
            result.push(response.data.response.docs[i]);
          }
        }
        fulfill(result);
      }
      else{
        reject("");
      }
      
    });
  });

}

var apiSave = function(articleObj){
  var apiURL = window.location.origin + '/api/saved';
  return new Promise(function (fulfill, reject){
    var params = new URLSearchParams();
    params.append("title", articleObj.title);
    params.append("date", articleObj.date);
    params.append("url", articleObj.url);
    axios.post(apiURL, params).then(function(response){
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
      
    })

  });
  
}
var apiGet = function(){
  var apiURL = window.location.origin + '/api/saved';
  return new Promise(function (fulfill, reject){
    axios.get(apiURL).then(function(response) {
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });
    
  });
  
}

var apiDelete = function(deleteArticleId){
  var apiURL = window.location.origin + '/api/delete/' + deleteArticleId;
  return new Promise(function (fulfill, reject){
    axios.post(apiURL).then(function(response) {
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });

  });

}

module.exports = {
 articleQuery,
 apiSave,
 apiGet,
 apiDelete
}