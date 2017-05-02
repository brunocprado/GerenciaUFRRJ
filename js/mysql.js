var mysql = require("mysql");

var conexao = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'trab'
});

conexao.connect();

//var post  = {id:5,nome: "Bruno" };

//conexao.query('SELECT * from teste', function(err, rows, fields) {
//  if (!err)
//    console.log('The solution is: ', rows);
//  else
//    console.log('Error while performing Query.');
//});

function getPosicoes(){
    conexao.query('SELECT * from teste', function(err, rows, fields) {
        if (!err){
            for(i=0;i<rows.length;i++){
                posicoes.push(new google.maps.LatLng(rows[i].Lat, rows[i].Lon));
            }
            adicionaMarcadores();
        }
    });
}

function getDadosInicio(){
    conexao.query('SELECT COUNT(*) AS "QT" from teste', function(err, rows, fields) {
        if (!err){
            $("#qtAlunos").html(rows['0'].QT);
        }
    });
    conexao.query('SELECT COUNT(*) AS "QT" from salas', function(err, rows, fields) {
        if (!err){
            $("#qtSalas").html(rows['0'].QT);
        }
    });
}

getDadosInicio();
getPosicoes();

//
//conexao.end();