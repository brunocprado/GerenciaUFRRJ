//=========| MySQL |=========//
var mysql = require("mysql");

var conexao = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'trab'
});

conexao.connect();
//===========================//

function fazLogin(login,senha){
    conexao.query('SELECT COUNT(*) AS "QT" from usuarios WHERE login="' + login + '" AND senha="' + senha + '"', function(erro, linhas, campos){
        if (!erro){
            if(linhas['0'].QT == 1){
                $("#login").fadeOut(500);
            } else{
                alert("Usúario ou senha incorretos");
            }
        }
    });
}

function getPosicoes(){
    conexao.query('SELECT * from teste', function(erro, linhas, campos) {
        if (!erro){
            for(i=0;i<linhas.length;i++){
                posicoes.push(new google.maps.LatLng(linhas[i].Lat, linhas[i].Lon));
            }
            adicionaMarcadores();
        }
    });
}

function getDadosInicio(){
    conexao.query('SELECT COUNT(*) AS "QT" from teste', function(erro, linhas, campos){
        $("#qtAlunos").html(linhas['0'].QT);
    });
    conexao.query('SELECT COUNT(*) AS "QT" from salas', function(erro, linhas, campos){
        $("#qtSalas").html(linhas['0'].QT);
    });
    conexao.query('SELECT COUNT(*) AS "QT" from materias', function(erro, linhas, campos){
        $("#qtMaterias").html(linhas['0'].QT);
    });
    conexao.query('SELECT COUNT(*) AS "QT" from usuarios', function(erro, linhas, campos){
        $("#qtUsuarios").html(linhas['0'].QT);
    });
}

function getListaAlunos(){
    conexao.query('SELECT * from teste', function(erro, linhas, campos){
        console.log(linhas);
    });
}

function pesquisa(busca){
    var consulta = '(SELECT nome,"A" FROM teste WHERE nome LIKE "%' + busca + '%" LIMIT 10)'
                 + ' UNION (SELECT nome,"U" from usuarios WHERE nome LIKE "%' + busca + '%" LIMIT 10)'
                 + ' UNION (SELECT nome,"S" from salas WHERE nome LIKE "%' + busca + '%" LIMIT 10)'
                 + ' UNION (SELECT nome,"M" from materias WHERE nome LIKE "%' + busca + '%" LIMIT 10)'
    
    conexao.query(consulta, function(erro, linhas, campos) {
        if (!erro){
            var tmp = [];
            for(var i=0;i<linhas.length;i++){
                tmp.push([linhas[i].nome,linhas[i].A]);
            }
            autocomplete.list = tmp;
        }
    });
}

getDadosInicio();
getPosicoes();

//conexao.end();