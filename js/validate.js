const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    //telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    cuenta: /^\d{8,8}$/,
    numeroapuesta: /^(\d{1})$/
}


const formplayer = document.getElementById('addplayer-form');
const inputs  = document.querySelectorAll('#addplayer-form input');

const tablabet  = document.getElementById('Players-to-bet');
const elementtable  = document.querySelectorAll('#Players-to-bet');


var objBetvaluenumber = new Object();
const validatetablebet = (eve) =>{
    //console.log(eve.target.name);



//console.log(tablabet.rows);

for (let i = 1,  row; row = tablabet.rows[i]; i++) {
    

   let idjugador =  parseInt(tablabet.rows[i].cells[0].innerText);
   let money =  parseInt(tablabet.rows[i].cells[2].innerText);
   //console.log(eve.target.name)
   
  let numeroapostado = parseInt(tablabet.rows[i].cells[3].querySelector('.betnumber').value);
  let valorapuesta =  parseInt(tablabet.rows[i].cells[4].querySelector('.betvalue').value);
  
 // console.log(money);
  //console.log(numeroapostado);
  //console.log(valorapuesta);
  //console.log(fields.betvalue);

  
  //_objBetvaluenumbe[eve.target.name] = false;
  switch(eve.target.name) {
    
      case 'betnumber'+idjugador:   

      // _objBetvaluenumbe['betnumber'+idjugador] = false;
      
        validateField(expresiones.numeroapuesta, numeroapostado, 'bet-number'+idjugador, idjugador);
          
        break

        case 'betvalue'+idjugador:
        //    _objBetvaluenumbe['betvalue'+idjugador] = false;
            
            validatebet(money, valorapuesta, idjugador);
           
            break;
  }
  
  

};


//console.log(objBetvaluenumber);

    
}

const validarapuestas = ()=> {
    
    let claves = Object.keys(objBetvaluenumber);
    let i = 0;

  for(const propiedad in objBetvaluenumber ){
      i = i +1;
 
            if(!objBetvaluenumber[propiedad]){
        
             return false;

            } else if(objBetvaluenumber[propiedad] && i=== claves.length){
         
                return true;

            }
           
    }
   
    //console.log(objBetvaluenumber);

     
}

elementtable.forEach((inpbet)=>{
    inpbet.addEventListener('keyup', validatetablebet);
    inpbet.addEventListener('blur', validatetablebet);
 
});



const validatebet = (money, valuebet, idjugador)=>{
   if(money < valuebet || valuebet <=0 || !valuebet){
    document.getElementById(`grupo__bet-value${idjugador}`).classList.remove('formulario__grupo-correcto');   
    document.getElementById(`grupo__bet-value${idjugador}`).classList.add('formulario__grupo-incorrecto');   
    document.querySelector(`#grupo__bet-value${idjugador} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__bet-value${idjugador} i`).classList.remove('fa-check-circle');
    document.querySelector(`#grupo__bet-value${idjugador} .formulario__input-error`).classList.add('formulario__input-error-activo');
    //fields['betvalue'] = false;
    objBetvaluenumber['betvalue'+idjugador] = false;
    
   }else {
    document.getElementById(`grupo__bet-value${idjugador}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__bet-value${idjugador}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__bet-value${idjugador} i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__bet-value${idjugador} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__bet-value${idjugador} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    //fields['betvalue'] = true;
    objBetvaluenumber['betvalue'+idjugador] = true;
   }

}

const validateform = (e)=>{
    
 switch(e.target.name) {
     case 'nameplayer':
            validateField(expresiones.nombre, e.target.value, 'nameplayer');
         break;

     case 'accountnumbre':
        validateField(expresiones.cuenta, e.target.value, 'accountnumbre');
        
         break;

         
 }
};

const fields = {
    nameplayer: false,
    accountnumbre: false
   
};

const validateField = (expresion, input, field, id)=> {

    if(expresion.test(input)){
       document.getElementById(`grupo__${field}`).classList.remove('formulario__grupo-incorrecto');
       document.getElementById(`grupo__${field}`).classList.add('formulario__grupo-correcto');
       document.querySelector(`#grupo__${field} i`).classList.remove('fa-times-circle');
       document.querySelector(`#grupo__${field} i`).classList.add('fa-check-circle');
       document.querySelector(`#grupo__${field} .formulario__input-error`).classList.remove('formulario__input-error-activo');
       fields[field] = true;
       //console.log(field);
       if(field === 'bet-number'+id){
        objBetvaluenumber['betnumber'+id] = true;
       }

     }else {
         document.getElementById(`grupo__${field}`).classList.add('formulario__grupo-incorrecto');
         document.getElementById(`grupo__${field}`).classList.remove('formulario__grupo-correcto');
         document.querySelector(`#grupo__${field} i`).classList.remove('fa-check-circle');
         document.querySelector(`#grupo__${field} i`).classList.add('fa-times-circle');
         document.querySelector(`#grupo__${field} .formulario__input-error`).classList.add('formulario__input-error-activo');
         fields[field] = false;
         if(field === 'bet-number'+id){
            objBetvaluenumber['betnumber'+id] = false;
           }
     }
     


};

inputs.forEach((input)=>{
    input.addEventListener('keyup', validateform);
    input.addEventListener('blur', validateform);
});


