const getNumbers = (concurso) => {
    fetch("api/concurso/" + concurso)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        render(data.numeros);
    });
};

const init = () => {
    var value = document.getElementById("concurso");
    let avanca = document.getElementById("avanca");
    let volta = document.getElementById("retrocede");
    
    volta.addEventListener('click', ev => {
        value.value = +value.value-1;
        getNumbers(value.value);
    });

    avanca.addEventListener('click', ev => {
        value.value = +value.value+1;
        getNumbers(value.value);
    });

    getNumbers(value.value);
};

const render = (numbers) => {
    var elem = document.getElementById("container");
    var html = "<div class=\"container\">";
    for(var i = 1; i <= 60; i++) {
        let mark = (numbers.includes(i));
        html += "<div class=\"cell"+(mark?" mark":"")+"\">" + (i < 10 ? "0" : "") + i + "</div>";
    }
    html += "</div>";
    elem.innerHTML = html;
    return true;
};

init();