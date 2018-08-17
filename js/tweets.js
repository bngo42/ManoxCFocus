let group = document.querySelector(".tweet-feed");
let datas = [];
let tweetarr = [];
let index = 0;

let currentId = 0;
setInterval(() => {
  request('GET', 'https://manocf-server.herokuapp.com/hashtag', { currentId, tag : 'arethafranklin' })
    .then(res => {
      let data = JSON.parse(res);
      let tweets = data.statuses;

      tweets.forEach(tweet => {
        if (!tweet.retweeted_status){
          let exists = false;
          datas.forEach(t => {
            if (t.id == tweet.id){
              exists = true;
            }
          })
          if (!exists){
            datas.push(tweet);
          }
        }
      });
    })
    .catch(console.error);

    if (group.childElementCount >= 5 && group.children[0]){
      group.removeChild(group.children[0]);
    }
    datas.shift();
    group.appendChild(createBox(datas[0]));
    if (datas[0]){
      currentId = datas[0].id;
    }


}, 2500);

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
  let item = document.createElement('div'),
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
  item.appendChild(imageDiv);
  item.appendChild(content);

  imageDiv.classList.add('ui', 'tiny', 'image');
  imageDiv.appendChild(img);
  img.src = (tweet.user.profile_image_url ? tweet.user.profile_image_url : 'img/child_focus.png');

  content.classList.add('content');
  content.appendChild(header);
  content.appendChild(textDiv);

  header.classList.add('header');
  header.innerHTML = "@" + (tweet.user.screen_name ? tweet.user.screen_name :  null);

  textDiv.classList.add('description');
  textDiv.appendChild(text);

  text.innerHTML = tweet.full_text;
  return item;
}