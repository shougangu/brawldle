function tdarkmode(){
    /**
      Darkmode represents the current colour scheme (0 being white). Function is used to invert the colour scheme of the website. 
     */
    if(darkmode == "0"){
        darkmode = "1";
        console.log("darkmode on");
        document.getElementById("linkdaily").href = "daily.html?dm=1";
        document.getElementById("linknormal").href = "index.html?dm=1";
        document.getElementById("linkhard").href = "hard.html?dm=1";
        document.getElementById("linktimed").href = "timed.html?dm=1";

        document.getElementById("bgvideo").style.filter = "brightness(50%)";
        document.getElementById("endscreen").style.color = "white";
        //document.getElementById("back").style.color = "black";
        document.getElementById("endscreen").style.backgroundColor = "black";
        document.getElementById("endscreen").style.borderColor = "white";
        var x = document.getElementsByClassName("tdtop");
        for(var i = 0; i < x.length; i++){
            x[i].style.color = "white";
            x[i].style.borderColor = "white";
        }
    }
    else{
        darkmode = "0";
        console.log("darkmode off");
        document.getElementById("linkdaily").href = "daily.html?dm=0";
        document.getElementById("linknormal").href = "index.html?dm=0";
        document.getElementById("linkhard").href = "hard.html?dm=0";
        document.getElementById("linktimed").href = "timed.html?dm=0";
        document.getElementById("bgvideo").style.filter = "brightness(100%)";
        document.getElementById("endscreen").style.color = "black";
        //document.getElementById("back").style.color = "white";
        document.getElementById("endscreen").style.backgroundColor = "white";
        document.getElementById("endscreen").style.borderColor = "black";
        var x = document.getElementsByClassName("tdtop");
        for(var i = 0; i < x.length; i++){
            x[i].style.color = "black";
            x[i].style.borderColor = "black";
        }
    }
    localStorage.setItem("darkmode", darkmode);
}

function hidemenu(){
    menuHid = localStorage.getItem("menuHid");
    if(menuHid == 'false'){
        console.log(1)
        menuHid = true
        document.getElementById("top").style.height = "3.5vh";
        document.getElementById("logoarr").style.rotate = "180deg";
        var x = document.getElementsByClassName("logobutton");
        for(var i = 0; i < x.length; i++){
            x[i].style.height = "2.5vh";
            x[i].style.marginBottom = "1vh";
        }
        x = document.getElementsByClassName("links");
        for(var i = 0; i < x.length; i++){
            x[i].style.fontSize = "0vh";
        }
        document.getElementById("navmain").style.bottom = "1.5vh";
        document.getElementById("navmain").style.height = "0vh";
    }
    else{
        console.log(2)
        menuHid = false
        document.getElementById("top").style.height = "7vh";
        document.getElementById("logoarr").style.rotate = "0deg";
        var x = document.getElementsByClassName("logobutton");
        for(var i = 0; i < x.length; i++){
            x[i].style.height = "3vh";
            x[i].style.marginBottom = "2vh";
        }
        x = document.getElementsByClassName("links");
        for(var i = 0; i < x.length; i++){
            x[i].style.fontSize = "1.8vh";
        }
        document.getElementById("navmain").style.bottom = "0vh";
        document.getElementById("navmain").style.height = "2vh";
    }

    localStorage.setItem("menuHid", menuHid);

}


function checkSize(){
    /**
      Function is used to check the size of the screen and adjust the keyboard accordingly. 
     */
    const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    var screenRatio = width / height;    
    
    if(screenRatio > 0.75){
        document.getElementById("keyboardTop").style.display = "none";
        document.getElementById("keyboard1").style.display = "none";
        document.getElementById("keyboard2").style.display = "none";
        document.getElementById("keyboard3").style.display = "none";
        document.getElementById("keyboard4").style.display = "none";
        document.getElementById("input").readOnly = false;
    }
    else{
        document.getElementById("keyboardTop").style.opacity = "100%";
        document.getElementById("keyboard1").style.opacity = "100%";
        document.getElementById("keyboard2").style.opacity = "100%";
        document.getElementById("keyboard3").style.opacity = "100%";
        document.getElementById("keyboard4").style.opacity = "100%";
        document.getElementById("input").readOnly = true;
    }
}

function animate_endscreen(brawlerName){
    var shadow = document.getElementById("shadow");
    var endscreen =  document.getElementById("endscreen");
    shadow.style.display = "inherit";
    endscreen.style.display = "inherit";

    document.getElementById("endscreen-img").src = "images/" + brawlerName + ".png";

    animateCSS(shadow, "fadeIn", "2s");
    animateCSS(endscreen, "fadeInDown", "2s");
}

function animateCSS(element, animation, delay, prefix = 'animate__'){
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = element
        node.style.setProperty('animation-delay', delay);
        node.style.setProperty('--animate-duration', '0.5s');
        
        node.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
})}



function toggleKeyboard(){
    if(keyboard){
        document.getElementById("keyboard1").style.display = "none";
        document.getElementById("keyboard2").style.display = "none";
        document.getElementById("keyboard3").style.display = "none";
        document.getElementById("keyboard4").style.display = "none";
        document.getElementById("toggleKeyboard").innerHTML = "+";
        document.getElementById("keyboardTop").style.bottom = "0px";                    
    }
    else{
        document.getElementById("keyboard1").style.display = "grid";
        document.getElementById("keyboard2").style.display = "grid";
        document.getElementById("keyboard3").style.display = "grid";
        document.getElementById("keyboard4").style.display = "grid";
        document.getElementById("toggleKeyboard").innerHTML = "-";
        document.getElementById("keyboardTop").style.bottom = "36vh";
    }
    keyboard = !keyboard;
}

function autocomplete(bName){
    var input = document.getElementById("input");
    input.value = bName;
}

function updateSuggestions(){
    var input = document.getElementById("input");
    var sList = document.getElementById("brawlerSuggestion");

    sList.innerHTML = "";
    for(var i=0; i<=brawlers.length-1; i++){
        if(brawlers[i].name.toLowerCase().includes(input.value.toLowerCase())){
            var bNameFix = '"'+brawlers[i].name+'"';
            sList.innerHTML += "<img src='"+ brawlers[i].name +".png' class='sBrawler' onclick='autocomplete("+ bNameFix +")'>";
        }
    }
}

function kbPress(character, shouldUpdateBrawler = true){
    var input = document.getElementById("input");
    input.value += character;
    if (shouldUpdateBrawler){
    updateSuggestions();
    }
}

function kbBack(shouldUpdateBrawler = true){
    var input = document.getElementById("input");
    input.value = input.value.slice(0, -1); 
    if (shouldUpdateBrawler){
    updateSuggestions();}
}
function autocorrect(guess_text){
    if(guess_text == "rt" || guess_text == "r t")
        guess_text = "r-t";
    if(guess_text == "mrp" || guess_text == "mr p" || guess_text == "mr.p")
        guess_text = "mr. p";
    if(guess_text == "8bit" || guess_text == "8 bit")
        guess_text = "8-bit";
    if(guess_text == "larry" || guess_text == "lawrie" || guess_text == "larry lawrie" || guess_text == "larry&lawrie")
        guess_text = "larry & lawrie";
    return guess_text;
}