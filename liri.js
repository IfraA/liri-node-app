var env = require("dotenv").config();
var keys = require("./keys.js");
var socialMedia = process.argv[2];

if (socialMedia === "twitter") {
  getTweets();
}
if (socialMedia === "spotify") {
  var song = process.argv[3];
  console.log(song);
}
function getTweets() {
  var Twitter = require("twitter");
  var twitterHandle = process.argv[3];
  var tweetsLimit = 10;

  var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret,
  });

  var params = { screen_name: twitterHandle };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      // if user has less than 10 tweets it will set their amount of tweets as the limit
      if (tweets.length < tweetsLimit) {
        tweetsLimit = tweets.length;
      }
      // looping through users tweets until limit is satisfied
      for (var i = 0; i < tweetsLimit; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
        console.log();
      }
    } else {
      console.log(error);
    }
  });
}
