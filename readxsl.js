var XLSX = require('xlsx');
var workbook = XLSX.readFile('mega_sena_asloterias_ate_concurso_2153_sorteio.xlsx');

var first_sheet_name = workbook.SheetNames[0];

const total = 2153;
const offSet = 8;
 
/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

const getValue = (desired_cell) => {
    /* Get the value */
    return (desired_cell ? desired_cell.v : undefined);
};

const getResult = (lineNumber) => {
    return {
        concurso: getValue(worksheet["A" + lineNumber]),
        numeros: [
            getValue(worksheet['C' + lineNumber]),
            getValue(worksheet['D' + lineNumber]),
            getValue(worksheet['E' + lineNumber]),
            getValue(worksheet['F' + lineNumber]),
            getValue(worksheet['G' + lineNumber]),
            getValue(worksheet['H' + lineNumber])
        ]
    };
}

const findConcurso = (concurso) => {
    return getResult((total - concurso) + offSet);
};

const findAll = () => {
    let result = [];
    for(var i = 0; i < total; i++) {
        let lineNumber = i + offSet;
        result.push(getResult(lineNumber));
    }
    return result;
}

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/api/concurso/:number', function (req, res) {
  res.send(findConcurso(req.params.number));
});

app.get('/api', function (req, res) {
  res.send(findAll());
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


