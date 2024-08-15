var i = 0;
var j = 0;
var k = 0;
var l = 0;
var max = 6;
var min = 0;
var initPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var vPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var iPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var dPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var ePAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var oPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var sPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var txt1 = `${initPAUSE}v${vPAUSE}i${iPAUSE}d${dPAUSE}e${ePAUSE}o${oPAUSE}s${sPAUSE}`;
var txt2 = ``;
var txt3 = '';
var txt4 = '';
var speed1 = 30;
var speed2 = 100;
var speed3 = 50;
var speed4 = 50;

function typeWriter1() {
    if (i < txt1.length) {
        document.getElementById("typing1").innerHTML += txt1.charAt(i);
        i++;
        setTimeout(typeWriter1, speed1);
    }
}

function typeWriter2() {
    if (j < txt2.length) {
        document.getElementById("typing2").innerHTML += txt2.charAt(j);
        j++;
        setTimeout(typeWriter2, speed2);
    }
}

function typeWriter3() {
    if (k < txt3.length) {
        document.getElementById("typing3").innerHTML += txt3.charAt(k);
        k++;
        setTimeout(typeWriter3, speed3);
    }
}

function typeWriter4() {
    if (l < txt4.length) {
        document.getElementById("typing4").innerHTML += txt4.charAt(l);
        l++;
        setTimeout(typeWriter4, speed4);
    }
}

typeWriter1();
typeWriter2();
typeWriter3();
typeWriter4();
