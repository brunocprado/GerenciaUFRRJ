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
            if (i==0){
                for (var j=0; j<myShapes[i].length; j++)
                    aux2.push(new google.maps.LatLng(myShapes[i][j][0], myShapes[i][j][1]));
            }
            else{
                for (var j=myShapes[i].length-1; j>=0; j--)
                    aux2.push(new google.maps.LatLng(myShapes[i][j][0], myShapes[i][j][1]));
            }
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
            //popUpDashboard(this.id);
        });
    }
}
var loadedBounds = [];
function fitBounds(){
    console.log(loadedBounds);
	var mapBounds = new google.maps.LatLngBounds();
    mapBounds.extend(new google.maps.LatLng(loadedBounds[0].SUL, loadedBounds[0].OESTE));
    mapBounds.extend(new google.maps.LatLng(loadedBounds[0].NORTE, loadedBounds[0].LESTE));
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
