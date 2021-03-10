import * as reac_1 from "./module/h2o.js";
import * as reac_2 from "./module/peptide-link.js";
import * as reac_3 from "./module/Saponification.js";
import * as reac_4 from "./module/esterification.js";

// Initialisation

//const footer = document.getElementsByClassName('footer')[0];
const moleculeBackground = document.getElementById("bgvid");
const container1 = document.getElementById('container1');
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
    let scaffold = '';
    let i = 1; // reactions counter
    do { // reaction div crafting
        scaffold += `
        <div class="col s12 m4 l3 xl2" style="padding-top: 40px">
            <div id="box${i}" style="position: relative;left: 50%;transform: translate(-50%, 0);background-color: white;box-shadow: rgba(0, 0, 0, 0.3) 0 0 20px;border-collapse: collapse;border-radius: 20px;width: 350px;height: 230px">
                <div class="mediumTitle">${eval('reac_' + String(i) + ".data['name'];")}</div>
                <div class="descriptionText">${eval('reac_' + String(i) + ".data['description'];")}</div>
                <button type="button" class="buttonD" id="button${i}">
                    <i class="small material-icons">arrow_forward</i>
                </button>
                ${eval('reac_' + String(i) + ".data['image'];")}
            </div>
        </div>
        `;
        scaffold + '\n';
        i++;
    }
    while (eval('typeof reac_'+String(i)+';') !== 'undefined');

    container1.innerHTML = scaffold;
    console.log(scaffold);
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
    bigTitle.style.display = 'block';
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