//Variables y Selectores de elementos del HTML-----------------------------------------------------------------------------------------------------------------
const selectCriptomonedas = document.querySelector( '#criptomonedas' );





//Eventos------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener( 'DOMContentLoaded', () => {
    
    consultCryptos();
    
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




//Constructores------------------------------------------------------------------------------------------------------------------------------------------------




//Instancias---------------------------------------------------------------------------------------------------------------------------------------------------




//Arreglos-----------------------------------------------------------------------------------------------------------------------------------------------------




//Objetos------------------------------------------------------------------------------------------------------------------------------------------------------




//Clases------------------------------------------------------------------------------------------------------------------------------------------------------








//Prototype----------------------------------------------------------------------------------------------------------------------------------------------------








