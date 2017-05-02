var marcadores = [];
var colunas = [];
var colLat,colLon = null;
var csvComLabel = true;

$("#arqTabela").change(function(e){
    var arq = e.target.files[0];
    var leitor = new FileReader();
    leitor.onload = function(r) {
        tabela = $.csv.toArrays(r.target.result);
        if(csvComLabel){       
            colunas = [];
            for(var c=0;c<tabela[0].length;c++){
                colunas.push(tabela[0][c]);
                $("#colunas").append("<label>" + tabela[0][c] + "</label>");
            }  
            tabela = tabela.splice(1,tabela.length);
        }
        //// SÓ PRA TESTE
        colLat = 0; colLon = 1;
        ////
        for(i=0;i<tabela.length;i++){
            posicoes.push(new google.maps.LatLng(tabela[i][colLat], tabela[i][colLon]));
        }
        adicionaMarcadores();
        geraMapaCalor();
        criaTabela();   
    };
    leitor.readAsText(arq); 
});

function criaTabela(){
    $("#containerTabela").html("");
    var tmp = [];
    for(var i=0;i<colunas.length;i++){
        tmp[i] = {title: colunas[i]};
    }
    $('#containerTabela').DataTable( {
        data: tabela,
        colReorder: true,
        language: {
            url: "lib/datatables-ptbr.json"
        },
        columns: tmp,
    });
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
        var janela = new google.maps.InfoWindow({
           content: "aaa"
        });
        marcador.addListener("click",function(){
            janela.open(mapa,this); 
        });
        marcadores.push(marcador);
    }
    if(temp != null) { clusterMarcadores.addMarkers(marcadores); }
}
function mudaMarcadores(){
    if($("#checkMarcadores").is(":checked")){
         clusterMarcadores.addMarkers(marcadores);
    } else { clusterMarcadores.clearMarkers(); }
}