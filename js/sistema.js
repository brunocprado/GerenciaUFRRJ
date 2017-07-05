//=====| NodeJS  |=====//
const remote = require('electron').remote;
var chart = require('chart.js');

//=====| Runtime |=====//
var mapa = new google.maps.Map(document.getElementById('mapaInicio'),{
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(-22.7653619,-43.688468)
});

var autocomplete = new Awesomplete(document.getElementById("txtPesquisar"),{
	minChars: 3,
	maxItems: 12,
    data: function (text, input) {
        var img = "";
        if(text[1] == "U") img = "avatar";
        if(text[1] == "A") img = "aluno";
        if(text[1] == "S") img = "sala";
        if(text[1] == "M") img = "classe";
		return {label: "<img src='img/" + img + ".png'/>" + text[0], value: text[0]};
	},
});

Awesomplete.$.bind(document.getElementById("txtPesquisar"), {
    "awesomplete-selectcomplete": function(evt) {
        console.log(evt.text); 
    }
});

var data;
var tabela;
var mapaCalor;

$("#frmLogin").submit(function(e){
    fazLogin($("#txtUsuario").val(),$("#txtSenha").val());
    e.preventDefault();
    return false;
});

$("#txtPesquisar").keyup(function(e){
    if($(this).val().length > 2) pesquisa($(this).val());
});

$('#calendario').fullCalendar({
    weekends: false, 
    //header: false,
    minTime: '07:30:00', 
    maxTime: '22:00:00',
    locale: "pt-br",
    displayEventTime: true,
    contentHeight: 380 
});


function criaGraficoInicio(){
    var manha = {
            label: 'Manhã',
            data: [100, 210, 80,50,30,120, 310, 70,40,50,20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)'
            ]
        };
        
var tarde = {
            label: 'Tarde',
            data: [170, 220, 50,30,70,250, 280, 50,20,50,90],
            backgroundColor: [
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(54, 162, 235, 0.4)'
            ]
        };    
        
var noite = {
            label: 'Noite',
            data: [200, 280, 50,20,20,200, 280, 50,20,50,20],
            backgroundColor: [
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(255, 206, 86, 0.4)'
            ]
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
$("#btnTelaCheia").click(function(e){
    $("#mMapa").trigger("click");
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

$.trumbowyg.svgPath = './lib/ui/icons.svg';
$('#txtEventoConteudo').trumbowyg();