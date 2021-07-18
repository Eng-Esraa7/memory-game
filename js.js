//name
document.querySelector('.cntgame span').onclick = function(){
    let name = prompt("what's Your name");
    if(name == null || name ==""){
        document.querySelector('.name span').innerHTML = 'Unknown';
        localStorage.setItem('name', 'Unknown');
        document.getElementById('game').play();
    }else{
        document.querySelector('.name span').innerHTML = name;
        localStorage.setItem('name', name);
        document.getElementById('game').play();
    }
    document.querySelector('.cntgame').remove();
    setInterval(() => {
        time();
    }, 1000);
};


//duration
let duration = 1000;
//array of blocksgame
let blockscontainer = document.querySelector('.block');
let blocks = Array.from(blockscontainer.children);

//range
let orderRange = [...Array(blocks.length).keys()]; //keys =>index 0 1 2 ---- 19
shuffle(orderRange);

//add order css property to game blocks
blocks.forEach((b, ind)=>{
    b.style.order = orderRange[ind];
//add flip
    b.addEventListener('click', function(){
        flipblock(b);
    });
});

//shuffle function
function shuffle(array){
    let current = array.length;
    let temp;
    let random;
    while(current > 0){
        //get random num
        random = Math.floor(Math.random() * current);
        current--;
        //save current el in stash
        temp = array[current];
        //curent el = random el
        array[current] = array[random];
        //random el = stash
        array[random] = temp;
    }
    return array;
}

//stop clicking function
function stopclicking(){
    blockscontainer.classList.add('no-clicking');
    //duration
    setTimeout(()=>{
    //remove class no-clickng after duration
    blockscontainer.classList.remove('no-clicking');
    }, duration);
}

//function metched block
function metched(first, second){
    let tries = document.querySelector('.tries span');
    let score = document.querySelector('.score span');

    if(first.dataset.game === second.dataset.game){
        score.innerHTML = parseInt(score.innerHTML) + 1 ;
        first.classList.remove('flipped');
        second.classList.remove('flipped');

        first.classList.add('match');
        second.classList.add('match');

        if((parseInt(score.innerHTML) === blocks.length / 2)){
            setTimeout(()=>{
                window.location.reload();
            }, 4000);
    
            setTimeout(()=>{
                document.querySelector('.sucessed').classList.add('show');
            }, 1000);
        }

        document.querySelector('#sucess').play();
    } else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1 ;
        setTimeout(()=>{
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        }, duration);
        document.querySelector('#fail').play();
        document.querySelector('.try span').innerHTML = parseInt(document.querySelector('.try span').innerHTML) - 1;
    }

    if(parseInt(tries.innerHTML) >= 15){
        setTimeout(()=>{
            window.location.reload();
        }, 4000);

        setTimeout(()=>{
            document.querySelector('.failed').classList.add('show');
        }, 1000);
    }

    localStorage.setItem('tries', parseInt(tries.innerHTML));
    localStorage.setItem('score', parseInt(score.innerHTML));
}

//flip block function
function flipblock(selectblock){
    selectblock.classList.add('flipped');
    //collect All flipped card
    let allflippedblocks = blocks.filter(flipblock=> flipblock.classList.contains('flipped'));

     //if 2 selected
if(allflippedblocks.length === 2){

    //stop clicking function
    stopclicking();

     //check metched block function
    metched(allflippedblocks[0], allflippedblocks[1]);
};
}

let table = document.querySelector('table');
let tr = document.createElement('tr');
let th1 = document.createElement('th');
let th2 = document.createElement('th');
let th3 = document.createElement('th');
th1.appendChild(document.createTextNode('Name'));
th2.appendChild(document.createTextNode('Score'));
th3.appendChild(document.createTextNode('Wrong tries'));
tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
table.appendChild(tr);

    let tr2 = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    td1.appendChild(document.createTextNode(localStorage.getItem('name')));
    td2.appendChild(document.createTextNode(localStorage.getItem('score')));
    td3.appendChild(document.createTextNode(localStorage.getItem('tries')));
    tr2.appendChild(td1);
    tr2.appendChild(td2);
    tr2.appendChild(td3);
    table.appendChild(tr2);


//function time
function time(){
    let m = document.querySelector('.time .m');
    let s = document.querySelector('.time .s');
    if(parseInt(s.innerHTML) === 0){
        if(parseInt(m.innerHTML) === 0){
            setTimeout(()=>{
                window.location.reload();
            }, 4000);
    
            setTimeout(()=>{
                document.querySelector('.timeout').classList.add('show');
            }, 1000);
        }else{
            m.innerHTML = parseInt(m.innerHTML) - 1 + 'm';
            s.innerHTML = 59 + 's';
        }
    }else{
    s.innerHTML = parseInt(s.innerHTML) - 1 + 's';
    }
}

