const app = {
    body: document.getElementsByTagName('body')[0],

    gameBeginsCountdown: 5,

    circleSize: 200,

    circles: 20,
    circlesHit: 0,

    secondsToBeat: 30,
    secondsTaken: 0,
    secondsBar: document.getElementById('seconds-bar'),

    init: function(){
        app.audioInit();

        const circlesEl = document.getElementById('circles');
        circlesEl.innerText = app.circles;

        const secondsToBeatEl = document.getElementById('seconds-to-beat');
        secondsToBeatEl.innerText = app.secondsToBeat;

        const gameBeginsEl = document.getElementById('game-begins');
        const gameBeginsInterval = setInterval(function(){
            if(app.gameBeginsCountdown){
                gameBeginsEl.innerText = app.gameBeginsCountdown;
                app.gameBeginsCountdown--;
            }else{
                clearInterval(gameBeginsInterval);
                app.start();
            }
        }, 1000);
    },

    start: function(){
        let circleEl, x, y, size;
        for(let i=1; i<=app.circles; i++){
            x = Math.floor(Math.random() * 100);
            y = Math.floor(Math.random() * 100);
            size = app.circleSize - ((app.circleSize / 2) * (i / app.circles));

            circleEl = document.createElement('div');
            circleEl.id = 'circle-' + i;
            circleEl.classList.add('circle');

            circleEl.style.width = circleEl.style.lineHeight = size + 'px';

            circleEl.style.left = x + 'vw';
            circleEl.style.marginLeft = ((size / 2) * -1) + 'px';

            circleEl.style.top = y + 'vh';
            circleEl.style.marginTop = ((size / 2) * -1) + 'px';

            circleEl.innerText = i;

            circleEl.addEventListener('click', function(ev){
                app.playSound();

                app.circlesHit++;
                ev.target.remove();

                if(app.circlesHit == app.circles){
                    clearInterval(app.loseCountdownInterval);
                    app.end(true);
                }else{
                    const nextCircle = document.getElementById('circle-' + (app.circlesHit + 1));
                    nextCircle.style.display = 'block';
                }
            });

            app.body.append(circleEl);
        }

        app.loseCountdownInterval = setInterval(function(){
            app.secondsTaken++;
            if(app.secondsTaken == app.secondsToBeat){
                app.end(false);
            }else{
                app.secondsBar.style.right = ((app.secondsTaken / app.secondsToBeat) * 100) + 'vw';
            }
        }, 1000);
    },

    end: function(win){
        const result = 'You ' + (win ? 'won' : 'lose') + '!';
        app.body.innerText = result;
    },

    ///

    audioContext: null,
    oscillator: null,
    audioInit: function(){
        try{
            app.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }catch(error){
            window.alert(`Audio disable (browser doesn't support Web Audio API)`);
        }
    },
    playSound(){
        if(app.audioContext !== undefined) {
            app.oscillator = app.audioContext.createOscillator();
            app.oscillator.connect(app.audioContext.destination);
            if(app.oscillator.noteOn){
                app.oscillator.start = app.oscillator.noteOn;
            }
            app.oscillator.start(app.audioContext.currentTime);
            app.oscillator.stop(app.audioContext.currentTime + 0.1);
        }
    }
};

app.init();