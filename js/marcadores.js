var posicoes = [];
var marcadores = [];
var colunas = [];
var colLat,colLon = null;

function criaTabela(){
//    $("#containerTabela").html("");
//    var tmp = [];
//    for(var i=0;i<colunas.length;i++){
//        tmp[i] = {title: colunas[i]};
//    }
//    $('#containerTabela').DataTable( {
//        data: tabela,
//        colReorder: true,
//        language: {
//            url: "lib/datatables-ptbr.json"
//        },
//        columns: tmp,
//    });
}

var clusterMarcadores = new MarkerClusterer(mapa, [],{imagePath: './img/marcadores/m'});
function adicionaMarcadores() { //TODO:só adicionar qnd for usar (1a vez)
    var temp = null;
    if($("#checkMarcadores").is(":checked")){
         temp = mapa;
    }
    for(i=0;i<posicoes.length;i++){
        //var conteudo = "Idade,Renda,";
        var marcador = new google.maps.Marker({
            position: posicoes[marcadores.length]
//            map: temp
        });	
        marcadores.push(marcador);
    }
    if(temp != null) { clusterMarcadores.addMarkers(marcadores); }
    posicoes = null;
}
function mudaMarcadores(){
//    if($("#checkMarcadores").is(":checked")){
         clusterMarcadores.addMarkers(marcadores);
//    } else { clusterMarcadores.clearMarkers(); }
}