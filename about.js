var txt1 = `Eliott Enrique Mendoza Wildmon`
var skipFrames2 = 180;
var skipping2 = ' '.repeat(skipFrames2);
var txt2 = ``
var txt3 = ``
var speed1 = 70;
var speed2 = 0;
var speed3 = 100;
var i = 0;
var j = 0;
var k = 0;
let result = txt2.fontcolor("red");

function typeWriter1() {
    if (i < txt1.length) {
        document.getElementById("typing1").innerHTML += txt1.charAt(i);
        i++;
        setTimeout(typeWriter1, speed1);
    }
}

function typeWriter2() {
    if (j < txt2.length) {
        if (txt2.charAt(j) == '<' && txt2.charAt(j + 1) == 'b' && txt2.charAt(j + 2) == 'r' && txt2.charAt(j + 3) == '>'){
            document.getElementById("typing2").innerHTML += "<br/>";
            j = j + 5;
        }
        else if (txt2.charAt(j) == '<' && txt2.charAt(j + 1) == '1' && txt2.charAt(j + 2) == 'b' && txt2.charAt(j + 3) == 'o' && txt2.charAt(j + 4) == 'l' && txt2.charAt(j + 5) == 'd' && txt2.charAt(j + 6) == '>'){
            document.getElementById("typing2").innerHTML += "<b style='color:rgb(255, 116, 116)'>" +
            "Berklee College of Music"
            + "<b/>";
            j = j + 7;
        }
        else if (txt2.charAt(j) == '<' && txt2.charAt(j + 1) == '2' && txt2.charAt(j + 2) == 'b' && txt2.charAt(j + 3) == 'o' && txt2.charAt(j + 4) == 'l' && txt2.charAt(j + 5) == 'd' && txt2.charAt(j + 6) == '>'){
            document.getElementById("typing2").innerHTML += "<b style='color:rgb(222,184,135)'>" +
            "Bachelor of Music"
            + "<b/>";
            j = j + 7;
        }
        else if (txt2.charAt(j) == '<' && txt2.charAt(j + 1) == '3' && txt2.charAt(j + 2) == 'b' && txt2.charAt(j + 3) == 'o' && txt2.charAt(j + 4) == 'l' && txt2.charAt(j + 5) == 'd' && txt2.charAt(j + 6) == '>'){
            document.getElementById("typing2").innerHTML += "<b style='color:rgb(165, 171, 255)'>" +
            "Electronic Production & Design"
            + "<b/>";
            j = j + 7;
        }
        else if (txt2.charAt(j) == '<' && txt2.charAt(j + 1) == '4' && txt2.charAt(j + 2) == 'b' && txt2.charAt(j + 3) == 'o' && txt2.charAt(j + 4) == 'l' && txt2.charAt(j + 5) == 'd' && txt2.charAt(j + 6) == '>'){
            document.getElementById("typing2").innerHTML += "<b style='color:rgb(222,184,135)'>" +
            "Minor"
            + "<b/>";
            j = j + 7;
        }
        else if (txt2.charAt(j) == '<' && txt2.charAt(j + 1) == '5' && txt2.charAt(j + 2) == 'b' && txt2.charAt(j + 3) == 'o' && txt2.charAt(j + 4) == 'l' && txt2.charAt(j + 5) == 'd' && txt2.charAt(j + 6) == '>'){
            document.getElementById("typing2").innerHTML += "<b style='color:rgb(165, 171, 255)'>" +
            "Acoustics & Electronics"
            + "<b/>";
            j = j + 7;
        }
        else if (txt2.charAt(j) == '<' && txt2.charAt(j + 1) == '6' && txt2.charAt(j + 2) == 'b' && txt2.charAt(j + 3) == 'o' && txt2.charAt(j + 4) == 'l' && txt2.charAt(j + 5) == 'd' && txt2.charAt(j + 6) == '>'){
            document.getElementById("typing2").innerHTML += "<b style='color:rgb(165, 171, 255)'>" +
            "Creative Coding"
            + "<b/>";
            j = j + 7;
        }
        else {
            document.getElementById("typing2").innerHTML += txt2.charAt(j);
            j++;
        }
    }
    setTimeout(typeWriter2, speed2);
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
