var txt1 = 'the name\'s el:';
var txt2 =
`dawg, reincarnation?_____________________________
i just woke up and i had the wild thought________
           
what if there’s an animal________________________
that remembers its past life?____________________
like every mouse knows how they were as humans___
and that’s their identity and then they become___
mouse and all the mice know “o yeah Deborah she__
was from South Africa and she died in a car______
accident she’s moved into my neighborhood________
recently!”_______________________________________
but the only humans that became mice were the____
ones who hated mice, so now they’re like “o well_
i guess it’s nice to officially meet you lil_____
homie”___________________________________________
gaahhhahaha idz dtoo much humans wouldn’t be able
to handle knowing that happens___________________
         
becoming that exact thing you hate?______________
             
oooosh how to handle that__________😵‍💫____________
____________________________________If they knew
                       
I think some people wouldn’t know how to take it
_______and maybe their life purpose would change
                   
___since they knew what would happened when they
_____________________________________________die
                 
_________________Society would be very different
       
that thing that they know would happen when they
die wouldn’t happen anymore if they didn’t hate_
mice👀lol that would be so fried u become what u
hate and the only way to escape reincarnation is
to not hate anyone or anything or to hate very__
temporary things like vape cravings and twitches
________________________________________________
            
____________That would make people think in some
sort of god though______________________________
                
____Because your purpose is to not “hate” and to
____embrace and I feel like people would want to
______know who came up with that concept and who
_________________________determines that________
        
i mean people think in a god already with the___
way the universe currently works as we__________
understand it, like why does the sun orbit the__
moon?_________________ god. ____________________
why is the earth perfect distance from the sun__
for life?_____________ god _____________________
          
________Right but the fact that reincarnation is
___determined by who hates and who doesn’t would
______maybe make atheists believe in someone who
_________determines the hate____________________
                
the hatred is determined by the person hating___
id think, _____or adjacent to that idea_________
______________________________So they would know
                   
and i guess the idea kinda implies it’s really__
really really hard not to hate anyone or________
anything or, more lightly put, find no__________
frustration or nuisance or negative pull or_____
whatever from anything__________________________
_____________________That would be hard for many
______________________Especially people in power
______________________________But sucks for them 
                           
LMAO that would piss off Putin and all them big_
gunned folks ohohoooo i think idzaa good ideaaa_
________________________________________________
Putin’s scientists go up to him and are like____
“dawg we found out that you actually become_____
everything you hate most when you die” and Putin
just scoffs and terminates him and says “mmm not
what i want to hear who is next”________________`
var txt3 =
`               
ask me for a poem & you'll have one coming soooooon`;
var skipFrames1 = 20;
var skipped1 = ' '.repeat(skipFrames1);
var speed1 = 70;
var speed2 = 35;
var speed3 = 100;
var i = 0;
var j = 0;
var k = 0;
var l = 0;

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