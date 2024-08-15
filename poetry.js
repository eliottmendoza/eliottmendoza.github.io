var i = 0;
var j = 0;
var k = 0;
var l = 0;
var max = 6;
var min = 0;
var initPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var pPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var oPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var ePAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var tPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var rPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var yPAUSE = '_'.repeat(Math.floor(Math.random() * (max - min + 1)) + min);
var txt1 = `${initPAUSE}p${pPAUSE}o${oPAUSE}e${ePAUSE}t${tPAUSE}r${rPAUSE}y${yPAUSE}`;
var skipFrames1 = 20;
var skipping1 = ' '.repeat(skipFrames1);
var txt2 =`${skipping1}ask me for a poem & you'll have one coming soooooon`;
var txt3 = '';
var speed1 = 70;
var speed2 = 100;
var speed3 = 100;

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

typeWriter1();
typeWriter2();
typeWriter3();
