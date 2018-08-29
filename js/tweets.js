let group = document.querySelector(".tweet-feed");
let datas = [];
let currentId = 0;

setInterval(update, 1000);
setInterval(UpdateBlock, 2500);

function update() {
  if (datas.length == 0) {
    retrieveTweets();
  }
}

function retrieveTweets(){
  request('GET', 'https://tweets-server.herokuapp.com/tweets')
      .then(res => {
        let tweets = JSON.parse(res);

        tweets.forEach(tweet => {
          if (tweet){
            datas.push(tweet);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
}

function UpdateBlock(){
  if (group.childElementCount >= 5 && group.children[0]){
    group.removeChild(group.children[0]);
  }
  
  if (datas[0]){
    currentId = datas[0].id;
    let box = createBox(datas[0]);
    if (box){
      group.appendChild(box);
    }
    datas.shift();
  }
  
  if (group.childElementCount > 0 && document.querySelector('.tweet-loader')){
    document.querySelector('.tweet-loader').remove();
    document.querySelector('.tweetarrow').classList.remove('hidden');
  }
}

function request(method, url, params = {}){
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open(method, url + '?' + serialize(params), true);

    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText);
      }
    };
    xhr.onerror = () => {
      reject();
    }
    xhr.send();
  });
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function createBox(tweet){
  let item = document.createElement('a'),
  imageDiv = document.createElement('div'),
  img = document.createElement('img'),
  content = document.createElement('div'),
  header = document.createElement('h2'),
  textDiv = document.createElement('div'),
  text = document.createElement('p');

  item.classList.add('item');
  item.style.backgroundColor = "#ffffff40";
  item.style.borderRadius = "4px";
  item.style.padding = "2%";
  item.href = "https://twitter.com/statuses/" + tweet.status_id;
  item.target = "_blank";
  item.alt = "Tweet de " + tweet.username;
  item.appendChild(imageDiv);
  item.appendChild(content);

  imageDiv.classList.add('ui', 'tiny', 'image');
  imageDiv.appendChild(img);
  img.src = tweet.avatar;

  content.classList.add('content');
  content.appendChild(header);
  content.appendChild(textDiv);

  header.classList.add('header');
  header.innerHTML = "@" + tweet.username;

  textDiv.classList.add('description');
  textDiv.appendChild(text);

  text.innerHTML = tweet.text;
  return item;
}