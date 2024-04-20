//Variables y Selectores de elementos del HTML-----------------------------------------------------------------------------------------------------------------
const selectCriptomonedas = document.querySelector( '#criptomonedas' );
const selectMoney = document.querySelector( '#moneda' );
const htmlForm = document.querySelector( '#formulario' );
const htmlResult = document.querySelector( '#resultado' );





//Objetos------------------------------------------------------------------------------------------------------------------------------------------------------
const objSearch = {
    moneda: '',
    criptomoneda: ''
}




//Eventos------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener( 'DOMContentLoaded', () => {
    
    consultCryptos();

    htmlForm.addEventListener( 'submit', submitForm );
    selectCriptomonedas.addEventListener( 'change', readValue );
    selectMoney.addEventListener( 'change', readValue );
    
})



//Promises---------------------------------------------------------------------------------------------------------------------------------
const getCryptos = cryptos => new Promise( resolve => {

    resolve( cryptos );
})




//Funciones----------------------------------------------------------------------------------------------------------------------------------------------------
function consultCryptos() {

    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    
    fetch( url )
        .then( answer => answer.json() )
        .then( result => getCryptos( result.Data ))
        .then( cryptos => selectCryptos( cryptos ))
}




function selectCryptos( cryptos ) {

    cryptos.forEach( cryptos => {
        
        const { FullName, Name } = cryptos.CoinInfo;
        
        const optionCrypto = document.createElement( 'OPTION' );
        optionCrypto.value = Name;
        optionCrypto.textContent = FullName;
        selectCriptomonedas.appendChild( optionCrypto );
    });
}




function readValue( e ) {

    objSearch[ e.target.name ] = e.target.value;
    
}




function submitForm( e ) {

    e.preventDefault();

    //validar
    const { moneda, criptomoneda } = objSearch;

    if( moneda === '' || criptomoneda === '' ) {

        showAlert( 'todos los campos son obligatorios' );
        return;
    }

    //consultar a la API con los resultados
    queryApi();

}




function showAlert( msj ) {

    const errorExist = document.querySelector('.existAlert')
    if( !errorExist ) {

        const divMessage = document.createElement( 'DIV' );           //crear el div
        divMessage.classList.add('error', 'existAlert');                          //agregar clases
        divMessage.textContent = msj;                                 //texto del mensaje
        htmlForm.appendChild(divMessage);                              //agregar todo lo anterior al html

        setTimeout(() => {                                            //quita el mensaje despues de 2 segundo
            divMessage.remove();
        }, 2000);

    }
    
    
}




function queryApi() {

    const { moneda, criptomoneda } = objSearch;
    const urlApiCrypto = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;


    showSpinner();


    fetch( urlApiCrypto )
        .then( answer => answer.json())
        .then( result => {
            showCotizacion( result.DISPLAY[criptomoneda] [moneda] );
        })
}




function showCotizacion( result ){

    cleanHtml();

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = result;
    
    const pPrice = document.createElement( 'P' );
    pPrice.classList.add( 'precio' );
    pPrice.innerHTML = `El Precio es de: <span>${PRICE}</span>`

    const pHighPrice = document.createElement( 'P' );
    pHighPrice.innerHTML = `El Precio mas alto del Dia: <span>${HIGHDAY}</span>`

    const pLowPrice = document.createElement( 'P' );
    pLowPrice.innerHTML = `El Precio mas Bajo del Dia: <span>${LOWDAY}</span>`

    const pChange24H = document.createElement( 'P' );
    pChange24H.innerHTML = `Variacion Ultimas 24 Horas: <span>${CHANGEPCT24HOUR} %</span>`

    const pLastUpdate = document.createElement( 'P' );
    pLastUpdate.innerHTML = `Ultima Actualizacion: <span>${LASTUPDATE}</span>`
    
    htmlResult.appendChild( pPrice );
    htmlResult.appendChild( pHighPrice );
    htmlResult.appendChild( pLowPrice );
    htmlResult.appendChild( pChange24H );
    htmlResult.appendChild( pLastUpdate );

}




function cleanHtml() {

    while( resultado.firstChild ) {
        resultado.removeChild( resultado.firstChild );
    }
}




function showSpinner() {

    cleanHtml();

    const spinner = document.createElement( 'DIV' );
    spinner.classList.add( 'spinner' );
    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    htmlResult.appendChild(spinner);
}




//Constructores------------------------------------------------------------------------------------------------------------------------------------------------




//Instancias---------------------------------------------------------------------------------------------------------------------------------------------------




//Arreglos-----------------------------------------------------------------------------------------------------------------------------------------------------








//Clases------------------------------------------------------------------------------------------------------------------------------------------------------








//Prototype----------------------------------------------------------------------------------------------------------------------------------------------------








