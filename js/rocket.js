let history = [];
let order = [38,38,40,40,37,39,37,39,66,65,13];

document.addEventListener('keydown', e => {
  history.push(e.keyCode);
  if (history.length > order.length){
    history.shift();
  }
  if (JSON.stringify(history) == JSON.stringify(order)){
    let spawner = document.querySelector('#space-launcher');
    let rockets = [];
    if (spawner.childElementCount == 0){
        for (let i = 0; i < 10; i++){
            let rocket = createRocket(getRandomInt(8, 10));
            spawner.appendChild(rocket);
            rockets.push(rocket);
        }
        let starter = setInterval(() => {
            rockets.forEach(ship => {
                ship.style.left = (parseFloat(ship.style.left) + (1 / ship.dataset.factor)) + "%";
                if (parseFloat(ship.style.left) >= 100){
                    ship.remove();
                }
            });
            if (spawner.childElementCount == 0){
                clearInterval(starter);
            }
        } ,10);
    }
  }
});

function emptyArray(arr = []){
    for (let i = 0; i < arr.length; i++){
        if (arr[i]){
            arr[i].remove();
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function createRocket(factor) {
    let rocket = document.createElement('img');
    rocket.style.animationDelay = getRandomInt(0,2);
    rocket.classList.add('wave');
    rocket.src = "img/manorocket.gif";
    rocket.style.position = "absolute";
    rocket.style.top = (window.scrollY + getRandomInt(0, window.innerHeight)) + "px";
    rocket.style.left = "0px";
    rocket.dataset.factor = factor;
    setTimeout(() => { rocket.remove(); }, ((factor * 1.2) * 1000));

    return rocket;
}