import { H2O } from "./module/h2o.js";
import { peptideLink } from "./module/peptide-link.js";



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
    for (let element of document.querySelectorAll('.container1')) element.style.display = 'none';
    document.getElementsByClassName('footer')[0].style.display= 'none';
    document.getElementById("bgvid").style.display = 'none';
}

const button2 = document.getElementById('button2');

function showReactionPage(){
    console.log("showing reaction page...");
    killRunningReaction();
    for (let element of document.querySelectorAll('.container1')) element.style.display = 'block';
    document.getElementsByClassName('footer')[0].style.display= 'block';
    document.getElementsByClassName("bigTitle")[0].innerHTML = "Choose a reaction";
    document.getElementById("bgvid").style.display = 'block';
    camera(false);
    document.getElementById('reaction').innerHTML = `
    <div id="child"></div>
    `;
}

button2.addEventListener('click', showReactionPage);

const button = document.getElementById('button1');

function loadH2O(){
    console.log("loading reaction...");
    hideReactionPage();
    document.getElementsByClassName("bigTitle")[0].innerHTML = "H2O formation";
    document.getElementById('reaction').innerHTML = `
    
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

function loadPeptideLink(){
    console.log("loading reaction...");
    hideReactionPage();
    document.getElementsByClassName("bigTitle")[0].innerHTML = "peptide bond formation";
    camera(true);
    peptideLink(document.getElementById('reaction'));
}

button3.addEventListener('click', loadPeptideLink);