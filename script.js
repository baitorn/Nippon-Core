let date = new Date();
let selectedDay = null;

// 🔥 chargement localStorage
let events = JSON.parse(localStorage.getItem("events")) || {};

function saveToStorage(){
localStorage.setItem("events", JSON.stringify(events));
}

function renderCalendar(){

const calendar = document.getElementById("calendar");
const title = document.getElementById("monthTitle");

calendar.innerHTML = "";

let year = date.getFullYear();
let month = date.getMonth();

let firstDay = new Date(year, month, 1).getDay();
let daysInMonth = new Date(year, month + 1, 0).getDate();

let months = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];

title.innerText = months[month] + " " + year;

// espaces
for(let i=0;i<firstDay;i++){
calendar.innerHTML += `<div></div>`;
}

// jours
for(let d=1; d<=daysInMonth; d++){

let key = `${year}-${month}-${d}`;
let eventText = events[key] ? `<br><small>📌 ${events[key]}</small>` : "";

calendar.innerHTML += `
<div class="day" onclick="openPopup(${d})">
${d}
${eventText}
</div>
`;
}
}

function changeMonth(step){
date.setMonth(date.getMonth() + step);
renderCalendar();
}

function openPopup(day){
selectedDay = day;
document.getElementById("popup").style.display = "flex";

// si événement existe → remplir input
let key = `${date.getFullYear()}-${date.getMonth()}-${day}`;
document.getElementById("eventText").value = events[key] || "";
}

function closePopup(){
document.getElementById("popup").style.display = "none";
}

function saveEvent(){
let text = document.getElementById("eventText").value;
let key = `${date.getFullYear()}-${date.getMonth()}-${selectedDay}`;

if(text){
events[key] = text; // ✏️ modifier ou ajouter
} else {
delete events[key]; // 🗑 si vide = supprimer
}

saveToStorage();
closePopup();
renderCalendar();
}

function deleteEvent(){
let key = `${date.getFullYear()}-${date.getMonth()}-${selectedDay}`;

delete events[key];
saveToStorage();

document.getElementById("eventText").value = "";
closePopup();
renderCalendar();
}

renderCalendar();
