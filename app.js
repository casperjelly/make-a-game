const app = {
    init: function(){
        const intro = document.getElementById('intro');
        const game = document.getElementById('game');
        const countdown = document.getElementById('countdown');
        const countdownStart = 5;
        let countdownCurrent = countdownStart;

        const countdownInterval = setInterval(function(){
            if(countdownCurrent){
                countdown.innerText = countdownCurrent;
                countdownCurrent--;
            }else{
                clearInterval(countdownInterval);
                intro.style.display = 'none';
                game.style.display = 'block';
            }
        }, 1000);
    }
};

app.init();