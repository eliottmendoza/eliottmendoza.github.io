var txt1 = `the name's eliott:`
var skipFrames2 = 120;
var skipping2 = ' '.repeat(skipFrames2);
var txt2 =
`${skipping2}
AKA magú,
 <br>
AKA e.e. mendoza:
 <br>
 <br>
a sound designer & engineer,
 <br>
a music producer & composer & instrumentalist,
 <br>
a poet & interdisciplinary artist,
 <br>
a programmer, a studio technician,
 <br>
a curious creature nurturing chaos and noise to sound willfully simple—
 <br>
 <br>
there’s not a MHz the radio’s tuned into that don’t turn the particles around rhythmically (doubt that’ll change any time soon)—
 <br>
 <br>
there are beats and melodies, rhymes and reasons, soundscapes and ear scrapers in this stash to get started on answering any questions that start with WH—
 <br>
 <br>
listening is essential to the artistic process—
 <br>
creativity lives in the center of the uncontrollable—`
var txt3 = ``
var speed1 = 70;
var speed2 = 10;
var speed3 = 100;
var i = 0;
var j = 0;
var k = 0;

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
        if (txt2.charAt(j) == ' ' && txt2.charAt(j + 1) == '<' && txt2.charAt(j + 2) == 'b' && txt2.charAt(j + 3) == 'r' && txt2.charAt(j + 4) == '>'){
            document.getElementById("typing2").innerHTML += "<br/>";
            j = j + 5;
        }
        else {
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
