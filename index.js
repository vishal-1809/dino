document.addEventListener('DOMContentLoaded', () => {
    let width = 16;
    let height = 7;
    const grid = document.querySelector('.grid');

    for (let i = 0; i < 80; i++) {
        const box = document.createElement('div');
        grid.appendChild(box);
    }

    const box = document.querySelectorAll('.grid div');
    let dino = 66;
    let time = 400;
    let cactus = 79;
    let cactus1 = 84;
    let game = true;
    let score = 0;

    box[dino].classList.add('dino');
    box[cactus].classList.add('cactus');


    let move = setInterval(() => {
        if (cactus === 64) {
            box[cactus].classList.remove('cactus');
            box[79].classList.add('cactus');
            cactus = 79;
        }
        else {
            box[cactus].classList.remove('cactus');
            box[cactus - 1].classList.add('cactus');
            cactus--;
        }
        if (cactus1 > 79) {
            cactus1--;
        }
        else {
            if (cactus1 === 64) {
                box[cactus1].classList.remove('cactus');
                cactus1 = 84;
            }
            else {
                box[cactus1].classList.remove('cactus');
                box[cactus1 - 1].classList.add('cactus');
                cactus1--;
            }
        }
        time *= 0.9;
        // console.log(dino,cactus-16,cactus1-16);
        if (dino === cactus || dino === cactus1) {
            box[dino].classList.add('boom');
            game = false;
            document.getElementById('over').style.display = 'block';
            clearInterval(move);
        }
    }, 200);

    let scoring = setInterval(() => {
        if (!game) {
            clearInterval(scoring);
        }
        score++;
        document.getElementById('score').innerHTML = `${score}`;
    }, 1000);

    function goleft() {
        if (dino !== 64 && game) {
            box[dino].classList.remove('dino');
            box[dino - 1].classList.add('dino');
            dino--;
        }
    }
    function goright() {
        if (dino !== 79 && game) {
            box[dino].classList.remove('dino');
            box[dino + 1].classList.add('dino');
            dino++;
        }
    }
    function goup() {
        if (dino - width >= 48 && game) {
            box[dino].classList.remove('dino');
            box[dino - width].classList.add('dino');
            dino -= width;
            setTimeout(() => {
                box[dino].classList.remove('dino');
                box[dino + width].classList.add('dino');
                dino += width;
            }, 500);
        }
    }

    function key(e) {
        if (e.keyCode === 37 && dino !== 64 && game) {
            goleft();
        }
        if (e.keyCode === 39 && dino !== 79 && game) {
            goright();
        }
        if (e.keyCode === 38 && dino - width >= 48 && game) {
            goup();
        }
        // console.log(dino);
    }


    document.addEventListener('keydown', key);
    document.getElementById('left').addEventListener('click', goleft);
    document.getElementById('right').addEventListener('click', goright);
    document.getElementById('up').addEventListener('click', goup);

});
