//=====| NodeJS  |=====//
const remote = require('electron').remote;
var chart = require('chart.js');

//=====| Runtime |=====//
var opcoesMapa = {
  zoom: 16,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  center: new google.maps.LatLng(-22.7653619,-43.688468)
};
var mapa = new google.maps.Map(document.getElementById('mapaInicio'), opcoesMapa);

var data;

var tabela;
var posicoes = [];
var mapaCalor;

function criaGraficoInicio(){
    var manha = {
            label: 'Manhã',
            data: [200, 280, 50,20,20,200, 280, 50,20,50,20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        };
        
var tarde = {
            label: 'Tarde',
            data: [200, 280, 50,20,20,200, 280, 50,20,50,20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        };    
        
var noite = {
            label: 'Noite',
            data: [200, 280, 50,20,20,200, 280, 50,20,50,20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        };    

var myChart = new Chart("grafico", {
    type: 'bar',
    data: {
        labels: ["P1", "ICHS", "PAT","PAP","ICE","IB","IZ","IF","IA","DG","PIT"],
        datasets: [manha,tarde,noite]
    },
    options: {
        responsive:true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}
criaGraficoInicio();

$(".menu.selecionavel").click(function(e){
    $(".menu").not(this).removeClass("ativo");
    $(this).addClass("ativo");
    
    $("[ativo=true]").attr("ativo",false);
    $("#" + $(this).attr("div")).attr("ativo",true);
    
    if($(this).attr("div") != "mapa") { $("#menuMapa").hide(); } else { $("#menuMapa").show(); }
});

$("#mInicio").click(function(e){
    $("#txtTitulo").html("Inicio");
    $("#inicio").css("left","2%");
    $("#mapaInicio").removeClass("aberto");
    google.maps.event.trigger(mapa, "resize");
});

$("#mMapa").click(function(e){
    $("#txtTitulo").html("Mapa");
    $("#inicio").css("left","0px");
    $("#mapaInicio").addClass("aberto");
    google.maps.event.trigger(mapa, "resize");
});

$("#menuInicio").click(function(e){
    $("#arqTabela").trigger("click");
});
$("#menuMalha").click(function(e){
    $("#arqMalha").trigger("click");
});

$("#btnFechar").click(function(e){
    remote.getCurrentWindow().close(); 
});

//=====| Menu Mapa |=====//
$("#checkMarcadores").change(function(e){ 
    if($(this).is(":checked")){
        mudaMarcadores();
    } else {
        mudaMarcadores();
    }    
});
$("#checkMalha").change(function(e){ 
    if($(this).is(":checked")){
        //mudaMarcadores(mapa);
    } else {
       // mudaMarcadores(null);
    }    
});
$("#checkDensidade").change(function(e){ 
    if(mapaCalor != null) { mapaCalor.setMap(mapaCalor.getMap() ? null : mapa); }
});
//======================//


//========| Mapa Calor |========//
function geraMapaCalor(){
    var temp = null;
    if($("#checkDensidade").is(":checked")){
         temp = mapa;
    }
    mapaCalor = new google.maps.visualization.HeatmapLayer({
		data: posicoes,
		radius: 20,
		map: temp
	});
}
//=============================//


var tmp;

function carregaGeoJSON(conteudo){	
    eval("var myData = "+data.toString()+";");

    var myShapesComp = myData.shapes;
    console.log(myShapesComp);
    loadedBounds[0] = {NORTE: myData.bounds.NORTE, SUL: myData.bounds.SUL, LESTE: myData.bounds.LESTE, OESTE: myData.bounds.OESTE};

    fitBounds();

    for (var codarea in myShapesComp)
    {
        var myShapes = compactador.descompacta(myShapesComp[codarea]);

        var aux1 = new google.maps.MVCArray();
        for (var i=0; i<myShapes.length; i++)
        {
            var aux2 = new google.maps.MVCArray();
            if (i==0)
            {
                for (var j=0; j<myShapes[i].length; j++)
                    aux2.push(new google.maps.LatLng(myShapes[i][j][0], myShapes[i][j][1]));
            }
            else// inverte para fazer buracos
            {
                for (var j=myShapes[i].length-1; j>=0; j--)
                    aux2.push(new google.maps.LatLng(myShapes[i][j][0], myShapes[i][j][1]));
            }
            // baca para não desenhar os pelinhos...
            if (aux2.getLength() > 10 || aux2.getAt(0).toString() != aux2.getAt(aux2.getLength() - 1).toString())
                aux1.push(aux2)
        }
        tmp = new google.maps.Polygon({
            map:			mapa,
            clickable:		true,
            fillColor:		"#eee",
            fillOpacity:	1,
            strokeColor:	"#555",
            strokeWeight:	0.5,
            strokeOpacity:	1,
            paths:			aux1,
            id:				codarea
        });
        google.maps.event.addListener(tmp, 'click', function() {
            popUpDashboard(this.id);
        });
    }
}
var loadedBounds = [];
function fitBounds(){
    console.log(loadedBounds);
	var mapBounds = new google.maps.LatLngBounds();
//	for (var i in munsAtivos)
//	{
		mapBounds.extend(new google.maps.LatLng(loadedBounds[0].SUL, loadedBounds[0].OESTE));
		mapBounds.extend(new google.maps.LatLng(loadedBounds[0].NORTE, loadedBounds[0].LESTE));
//	}
	mapa.fitBounds(mapBounds);
}


function popUpDashboard(id){
    alert(id);
//	$('div#popDasboard').remove();
//	
//	var w = 900;
//	var h = 600;
//	$('body').prepend('<div id="popDasboard" title="Clique para fechar a janela."><p class="fechar" title="Fechar janela." style="margin-top:' + ($(window).height()>h ? Math.round(($(window).height()-h)*0.5) : 0) +'px;">Fechar [x]&nbsp;&nbsp;</p><div class="menu"><iframe src="dashboard.html?cod='+id+'" width="'+w+'" height="'+h+'" border="0" style="margin-top:0; margin-left:' + ($(window).width()>w ? Math.round(($(window).width()-w)*0.5) : 0) +'px;"></iframe></div><div>');
//	
//	$('div#popDasboard').click(function(){
//		$(this).remove();
//	});
}


function mudaGradiente(){
	var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}