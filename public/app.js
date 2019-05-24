const elem = document.getElementById("container");
const field_data = document.getElementById("data");
const value = document.getElementById("concurso");

const getNumbers = (concurso) => {
    fetch("api/concurso/" + concurso)
    .then(data => data.json())
    .then(data => {
        value.value = concurso;
        field_data.innerText = data.data;
        render(data.numeros);
    });
};

const init = () => {
    let avanca = document.getElementById("avanca");
    let volta = document.getElementById("retrocede");
    
    volta.addEventListener('click', (ev) => {
        getNumbers(+value.value-1);
    });

    avanca.addEventListener('click', (ev) => {
        getNumbers(+value.value+1);
    });

    getNumbers(value.value);
};

const render = (numbers) => {
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