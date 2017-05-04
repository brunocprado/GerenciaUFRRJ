var mysql = require("mysql");

var conexao = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'trab'
});

conexao.connect();

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

function fazLogin(login,senha){
    var post = {login: login,senha:senha};
    conexao.query('SELECT COUNT(*) AS "QT" from usuarios WHERE login="' + login + '" AND senha="' + senha + '"', function(err, rows, fields) {
        if (!err){
            if(rows['0'].QT == 1){
                console.log("LOGADO");
                $("#login").fadeOut(500);
            } else{
                alert("Usúario ou senha incorretos");
            }
        }
    });
}

getDadosInicio();
getPosicoes();

//
//conexao.end();