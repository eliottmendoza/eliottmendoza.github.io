var txt1 = 'the name\'s el:';
var txt2 =
`                           
dawg, reincarnation?_____________________________
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
_____________________________________If they knew
                       
_I think some people wouldn’t know how to take it
________and maybe their life purpose would change
                   
____since they knew what would happened when they
______________________________________________die
                 
__________________Society would be very different
       
that thing that they know would happen when they_
die wouldn’t happen anymore if they didn’t hate__
mice👀lol that would be so fried u become what u_
hate and the only way to escape reincarnation is_
to not hate anyone or anything or to hate very___
temporary things like vape cravings and twitches_
_________________________________________________
            
_____________That would make people think in some
sort of god though_______________________________
                
_____Because your purpose is to not “hate” and to
_____embrace and I feel like people would want to
_______know who came up with that concept and who
_________________________determines that_________
        
i mean people think in a god already with the____
way the universe currently works as we___________
understand it, like why does the sun orbit the___
moon?_________________ god. _____________________
why is the earth perfect distance from the sun___
for life?_____________ god ______________________
          
_________Right but the fact that reincarnation is
____determined by who hates and who doesn’t would
_______maybe make atheists believe in someone who
__________determines the hate____________________
                
the hatred is determined by the person hating____
id think________or adjacent to that idea_________
_______________________________So they would know
                   
and i guess the idea kinda implies it’s really___
really really hard not to hate anyone or_________
anything or, more lightly put, find no___________
frustration or nuisance or negative pull or______
whatever from anything___________________________
______________________That would be hard for many
_______________________Especially people in power
_______________________________But sucks for them 
                           
LMAO that would piss off Putin and all them big__
gunned folks ohohoooo i think idzaa good ideaaa__
_________________________________________________
Putin’s scientists go up to him and are like_____
“dawg we found out that you actually become______
everything you hate most when you die” and Putin_
just scoffs and terminates him and says “mmm not_
what i want to hear who is next”_________________
_______________________________________2024.05.15`
var txt3 =
`               
ask me for a poem & you'll have one coming soooooon`;
var skipFrames1 = 20;
var skipped1 = ' '.repeat(skipFrames1);
var speed1 = 70;
var speed2 = 40;
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