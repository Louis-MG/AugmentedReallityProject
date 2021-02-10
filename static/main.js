import { H2O } from "./module/h2o.js";
import { peptideLink } from "./module/peptide-link.js";

const footer = document.getElementsByClassName('footer')[0];
const moleculeBackground = document.getElementById("bgvid");
const container1 = document.getElementsByClassName('container1')[0];
const bigTitle = document.getElementsByClassName("bigTitle")[0];
const reaction = document.getElementById('reaction');
const documentation_ar = document.getElementById('docu_ar');
const documentation_reac = document.getElementById('docu_reac');


/*
const availableReactions = [
    {'title' : "Water formation",
      'module' : H2O
    },
    {
    
    //Some other reaction
    
    }
    ]
*/
/* Where, MODULE-API
 - create(DivDOMELEMENT) => void
*/

// ########################################

/*
interface descriptionType {
    'title'    : string,
    'longText' : string,
    'imgPath'  : string,
    'create'  : (DivDOMELEMENT)=>void
}

const availableReactions_type2: descriptionType[] = [
    H20.getDescription(),
    peptideLink.getDescription(),
    //Some other reaction
    ]
*/

/* Where, MODULE-API
 - getDescription() => descriptionType
 - create(DivDOMELEMENT) => void
*/

function hideShow (elements, action) {
    // action can be none, block, hidden or visible
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = action;
    }
}

function camera(load){
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
    footer.style.display= 'none';
    moleculeBackground.style.display = 'none';
}

const button2 = document.getElementById('button2');

function showReactionPage(){
    console.log("showing reaction page...");
    killRunningReaction();
    documentation_ar.style.display = "none" ;
    document.getElementById("menu").style.display = "block";
    container1.style.display = 'block';
    footer.style.display= 'block';
    bigTitle.innerHTML = "Choose a reaction";
    moleculeBackground.style.display = 'block';
    camera(false);
    reaction.innerHTML = `
    <div id="child"></div>
    `;
}

button2.addEventListener('click', showReactionPage);

const button = document.getElementById('button1');

function loadH2O(){
    console.log("loading reaction...");
    hideReactionPage();
    bigTitle.innerHTML = "H2O formation";
    reaction.innerHTML = `
    
    <!-- reaction information -->

    <div class="mainText">
        <p id="info"><b>Three atoms that transfer a proton: move markers around to create an H2O molecule</b></p>
        <p id="infop"></p>
    </div>

    <!-- peptide bond reaction -->

    <a-scene embedded artoolkit='patternRatio: 500; sourceType: webcam;' id="thescene">
        <!-- handle hiro marker-->
        <a-marker preset='hiro' id="lysmarker">
            <!-- This is an hydrogen atom
            All coordinates have been divided by 2, so any distance between two atoms must be multiplied by 2 to get the actual distance-->
            <a-sphere id="hyd1" position="-1.0 0 -0.3" color="white" radius="0.25" visible="true"></a-sphere>
        </a-marker>

        <a-marker preset='letterA' id="promarker">
            <!-- This is a second hydrogen atom
            All coordinates have been divided by 2, so any distance between two atoms must be multiplied by 2 to get the actual distance-->
            <a-sphere id="hyd2" position="-1.0 0 -0.3" color="white" radius="0.25" visible="true"></a-sphere>
        </a-marker>

        <!-- handle kanji marker -->
        <a-marker preset='kanji' id="glumarker">
            <!-- This is an H2O molecule with hydrogen bonds
            The deal is to create H2O and to hide or not H and bonds -->
            <a-sphere id="hoh1" position="0 0 0" color="red" radius="0.35" visible="true"></a-sphere>
            <a-sphere id="hoh2" position="0 0 -0.8" color="white" radius="0.25" visible="true"></a-sphere>
            <a-sphere id="hoh3" position="0 0 0.8" color="white" radius="0.25" visible="true"></a-sphere>
            <a-box id="l1" position="0 0 -0.3" color="grey"  lenght="0.15" width="0.15" height="0.04" visible="true"></a-box>
            <a-box id="l2" position="0 0 0.3" color="grey"  lenght="0.15" width="0.15" height="0.04" visible="true"></a-box>
        </a-marker>

        <!-- add a simple camera -->
        <a-entity camera></a-entity>
    </a-scene>
    
    `;
    camera(true);
    window.currentReaction = setInterval(function (){H2O();}, 200);
}

button.addEventListener('click', loadH2O);

const button3 = document.getElementById('button3');

function loadPeptideLink(){// LoadReaction()
    console.log("loading reaction...");
    hideReactionPage();
    bigTitle.innerHTML = "peptide bond formation";// avaiableReaction[i].title;
    camera(true);
    peptideLink(document.getElementById('reaction')); // avaiableReaction[i].module.create(document.getElementById('reaction'));
}

button3.addEventListener('click', loadPeptideLink);

// functions for Documentation

// These functions change the div displayed: there is one for each language. French is default. Last one if for the top left arrow button:

function change_to_english() {
    var x = document.getElementById("english"); //looks for the english div
    document.getElementById("french").style.display = "none"; // hides french and italian
    document.getElementById("italian").style.display = "none"
    if (x.style.display === "none") {
      x.style.display = "block"; //if not visible, changes the display to block
    } else {
      x.style.display = "block"; //if it was visible
    }
}

// other functions follow the exact same structure
// when looking for an element, careful with getElementByID and getElementsById (stupid s)

function change_to_french() {
    var x = document.getElementById("french");
    document.getElementById("english").style.display = "none";
    document.getElementById("italian").style.display = "none";
    if (x.style.display === "none") {
      x.style.display = "block" ;
    } else {
      x.style.display = "block";
    }
}

function change_to_italian() {
  var x = document.getElementById("italian");
  document.getElementById("french").style.display = "none";
  document.getElementById("english").style.display = "none";
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "block";
  }
}

// gotta change that for a display change:

function goHome() {
    window.location.href = "home.html"; // sends the user back to the home menu
}

function goDocu_ar() {
    var x = documentation_ar;
    document.getElementById("menu").style.display = "none";
    document.getElementById("container1").style.display = "none";
    document.getElementById("reaction").style.display = "none";
    documentation_reac.style.display = "none"
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "block"
    }
}

const button4 = document.getElementById('button4');
button4.addEventListener('click', goDocu_ar);

function goDocu_reac() {
    var x = documentation_reac;
    document.getElementById("menu").style.display = "none";
    document.getElementById("container1").style.display = "none";
    document.getElementById("reaction").style.display = "none";
    documentation_ar.style.display = "none"
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "block"
    }
}

const button5 = document.getElementById("button5");
button5.addEventListener('click', goDocu_reac)

const button_french = document.getElementById("language1")
button_french.addEventListener('click', change_to_french)

const button_english = document.getElementById("language2")
button_english.addEventListener('click', change_to_english)

const button_italian = document.getElementById("language3")
button_italian.addEventListener('click', change_to_italian)
