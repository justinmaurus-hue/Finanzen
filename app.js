import { db } from "./firebase-config.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
orderBy,
query
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const benutzer = {

Justin:{
pin:"1234",
rolle:"admin"
},

Carola:{
pin:"2345",
rolle:"user"
},

Janine:{
pin:"3456",
rolle:"user"
}

};


let aktuellerUser="";



// LOGIN

window.login=function(){

let name =
document.getElementById("user").value;

let pin =
document.getElementById("pin").value;


if(
benutzer[name] &&
benutzer[name].pin===pin
){

aktuellerUser=name;

  let auswahl =
document.getElementById("bezahltVon");


if(name==="Carola"){

auswahl.value="Carola";
auswahl.disabled=true;

}


else if(name==="Janine"){

auswahl.value="Janine";
auswahl.disabled=true;

}


else{

auswahl.disabled=false;

}


document.getElementById("loginBox").style.display="none";

document.getElementById("appBox").style.display="block";


if(benutzer[name].rolle==="admin"){

document.getElementById("adminBox").style.display="block";

document.getElementById("adminBox").innerHTML = `

<h2>Admin Bereich</h2>

<p>
Du bist als Administrator angemeldet.
</p>

<button onclick="adminLoeschen()">
Letzten Eintrag löschen
</button>

`;

}

laden();


}
else{

alert("Falsche PIN");

}

};




// AUSGABE SPEICHERN


window.addAusgabe=async function(){

let typ =
document.getElementById("typ").value;

let bezahltVon = aktuellerUser;

let empfaenger =
document.getElementById("empfaenger").value;

let betrag =
Number(document.getElementById("betrag").value);

let beschreibung =
document.getElementById("beschreibung").value;


if(!betrag){
alert("Bitte Betrag eingeben");
return;
}


await addDoc(
collection(db,"ausgaben"),
{
typ: typ,
bezahltVon: bezahltVon,
empfaenger: empfaenger,
betrag: betrag,
beschreibung: beschreibung,
datum: new Date()
}
);


document.getElementById("betrag").value="";
document.getElementById("beschreibung").value="";


laden();

};




// DATEN LADEN


async function laden(){


let liste=[];


const q=query(
collection(db,"ausgaben"),
orderBy("datum","desc")
);



const daten=
await getDocs(q);



daten.forEach((eintrag)=>{

liste.push({

id:eintrag.id,

...eintrag.data()

});


});



berechnen(liste);

anzeigen(liste);


}




// SCHULDEN BERECHNEN


function berechnen(liste){

let stand=0;


liste.forEach(e=>{


// gemeinsame Ausgabe

if(e.typ==="ausgabe"){

if(e.bezahltVon==="Carola"){
stand += e.betrag / 2;
}

if(e.bezahltVon==="Janine"){
stand -= e.betrag / 2;
}

}


// Rückzahlung

if(e.typ==="rueckzahlung"){

if(e.bezahltVon==="Janine" && e.empfaenger==="Carola"){
stand -= e.betrag;
}

if(e.bezahltVon==="Carola" && e.empfaenger==="Janine"){
stand += e.betrag;
}

}


});


let text;


if(stand>0){

text =
"Janine schuldet Carola "
+ stand.toFixed(2)
+ " €";

}

else if(stand<0){

text =
"Carola schuldet Janine "
+ Math.abs(stand).toFixed(2)
+ " €";

}

else{

text="Alles ausgeglichen";

}


document.getElementById("stand").innerHTML=text;

}




// VERLAUF ANZEIGEN


function anzeigen(liste){


let html="";


liste.forEach(e=>{


html += `

<div class="eintrag">

<b>${e.bezahltVon}</b>
hat
${e.betrag} €
bezahlt

<br>

${e.beschreibung || ""}

`;

if(
aktuellerUser==="Justin"
){

html += `

<br>

<button onclick="adminLoeschen('${e.id}')">
Löschen
</button>

`;

}


html += `</div>`;

});



document.getElementById("verlauf").innerHTML=html;

window.adminLoeschen = async function(id){

let sicher =
confirm("Diesen Eintrag wirklich löschen?");


if(!sicher){
return;
}


await deleteDoc(
doc(db,"ausgaben",id)
);


laden();

};
}
window.zeigeRueckzahlung=function(){

let box =
document.getElementById("rueckzahlungBox");


if(box.style.display==="none"){

box.style.display="block";

}
else{

box.style.display="none";

}

};



window.addRueckzahlung=async function(){

let von = aktuellerUser;


let betrag =
Number(
document.getElementById("rueckBetrag").value
);


if(!betrag){

alert("Bitte Betrag eingeben");

return;

}


// automatische Gegenseite

let an;


if(von==="Carola"){

an="Janine";

}
else{

an="Carola";

}



await addDoc(
collection(db,"ausgaben"),
{

typ:"rueckzahlung",

bezahltVon:von,

empfaenger:an,

betrag:betrag,

beschreibung:"Rückzahlung",

datum:new Date()

}

);


document.getElementById("rueckBetrag").value="";


laden();


};
