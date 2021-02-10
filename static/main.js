import * as reac_1 from "./module/h2o.js";
import * as reac_2 from "./module/peptide-link.js";
import * as reac_3 from "./module/test3.js";
import * as reac_4 from "./module/test4.js";
import * as reac_5 from "./module/test5.js";
import * as reac_6 from "./module/test6.js";

// Initialisation

const footer = document.getElementsByClassName('footer')[0];
const moleculeBackground = document.getElementById("bgvid");
const container1 = document.getElementsByClassName('container1')[0];
const bigTitle = document.getElementsByClassName("bigTitle")[0];
const reaction = document.getElementById('reaction');
const documentation = document.getElementById('docu');

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
    footer.style.display= 'none';
    moleculeBackground.style.display = 'none';
}

const buttonA = document.getElementById('buttonA');

function showReactionPage(){
    console.log("showing reaction page...");
    killRunningReaction();
    container1.style.display = 'block';
    footer.style.display = 'block';
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