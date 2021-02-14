import * as reac_1 from "./module/h2o.js";
import * as reac_2 from "./module/peptide-link.js";
import * as reac_3 from "./module/test3.js";
import * as reac_4 from "./module/test4.js";
import * as reac_5 from "./module/test5.js";
import * as reac_6 from "./module/test6.js";

// Initialisation

//const footer = document.getElementsByClassName('footer')[0];
const moleculeBackground = document.getElementById("bgvid");
const container1 = document.getElementsByClassName('container1')[0];
const bigTitle = document.getElementsByClassName("bigTitle")[0];
const reaction = document.getElementById('reaction');
const documentation_ar = document.getElementById('docu_ar');
const documentation_reac = document.getElementById('docu_reac');
const languageButtons = document.getElementsByClassName('button_box')[0];
const english = document.getElementById("english");
const english1 = document.getElementById("english1");
const french = document.getElementById("french");
const french1 = document.getElementById("french1");
const italian = document.getElementById("italian");
const italian1 = document.getElementById("italian1");

function collection() {
    let i = 1; // reactions counter
    let height = 600; // reactions container height in pixel
    let top = 0; // box y position in pixel
    let previousPosition = 0; // 0:Start, 1:66%R, 2:Mid, 3:66%L  position de la box precedente
    let scaffold = '';
    let positionAttr = 'right: 66%';
    let transformAttr = ';';
    do{ // reaction div crafting
        scaffold += `
        <div id="box${i}" style="${positionAttr};top:${top}px;position: fixed;background-color: white;box-shadow: rgba(0, 0, 0, 0.3) 0 0 20px;border-collapse: collapse;border-radius: 20px;width: 350px;height: 230px${transformAttr}">
            <div class="mediumTitle">${eval('reac_'+String(i)+".data['name'];")}</div>
            <div class="descriptionText">${eval('reac_'+String(i)+".data['description'];")}</div>
            <button type="button" class="buttonD" id="button${i}">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-right-short" viewBox="1 0 16 16">
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
            </button>
            ${eval('reac_'+String(i)+".data['image'];")}
        </div>
        `;
        scaffold + '\n';
        if(previousPosition===3){ // next floor
            previousPosition = 1;
            positionAttr = 'right: 66%';
            transformAttr = ';';
            height += 300;
            top += 263;
            container1.style.height = `${height}px`;
        }else{ // next box position
            if(previousPosition===0){previousPosition=2}else{previousPosition++}
            if(previousPosition===2){
                positionAttr = 'left: 50%';
                transformAttr = ';transform: translate(-50%, 0);';
            }else{
                positionAttr = 'left: 66%';
                transformAttr = ';';
            }
        }
        i++; // next import...
    }
    while (eval('typeof reac_'+String(i)+';') !== 'undefined');

    container1.innerHTML = scaffold;
    console.log(scaffold);

    for(var j = 1; j<i; j++){ //click event for each button
        console.log(j);
        eval('const button'+j+"= document.getElementById('button"+j+"')");
        eval('button'+j+".addEventListener('click', loadReaction, false);");
        eval('button'+j+'.param='+j+';')
    }
}

collection();

// main functions

function camera(load){ // bug workaround script
    if (load===true){
        document.getElementById("bugWorkaround").innerHTML = `
    <script>
    // Workaround for an AR.js bug (https://github.com/jeromeetienne/AR.js/issues/410)
    const sceneEl = document.querySelector('a-scene');
    sceneEl.addEventListener('loaded', () => {
        console.log("creation camera")
        sceneEl.camera = new THREE.PerspectiveCamera();
    });
    </script>
    `
    }else{
        document.getElementById("bugWorkaround").innerHTML = `
    <div id="child"></div>
    `
    }
}

function killRunningReaction() {
    if (typeof window.currentReaction !== 'undefined') { // if some reaction is already running
        console.log("killing the previous reaction...")
        clearInterval(window.currentReaction) // kill it !
    }
}

function hideReactionPage(){
    console.log("hiding reaction page...");
    container1.style.display = 'none';
    //footer.style.display= 'none';
    moleculeBackground.style.display = 'none';
}

const buttonA = document.getElementById('buttonA');

function showReactionPage(){
    console.log("showing reaction page...");
    killRunningReaction();
    container1.style.display = 'block';
    languageButtons.style.display = "none";
    //footer.style.display = 'block';
    bigTitle.innerHTML = "Choose a reaction";
    moleculeBackground.style.display = 'block';
    camera(false);
    reaction.innerHTML = `
    <div id="child"></div>
    `;
    if (document.getElementById("arjs-video") !== null){ // if camera
        location.reload();
    }
}

buttonA.addEventListener('click', showReactionPage);

function loadReaction(evt){
    console.log(`loading ${eval('reac_'+evt.currentTarget.param+".data['name'];")} reaction...`);
    hideReactionPage();
    bigTitle.innerHTML = eval('reac_'+evt.currentTarget.param+".data['title'];");
    camera(true);
    eval('reac_'+evt.currentTarget.param+'.load(reaction);');
}



// functions for Documentation

// These functions change the div displayed: there is one for each language. French is default. Last one if for the top left arrow button:

function change_to_english() {
    // changes the language div displayed in function of the documentation the user is in
    french.style.display = "none";
    french1.style.display = "none";
    italian.style.display = "none";
    italian1.style.display = "none";
    if (documentation_ar.style.display === "block") {
        english1.style.display = "none";
        english.style.display = "block";
    } else {
        english.style.display = "none";
        english1.style.display = "block";
    }
}

function change_to_french() {
    // changes the language div displayed in function of the documentation the user is in
    english.style.display = "none";
    english1.style.display = "none";
    italian.style.display = "none";
    italian1.style.display = "none";
    if (documentation_ar.style.display === "block") {
        french1.style.display = "none";
        french.style.display = "block";
    } else {
        french.style.display = "none";
        french1.style.display = "block";
    }
}

function change_to_italian() {
    // changes the language div displayed in function of the documentation the user is in
    french.style.display = "none";
    french1.style.display = "none";
    english.style.display = "none";
    english1.style.display = "none";
    if (documentation_ar.style.display === "block") {
        italian1.style.display = "none";
        italian.style.display = "block";
    } else {
        italian.style.display = "none";
        italian1.style.display = "block";
    }
}

const button_french = document.getElementById("language1")
button_french.addEventListener('click', change_to_french)

const button_english = document.getElementById("language2")
button_english.addEventListener('click', change_to_english)

const button_italian = document.getElementById("language3")
button_italian.addEventListener('click', change_to_italian)

// gotta change that for a display change:

// function goHome() {
//     window.location.href = "home.html"; // sends the user back to the home menu
// }

const buttonB = document.getElementById('buttonB');

function goDocu_ar() {
    var x = documentation_ar;
    hideReactionPage();
    reaction.style.display = "none";  //hides reaction page
    bigTitle.style.display = 'none';
    killRunningReaction();
    documentation_reac.style.display = "none"; //hides the other documentation
    languageButtons.style.display = "block";
    if (x.style.display === "none") {
        x.style.display = "block";
        if (english1.style.display === "block") {  // conditional display of languages
            english1.style.display = "none"
            english.style.display = "block";
        } else if (french1.style.display === "block") {
            french1.style.display = "none";
            french.style.display = "block";
        } else if (italian1.style.display === "block") {
            italian1.style.display = "none";
            italian.style.display = "block";
        }
    } else {
        x.style.display = "block";
    }
}

buttonB.addEventListener('click', goDocu_ar);

function goDocu_reac() {
    //see goDocu_ar for comments
    var x = documentation_reac;
    hideReactionPage();
    reaction.style.display = "none";
    killRunningReaction();
    bigTitle.style.display = 'none';
    documentation_ar.style.display = "none";
    languageButtons.style.display = "block";
    if (x.style.display === "none") {
        x.style.display = "block";
        if (english.style.display === "block") {
            english.style.display = "none";
            english1.style.display = "block";
        } else if (french.style.display === "block") {
            french.style.display = "none";
            french1.style.display = "block";
        } else if (italian.style.display === "block") {
            italian.style.display = "none";
            italian1.style.display = "block";
        }
    } else {
        x.style.display = "block";
    }
}

const buttonC = document.getElementById("buttonC");
buttonC.addEventListener('click', goDocu_reac)