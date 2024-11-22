let euro = document.getElementById('euro');
let usd = document.getElementById('usd');
let bitcoin = document.getElementById('bitcoin');
let logo = document.getElementById('logo');
let titulo = document.getElementById('titulo');
let precioEuro = document.getElementById('precioEuro');
let precioUsd = document.getElementById('precioUsd');
let precioBitcoin = document.getElementById('precioBitcoin');
let cargando = document.getElementById('cargando');


function cargarCosas() {
    logo.src = '/img/logo.jpg';
    titulo.textContent = "Tus mejores cotizaciones en línea";
    cargando.src = '/img/carga.gif'; 
    cargando.style.display = 'none';
    euro.innerHTML = "EUR a USD: <span id='precioEuro'></span>";
    usd.innerHTML = "USD a COP: <span id='precioUsd'></span>";
    bitcoin.innerHTML = "Bitcoin a USD: <span id='precioBitcoin'></span>";
}

async function datosPrecios() {
    try{
        cargando.style.display = 'block';
    
        let respuestaEuro = await fetch('https://open.er-api.com/v6/latest/USD');
        let respuestaCop = await fetch('https://open.er-api.com/v6/latest/USD');
        let respuestaBitcoin = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    
        let datosEuro = await respuestaEuro.json();
        let datosUsd = await respuestaCop.json();
        let datosBitcoin = await respuestaBitcoin.json();
    
        document.getElementById('precioEuro').textContent = datosEuro.rates.EUR.toFixed(2);
        document.getElementById('precioUsd').textContent = datosUsd.rates.COP.toFixed(2);
        document.getElementById('precioBitcoin').textContent = datosBitcoin.bpi.USD.rate_float.toFixed(2);

    } catch (error) {
        console.error("Error al cargar los datos:", error);
    } finally {
        cargando.style.display = 'none';
    }
}

cargarCosas();
datosPrecios();
