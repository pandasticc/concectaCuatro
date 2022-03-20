"use strict"

var i=0;
var c1 = 5, c2 = 5, c3 = 5, c4 = 5, c5 = 5, c6 = 5, c7 = 5;
const comenzar = document.getElementById("comenzar");

comenzar.addEventListener('click', function(){
    console.log("Comencemos", i);
    i++;
    document.getElementById(i).bgColor = "#ff0000";
})

const jugada1 = document.getElementById("b1");
const jugada2 = document.getElementById("b2");
const jugada3 = document.getElementById("b3");
const jugada4 = document.getElementById("b4");
const jugada5 = document.getElementById("b5");
const jugada6 = document.getElementById("b6");
const jugada7 = document.getElementById("b7");

jugada1.addEventListener('click', function(){
    document.getElementById(c1*7+0).bgColor = "blue";
    c1--;
})

jugada2.addEventListener('click', function(){
    document.getElementById(c2*7+1).bgColor = "#ff0000";
    c2--;
})
jugada3.addEventListener('click', function(){
    document.getElementById(c3*7+2).bgColor = "#ff0000";
    c3--;
})
jugada4.addEventListener('click', function(){
    document.getElementById(c4*7+3).bgColor = "#ff0000";
    c4--;
})
jugada5.addEventListener('click', function(){
    document.getElementById(c5*7+4).bgColor = "#ff0000";
    c5--;
})
jugada6.addEventListener('click', function(){
    document.getElementById(c6*7+5).bgColor = "#ff0000";
    c6--;
})
jugada7.addEventListener('click', function(){
    document.getElementById(c7*7+6).bgColor = "#ff0000";
    c7--;
})
