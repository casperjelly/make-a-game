const app = {
    init: function(){
        const header = document.createElement('h1');
        header.textContent = 'Hello Game';

        const body = document.getElementsByTagName('body')[0];
        body.appendChild(header);
    }
};

app.init();