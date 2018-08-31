let counter = document.querySelector('.donation-count');
let current = 0;
setInterval(() => {

    request('GET', 'https://tweets-server.herokuapp.com/donations')
        .then(res => {
            let data = JSON.parse(res);
            counter.innerHTML = data.current + " €";
            if (data.current != current){
                $('.donation-count').transition('jiggle');
                current = data.current;
            }
        })
        .catch(console.error);
}, 5000);



function request(method, url, params = {}){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url + serialize(params), true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200){
                resolve(xhr.responseText);
            }
        };
        xhr.onerror = () => {
            reject();
        };
        xhr.send()
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