//Constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){

    /* 
    1 = Americano 1.15
    2 = Asiatico 1.05
    3 = Europeo  1.35
    */
   let cantidad;
   const base = 2000;
    console.log(this.marca);
    switch(this.marca){
        case '1':
            cantidad =  base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;

            default:
                break;
    }

    
    //Read year
    const diferencia = new Date().getFullYear() - this.year;
// Each year that the difference is greater, the cost will be reduced by 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    console.log(cantidad);

    /*
    If the insurance is basic, it is multiplied by 30% more
    If the insurance is complete, it is multiplied by 50% more
    */

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantida *= 1.50;
    }

    return cantidad;
    
}
function UI(){

}


UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Shows screen alerts
UI.prototype.mostrarMensaje = (mensaje, tipo) =>{
    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));
    
}

//instances UI
const ui = new UI();


document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones();
})


eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    //read selected brand
    const marca = document.querySelector('#marca').value;
    console.log(marca)
    //read selected year
    const year = document.querySelector('#year').value;
    console.log(year);
    //read coverage type
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    console.log(tipo);

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando...', 'exito');
    // Coverage instance

    const seguro = new Seguro(marca, year, tipo);
    seguro.cotizarSeguro();

    console.log(seguro);
    //Using the prototype that we are going to use.
}