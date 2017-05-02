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

$("#frmLogin").submit(function(e){
    console.log("aaa");
   if($("#txtUsuario").val() == "bruno"){
//       alert("foi");
       $("#login").fadeOut(500);
   } 
    e.preventDefault();
    return false;
});


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


