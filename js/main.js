class player {
    constructor (id, nameplayer, accountnumber) {
        this.id = id;
        this.nameplayer = nameplayer;
        this.accountnumber = accountnumber;
        this.initialvalue = 100000;
        this.accumulatedmoney = 0;
        
     
    }



}

class Bets {
    addPlayer(_objPlayer){
 

       var tbl = document.getElementById('player-list-table').getElementsByTagName('tbody')[0];
 
        ///console.log(tbl.children());
       var row = tbl.insertRow(-1);
       var cellID = row.insertCell(-1);
       var cellnameplayer = row.insertCell(-1);
       var cellinitialvalue = row.insertCell(-1);
       var cellaccount = row.insertCell(-1);
       var cellbtndelete = row.insertCell(-1);

       var textcellID = document.createTextNode(_objPlayer.id);      
       var textnameplayer = document.createTextNode(_objPlayer.nameplayer);
       let moneyformat = new Intl.NumberFormat("es-CO", {style: "currency", currency: "COP", maximumSignificantDigits: 3}).format(_objPlayer.initialvalue);
       var textinitialvalue = document.createTextNode(moneyformat);
       var textaccount = document.createTextNode(_objPlayer.accountnumber);
   
       var btncelldelete = document.createElement('input');
       btncelldelete.setAttribute('type', 'button');
       btncelldelete.setAttribute('class', 'btn btn-danger');
       btncelldelete.setAttribute('id', _objPlayer.id);
       btncelldelete.setAttribute('value', 'Delete');
       btncelldelete.setAttribute('name', 'btndelete');
       
       

       cellnameplayer.appendChild(textnameplayer);
       cellinitialvalue.appendChild(textinitialvalue);
       cellaccount.appendChild(textaccount);  
       cellbtndelete.appendChild(btncelldelete);
       cellID.appendChild(textcellID);
    }

   
    ResetForm(){
      document.getElementById('addplayer-form').reset();
    }

    GotoPlay(element){
      let property = Object.keys(objLista);
      if(element.name === "gotoplay" && property.length !== 0){
  
        const player = document.getElementById('player');
        const listplayer = document.getElementById('player-list');
        const buttongroup = document.getElementById('gamebuttongroup');
    
        if(player.style.display === "none"){
          player.style.display = "block";          
          buttongroup.style.display = "none";

         
         
     
        }else{

          player.style.display ="none"      
          buttongroup.style.display = "block";   
          listplayer.style.position = "absolute";
          listplayer.style.left = "0";
          listplayer.style.right = "0";
          listplayer.style.margin ="auto";
          listplayer.style.width = "700px";
  
        
         
          
        }
      }

    }

    BackAddPlayer(element){
      
      if(element.name === "back"){
        const buttongroup = document.getElementById('gamebuttongroup');
        const roulette = document.getElementById('roulette');
        const player = document.getElementById('player');
        const listplayer = document.getElementById('player-list');
        if(player.style.display === "block"){
          player.style.display = "none";
          buttongroup.style.display ="block";
          roulette.style.display = "block";
          
        }else {
          player.style.display ="block";
          buttongroup.style.display ="none";
          roulette.style.display = "none";
          listplayer.style.position = "absolute";
          listplayer.style.left = "40%";
                 
          listplayer.style.width = "700px";
          //listplayer.style.height = "300px";
         
        }
      }

    }

   
    DeletePlayer(element){
      if(element.name === "btndelete"){
    
       element.parentElement.parentElement.remove();
      

      objLista.forEach((item,index,arr)=>{
        if(item.id==element.id)
        { arr.splice(index,1 )}
      })
        //this.DeletePlayerObject(element);
    
     
        this.ShowMessage('Player successfully deleted', 'info');
    

      }

 
    }

    DeletePlayerObject(element){
      objLista.forEach((item,index,arr)=>{
        if(item.id==element.id)
        
        { 
          objFinalize.push(item),
          arr.splice(index,1 )}
        //console.log(arr);
        
      });
      //console.log(objFinalize);
    }

    
    finalizePlayer(element){
      if(element.name ==='btnFinalize'){
        element.parentElement.parentElement.remove();
        this.DeletePlayerObject(element);
       

       delete objBetvaluenumber['betnumber'+element.id];
       delete objBetvaluenumber['betvalue'+element.id];

      }
    

    }

    FinishAll(element){
      if(element.name === "FinishAll"){
        let _objTemporal = Object.keys(objLista);
        for (let i = 0; i < _objTemporal.length; i++) {
          const property = _objTemporal[i];
          objFinalize.push(objLista[property]);
          delete objLista[property];
          
        }
        const allplayer = document.getElementById('all-player');
        const roulette = document.getElementById('roulette');
        const report = document.getElementById('report');
        const earningreport = document.getElementById('earningreport');

        allplayer.style.display = 'none';
        roulette.style.display = 'none';
        report.style.display = 'block';
        earningreport.style.display = 'block';
        
        //console.log(objFinalize);


        var tablereport = document.getElementById('tablereport').getElementsByTagName('tbody')[0];
        let objrecorrer = Object.keys(objFinalize);
        for (let i = 0; i < objrecorrer.length; i++) {
          const property = objrecorrer[i];
          
        
        var row = tablereport.insertRow(-1);
        var cellID = row.insertCell(-1);
        var cellnameplayer = row.insertCell(-1);
        var cellAmounttobePaid = row.insertCell(-1);
        var cellTrend = row.insertCell(-1);    
        let moneyformat = new Intl.NumberFormat("es-CO", {style: "currency", currency: "COP", maximumSignificantDigits: 3}).format(objFinalize[property].initialvalue);
       
        var textcellID = document.createTextNode(objFinalize[property].id);      
        var textnameplayer = document.createTextNode(objFinalize[property].nameplayer);
        var textAmounttobePaid = document.createTextNode(moneyformat);   
        
        var divtrend = document.createElement('div');
        if(objFinalize[property].initialvalue > 100000){
          divtrend.innerHTML = 
          `<div  class="divtrend">           
          <i class="divtendenciaup fas fa-arrow-up"></i>          
          </div>`;

        } else if (objFinalize[property].initialvalue === 100000) {
          divtrend.innerHTML = 
          `<div  class="divtrend">           
          <i class="divtendencia fas fa-window-minimize"></i>          
          </div>`;
        }else {
          divtrend.innerHTML = 
          `<div  class="divtrend">           
          <i class="divtendenciadown fas fa-arrow-down"></i>          
          </div>`;
        }

        

        cellID.appendChild(textcellID);
        cellnameplayer.appendChild(textnameplayer);
        cellAmounttobePaid.appendChild(textAmounttobePaid);
       cellTrend.appendChild(divtrend);

      }

      let moneyProfit= new Intl.NumberFormat("es-CO", {style: "currency", currency: "COP", maximumSignificantDigits: 3}).format(Profits);
      document.getElementById('profits').innerHTML = moneyProfit;
      

    }
  }

    PayAll(element){
      if(element.name=== "PayAll"){

        Swal.fire({
          title: 'Are you sure?',
          text: "you will go back to the beginning",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, go to the beginning'
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
            /*
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )*/
          }
        })
       


        
      }

   }
    StartGame(element){
      
      if(element.name === "startgame"){
        //const buttongroup = document.getElementById('gamebuttongroup');
        const Tobet = document.getElementById('ToBet');
        const back = document.getElementById('back');
        const stargame = document.getElementById('stargame');
        const allplayer = document.getElementById('all-player');
        const playerlist = document.getElementById('player-list');
        const roulette = document.getElementById('roulette');
        
        back.style.display = "none";
        ToBet.style.display = 'block';
        stargame.style.display = "none";
        allplayer.style.display = "block";
        playerlist.style.display = "none";
        roulette.style.display = "block";
        this.ListAllPlayer();
        
        
  
      }

    }

    ListAllPlayer(){
       

       let objrecorrer = Object.keys(objLista);
       for (let i = 0; i < objrecorrer.length; i++) {
         const element = objrecorrer[i];
        
        // console.log(objLista[element]);     

       var table = document.getElementById('Players-to-bet').getElementsByTagName('tbody')[0];
       var row = table.insertRow(-1);
       var cellID = row.insertCell(-1);
       var cellnameplayer = row.insertCell(-1);
       var cellMoney = row.insertCell(-1);
       var celltxtbetnumber = row.insertCell(-1);    
       var celtxtbetValue = row.insertCell(-1);
       var celbtnFinalize = row.insertCell(-1);
       //let moneyformat = new Intl.NumberFormat("es-CO", {style: "currency", currency: "COP", maximumSignificantDigits: 3}).format(objLista[element].initialvalue);
       

       var textcellID = document.createTextNode(objLista[element].id);      
       var textnameplayer = document.createTextNode(objLista[element].nameplayer);
       var textmoney = document.createTextNode(objLista[element].initialvalue);     
       var divbetnumber = document.createElement('div');

       divbetnumber.innerHTML = `<div class="formulario__grupo" id="grupo__bet-number${objLista[element].id}">
       <div class="formulario__grupo-input">
       
           <input type="number"  id="betnumber${objLista[element].id}" name="betnumber${objLista[element].id}"  class="betnumber form-control formulario__input">
           <i class="formulario__validacion-estado fas fa-times-circle"></i>
      
       
       </div>
       <p class="formulario__input-error">Solo se puede apostar del 0 al 9</p>
      </div>`; 
       var divvalue = document.createElement('div');


       var btncellFinalize = document.createElement('input');
       btncellFinalize.setAttribute('type', 'button');
       btncellFinalize.setAttribute('class', 'btn btn-danger');
       btncellFinalize.setAttribute('id', objLista[element].id);
       btncellFinalize.setAttribute('value', 'Finalize');
       btncellFinalize.setAttribute('name', 'btnFinalize');

       cellID.appendChild(textcellID);
       cellnameplayer.appendChild(textnameplayer);
       cellMoney.appendChild(textmoney);
       celltxtbetnumber.appendChild(divbetnumber);  

       //celtxtbetValue.appendChild(div); 
       divvalue.innerHTML = `<div class="formulario__grupo" id="grupo__bet-value${objLista[element].id}">
       <div class="formulario__grupo-input">
       
           <input type="number" id="betvalue${objLista[element].id}" name="betvalue${objLista[element].id}"  class="betvalue form-control formulario__input">
           <i class="formulario__validacion-estado fas fa-times-circle"></i>
      
       
       </div>
       <p class="formulario__input-error">El valor no puede ser menor a 0 ni superior a ${objLista[element].initialvalue}</p>
      </div>`;    

       celtxtbetValue.appendChild(divvalue);
       celbtnFinalize.appendChild(btncellFinalize);

       objBetvaluenumber['betnumber'+objLista[element].id] = false;
       objBetvaluenumber['betvalue'+objLista[element].id] = false;
         
       }

    }

  
    DetermineWinner(){
      
      setTimeout(function(){
        var segment = theWheel.getIndicatedSegment();
        var toastMixin = Swal.mixin({
          toast: true,
          icon: 'success',
          //title: segment.text,
          //text: "Wining Number",
          animation: false,
          position: 'top-right',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          /*didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }*/
        });
        
        toastMixin.fire({
          animation: true,
          title: 'winning number:   ' + segment.text
        });       
        var WinningNumber = parseInt(segment.text);
        const objBet = new Bets();
        
        var arrayobj = [];    //array local para almacenar ganadores
        let objrecorrer = Object.keys(objListBet);
        let objGeneral = Object.keys(objLista);
        for (let i = 0; i < objrecorrer.length; i++) {
          const element = objrecorrer[i];
          const elementGeneral = objGeneral[i];
         // console.log(objListBet[element]);
          //console.log(objLista[elementGeneral]);
          
          if(objListBet[element].betnumber === WinningNumber && objListBet[element].idplayer === objLista[elementGeneral].id){
            objLista[elementGeneral].initialvalue = objLista[elementGeneral].initialvalue +  objListBet[element].betValue;
            Profits = Profits - objListBet[element].betValue;
            arrayobj.push(objLista[elementGeneral].nameplayer);
           // arrayobj.push(objwinner);
           delete objListBet[element];
           
          }else{
            objLista[elementGeneral].initialvalue = objLista[elementGeneral].initialvalue -  objListBet[element].betValue;
             Profits = Profits + objListBet[element].betValue;
            delete objListBet[element];
            if(objLista[elementGeneral].initialvalue <=0){
             objFinalize.push(objLista[elementGeneral]);

              delete objLista[elementGeneral];
            }

          }
          
       }
       //console.log(Profits);
       if(arrayobj.length !== 0){
       setTimeout(function(){
        objBet.ShowMessage('Ganadores:  '+arrayobj.join(",   "), 'success');
        var tabla = document.getElementById('Players-to-bet').getElementsByTagName('tbody')[0];
        tabla.innerHTML = '';

        
        objBet.ListAllPlayer();  
        resetWheel();  return false;

       }, 4000);
       }else {
        setTimeout(function(){
          var tabla = document.getElementById('Players-to-bet').getElementsByTagName('tbody')[0];
          tabla.innerHTML = '';
          objBet.ListAllPlayer();  
          resetWheel();  return false;
         

        }, 4000);
       }
     
       /* console.log(WinningNumber);
        console.log(objListBet);
        console.log(objLista);*/

      }, 14000);

      

    }

    
    Tobet(element){

      respuesta = validarapuestas();
      //console.log(respuesta);
      let property = Object.keys(objLista);
      if(element.name === "ToBet" && property.length !== 0){
        if(respuesta){
          
        theWheel.startAnimation();
        var tabla = document.getElementById('Players-to-bet');
           for (let i = 1,  row; row = tabla.rows[i]; i++) {
            let newbet = {};
            newbet = {
              idplayer: parseInt(tabla.rows[i].cells[0].innerText),
              betnumber: parseInt(tabla.rows[i].cells[3].querySelector('.betnumber').value),
              betValue: parseInt(tabla.rows[i].cells[4].querySelector('.betvalue').value)
            };
            objListBet.push(newbet);
            //validarapuestas(); return false;
         
             
           }
           this.DetermineWinner();
          
          
          } else {
            console.log('debe rellenar todos los campos');
            document.getElementById('formulario__mensaje1').classList.add('formulario__mensaje-activo1');
            setTimeout(function(){
             document.getElementById('formulario__mensaje1').classList.remove('formulario__mensaje-activo1');
           }, 2000);
           }
           
    }
   
    }

    ShowMessage(message, cssClass){
      const divmessage = document.createElement('div');
      divmessage.className = `alert alert-${cssClass}  mt-2`;
      divmessage.appendChild(document.createTextNode(message));
      const  container = document.querySelector('.container');
      const  appbets = document.querySelector('#app-bets');
      container.insertBefore(divmessage, appbets);
      const alertaid = setTimeout(function () {
        document.querySelector('.alert').remove();

      }, 4000);
      

    }
}




/* EVENTOS del DOM*/

// capturo el valor atraves del id del formulario y ademas necesito capturar el evento submit
//cuando capture el evento quuiero ralizar algo a travpes de la función
const objListEdit = [];
const objLista = [];
const objFinalize = [];
var id = 0;
var Profits = 0;
var objListBet = [];
var respuesta = false;


document.getElementById('addplayer-form')
.addEventListener('submit', function(e){
 

   const name = document.getElementById('nameplayer').value;
   const account = document.getElementById('accountnumbre').value;

   //console.log(fields.nameplayer);
   //console.log(fields.accountnumbre);
   if(fields.nameplayer && fields.accountnumbre){
   id = id +1;

  const objPlayer = new player(id, name, account);
  
  objLista.push(objPlayer);  

  const objBet = new Bets();
  objBet.addPlayer(objPlayer); 
  objBet.ShowMessage('Player successfully created', 'success');
  objBet.ResetForm();  
   

   document.querySelectorAll('.formulario__grupo-correcto').forEach((icono)=> {
     icono.classList.remove('formulario__grupo-correcto');
     
   });
   fields.nameplayer = false;
   fields.accountnumbre = false;
  }else{


    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    setTimeout(function(){
      document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    }, 2000);
    
  }
  e.preventDefault();
//console.log(objLista);
});



document.getElementById('player')
.addEventListener('click', function(e){
  
  const objBet = new Bets();
  objBet.GotoPlay(e.target);

});

document.getElementById('player-list')
.addEventListener('click', function(e){
  const objBet = new Bets();
  objBet.BackAddPlayer(e.target);
  objBet.StartGame(e.target);
  objBet.DeletePlayer(e.target);
  //objBet.ModifyPlayer(e.target);
  
});

document.getElementById('all-player')
.addEventListener('click', function(e){
  const objBet = new Bets();
  objBet.Tobet(e.target);
  objBet.finalizePlayer(e.target);
  objBet.FinishAll(e.target);

});


document.getElementById('report').addEventListener('click', function(e){
  const objBet = new Bets();
  objBet.PayAll(e.target);

});