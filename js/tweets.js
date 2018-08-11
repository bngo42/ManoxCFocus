let group = document.querySelector(".tweet-feed");
let datas = [];
let obj = {
  "created_at": "Fri Apr 01 20:20:07 +0000 2016",
  "id": 715997192373288962,
  "id_str": "715997192373288962",
  "text": "It's Friday!! \ud83d\udc79 #AprilFools - funny pranks https:\/\/t.co\/b9ZdzRxzFK",
  "source": "\u003ca href=\"http:\/\/twitter.com\" rel=\"nofollow\"\u003eTwitter Web Client\u003c\/a\u003e",
  "user": {
    "id": 3001969357,
    "id_str": "3001969357",
    "name": "Jordan Brinks",
    "screen_name": "furiouscamper",
    "location": "Birmingham",
    "url": "http:\/\/indigofiddle.com",
    "description": "Alter Ego - Twitter PE",
    "derived": {
      "locations": [ ]
    },
    "favourites_count": 14,
    "created_at": "Thu Jan 29 18:27:49 +0000 2015",
    "profile_background_color": "000000",
    "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
    "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
    "profile_background_tile": false,
    "profile_link_color": "FF691F",
    "profile_sidebar_border_color": "000000",
    "profile_sidebar_fill_color": "000000",
    "profile_text_color": "000000",
    "profile_use_background_image": false,
    "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/601155672395227136\/qakfE9EU_normal.jpg",
    "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/601155672395227136\/qakfE9EU_normal.jpg",
    "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/3001969357\/1432161817",
    "default_profile": false,
    "default_profile_image": false
  },
  "place": { },
  "is_quote_status": false,
  "retweet_count": 0,
  "favorite_count": 0,
  "entities": {
    "hashtags": [
      {
        "text": "AprilFools",
        "indices": [
          16,
          27
        ]
      }
    ],
    "urls": [
      {
        "url": "https:\/\/t.co\/b9ZdzRxzFK",
        "expanded_url": "http:\/\/www.today.com\/parents\/joke-s-you-kid-11-family-friendly-april-fools-pranks-t83276",
        "display_url": "today.com\/parents\/joke-s\u2026",
        "unwound": {
          "url": "http:\/\/www.today.com\/parents\/joke-s-you-kid-11-family-friendly-april-fools-pranks-t83276",
          "status": 200,
          "title": "The joke's on you, kid: 11 family-friendly April Fools pranks",
          "description": "If your kids are practical jokers, turn this April Fools' Day into a family affair."
        },
        "indices": [
          43,
          66
        ]
      }
    ],
    "user_mentions": [ ],
    "symbols": [ ]
  },
  "favorited": false,
  "retweeted": false,
  "possibly_sensitive": false,
  "filter_level": "low",
  "lang": "en",
  "timestamp_ms": "1459542007903",
  "matching_rules": [ ]
}


setInterval(() => {
  request('GET', 'https://jsonplaceholder.typicode.com/posts', null)
    .then(res => {
      let data = JSON.parse(res);

      console.log(data);
    })
    .catch(console.error);
}, 2000);




function removeDuplicate(array){
  return [...new Set(array)];
}


function request(method, url, params = {}){
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText);
      }
    };
    xhr.onerror = () => {
      reject();
    }
    xhr.send(params);
  });
}

function createBox(tweet){
  console.log(tweet);
  let box = document.createElement('div');
  let img = document.createElement('img');
  let content = document.createElement('div');
  let username = document.createElement('span');
  let text = document.createElement('p');

  box.classList.add('tweet-box');
  box.style.display = "inline-flex";
  box.style.borderRadius = "5px";
  box.style.padding = "0.5%";
  box.style.backgroundColor = "rgba(255,255,255,0.2)";

  img.classList.add('ui','avatar', 'image');
  img.src = 'img/child_focus.png';

  username.innerHTML = "@" + tweet.user.screen_name;

  text.innerHTML = tweet.text;

  content.appendChild(username);
  content.appendChild(text);

  box.appendChild(img);
  box.appendChild(content);

  return box;
}