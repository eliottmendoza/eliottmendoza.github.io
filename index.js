var i = 0;
var j = 0;
var k = 0;
var l = 0;
var txt1 = 'the name\'s el:';
var txt2 = 'a music makin nappy intellectual gettin shit that\'s otherwise regarded as noise to sound intentional.';
var txt3 = 'ask me for a poem & you\'ll have one coming soon';
var speed1 = 50;
var speed2 = 30;
var speed3 = 50;

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