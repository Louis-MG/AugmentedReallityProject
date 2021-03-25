// Initialisation

const moleculeBackground = document.getElementById("bgvid");
const container1 = document.getElementById('container1');
const bigTitle = document.getElementsByClassName("bigTitle")[0];
const divReaction = document.getElementById('reaction');
const footer = document.querySelector('footer');
const documentation_ar = document.getElementById('docu_ar');
const documentation_reac = document.getElementById('docu_reac');
const languageButtons = document.getElementsByClassName('button_box')[0];
const english = document.getElementById("english");
const english1 = document.getElementById("english1");
const french = document.getElementById("french");
const french1 = document.getElementById("french1");
const italian = document.getElementById("italian");
const italian1 = document.getElementById("italian1");

let moduleArray = [];

//main asynchronous function
(async () => {
    try{
        moduleArray = await collectData();
        collection();
    }catch (err){
        console.error(err);
    }
})();

//it allows a dynamic import of modules
async function collectData() {
    let moduleNumber = 1;
    while (true){
        let moduleSpecifier = './module/reaction'+String(moduleNumber)+'/configReaction.js';
        let module;
        try {
            module = await import(moduleSpecifier);
            moduleArray.push(module);
        }catch{
            console.log('total number of module: '+String(moduleNumber - 1))
            break;
        }
        moduleNumber++;
    }
    return moduleArray;
}

function collection() { // creates the grid of reaction tiles
    let scaffold = '';
    let i = 0; // reactions counter
    for (let reactionModule of moduleArray){ // reaction div crafting
        scaffold += `
        <div class="col s12 m4 l3 xl2" style="padding-top: 40px">
            <div id="box${i}" style="position: relative;left: 50%;transform: translate(-50%, 0);background-color: white;box-shadow: rgba(0, 0, 0, 0.3) 0 0 20px;border-collapse: collapse;border-radius: 20px;width: 350px;height: 230px">
                <div class="mediumTitle">${reactionModule.data['name']}</div>
                <div class="descriptionText">${reactionModule.data['description']}</div>
                <button type="button" class="buttonD" id="button${i}">
                    <i class="small material-icons">arrow_forward</i>
                </button>
                ${reactionModule.data['image']}
            </div>
        </div>
        `;
        scaffold + '\n';
        i++;
    }
    container1.innerHTML = scaffold;
    console.log('scaffold built');
    i--;
    while (i > -1) {
        eval('const button'+i+" = document.getElementById('button"+i+"')");
        eval('button'+i+".addEventListener('click', loadReaction, false);");
        eval('button'+i+'.param='+i+';');
        i--;
    }
}

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

function hideReactionPage(){ // self explanatory
    console.log("hiding reaction page...");
    container1.style.display = 'none';
    //footer.style.display= 'none';
    moleculeBackground.style.display = 'none';
}

const buttonA = document.getElementById('buttonA');

function showReactionPage(){ // shows reaction menu: tiles, title, 
    console.log("showing reaction page...");
    killRunningReaction();
    container1.style.display = 'block';
    languageButtons.style.display = "none";
    bigTitle.style.display = 'block';
    bigTitle.innerHTML = "Choose a reaction";
    moleculeBackground.style.display = 'block';
    footer.style.marginTop = '300px';
    documentation_ar.style.display = "none";
    documentation_reac.style.display = "none";
    camera(false);
    reaction.innerHTML = `
    <div id="child"></div>
    `;
    if (document.getElementById("arjs-video") !== null) { // to force kill the video flux
        location.reload(); // only way I found is too reload the page
    }
}

buttonA.addEventListener('click', showReactionPage);

function loadReaction(evt){ //event triggered when clicking on a reaction tile from the menu
    let nbReaction = evt.currentTarget.param;
    let moduleReaction = moduleArray[nbReaction]
    console.log('loading '+moduleReaction.data['title']+' reaction...');
    footer.style.display = 'none'
    hideReactionPage();
    bigTitle.innerHTML = moduleReaction.data['name'];
    camera(true);
    load(divReaction, nbReaction);

}

function load (divRoot, nbReaction){ //injects html code for reaction display
    //create <a-scene> scaffold
    createScaffold(divRoot, nbReaction);
    //reaction
    window.currentReaction = Reaction(nbReaction);
}

// create the a-frame scene
function createScaffold(divRoot, nbReaction) {
    let moduleReaction = moduleArray[nbReaction];
    divRoot.innerHTML += `
    <!-- reaction information -->
    <div class="mainText">
        <p id="info"><b>${moduleReaction.data['description']}</b></p>
        <div id="infoImage">${moduleReaction.data['infoImage']}</div>
        <div id="b2" style="display: none">
            <button type="button" id="buttonE">
                <i class="small material-icons">arrow_forward</i>
            </button>
        </div>
    </div>

    <!-- a-frame scene reaction -->
    <a-scene id="theScene" embedded = "" artoolkit='patternRatio: 500; sourceType: webcam;' inspector = "" keyboard-shortcuts = "" screenshot = "">

    </a-scene>
  `
    console.log(moduleReaction.data['infoImage'])
    if(typeof moduleReaction.data['infoImage']!=='undefined'){ // if an 2d reac image is provided
        const buttonE = document.getElementById("buttonE"); // click to see 2D reaction infos
        buttonE.addEventListener('click', display2Dreaction)
        document.getElementById('b2').style.display = 'block'
    }
    const info = document.getElementById('info');
    info.style.display = 'block'; // bug workaround for button E

    let aFrameScene = document.getElementById('theScene');
    let table = moduleReaction.data["type"];

    for (let element in table){
        for (let object in table[element]) {        //create a specified div for every reagent, product and condition
            aFrameScene.innerHTML += `
                <a-assets>
                    <a-asset-item id = "obj-${table[element][object][0]}" src = "static/module/reaction${nbReaction+1}/${table[element][object][0]}"></a-asset-item>
                    <a-asset-item id = "mtl-${table[element][object][1]}" src = "static/module/reaction${nbReaction+1}/${table[element][object][1]}"></a-asset-item>
                </a-assets>
                `;
        }
    }

    let sizeReagents = Object.keys(table['reagents']).length;
    let sizeProducts = Object.keys(table['products']).length;
    let sizeConditions = Object.keys(table['conditions']).length;

    if ( sizeReagents === 2 && sizeProducts === 2 && sizeConditions === 0) {  //bimolecular reaction
        scaffoldType1(aFrameScene, table);
    }else if (sizeReagents === 3 && sizeProducts === 1 && sizeConditions === 0) { //ex. water formation
        scaffoldType2(aFrameScene, table);
    }
}

function display2Dreaction(){
    console.log('loading 2D reaction informations...');
    const info = document.getElementById('info');
    const infoImage = document.getElementById('infoImage');
    console.log(info.style.display)
    if(info.style.display !== 'block'){
        infoImage.style.display = 'none'; // hide 2D reaction image
        info.style.display = 'block'; // show the text
    }else{
        infoImage.style.display = 'block'; // show 2D reaction image
        info.style.display = 'none'; // hide the text
    }
}

function Reaction(nbReaction) {
    let moduleReaction = moduleArray[nbReaction]
    let table = moduleReaction.data["type"];
    let scene = document.getElementById("theScene");

    //
    let sizeReagents = Object.keys(table['reagents']).length;
    let sizeProducts = Object.keys(table['products']).length;
    let sizeConditions = Object.keys(table['conditions']).length;

    setInterval(function() {
        scene.object3D.updateMatrixWorld(); //select the scene

        if ( sizeReagents === 2 && sizeProducts === 2 && sizeConditions === 0 ) {
            reactionType1(table);
        }else if (sizeReagents === 3 && sizeProducts === 1 && sizeConditions === 0) {
            reactionType2(table);
        }
    }, 200);
}

function reactionType1 (table) { //2 reagents, 2 products, 0 conditions with only 2 markers
    let reagentOne = Object.keys(table['reagents'])[0];
    let reagentOneSelector = document.getElementById(reagentOne);
    let p1 = new THREE.Vector3(); p1.setFromMatrixPosition(reagentOneSelector.object3D.matrixWorld);

    let reagentTwo = Object.keys(table['reagents'])[1];
    let reagentTwoSelector = document.getElementById(reagentTwo);
    let p2 = new THREE.Vector3(); p2.setFromMatrixPosition(reagentTwoSelector.object3D.matrixWorld);

    let productOne = Object.keys(table['products'])[0];
    let productOneSelector = document.getElementById(productOne);

    let productTwo = Object.keys(table['products'])[1];
    let productTwoSelector = document.getElementById(productTwo);

    let distReagents = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z-p2.z,2));//distance between reagents markers

    if (distReagents > 3 ) {
        productOneSelector.setAttribute('visible',false);
        reagentOneSelector.setAttribute('visible',true);
        productTwoSelector.setAttribute('visible',false);
        reagentTwoSelector.setAttribute('visible',true);
    }else if (distReagents < 3 ) {
        productTwoSelector.setAttribute('visible',true);
        productOneSelector.setAttribute('visible',true);
        reagentOneSelector.setAttribute('visible',false);
        reagentTwoSelector.setAttribute('visible',false);
    }
}

function reactionType2 (table) {
    let reagentOne = Object.keys(table['reagents'])[0];
    let reagentOneSelector = document.getElementById(reagentOne);
    let p1 = new THREE.Vector3(); p1.setFromMatrixPosition(reagentOneSelector.object3D.matrixWorld);

    let reagentTwo = Object.keys(table['reagents'])[1];
    let reagentTwoSelector = document.getElementById(reagentTwo);
    let p2 = new THREE.Vector3(); p2.setFromMatrixPosition(reagentTwoSelector.object3D.matrixWorld);

    let reagentThree = Object.keys(table['reagents'])[2];
    let reagentThreeSelector = document.getElementById(reagentThree);
    let p3 = new THREE.Vector3(); p3.setFromMatrixPosition(reagentThreeSelector.object3D.matrixWorld);

    let productOne = Object.keys(table['products'])[0];
    let productOneSelector = document.getElementById(productOne);

    let distp1p2 = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z-p2.z,2));
    let distp2p3 = 2 * Math.sqrt( Math.pow(p2.x - p3.x, 2) + Math.pow(p2.y - p3.y, 2) + Math.pow(p2.z-p3.z,2));

    if(distp1p2 > 2 && distp2p3 > 2){
        productOneSelector.setAttribute('visible',false);
        reagentOneSelector.setAttribute('visible',true);
        reagentTwoSelector.setAttribute('visible',true);
        reagentThreeSelector.setAttribute('visible',true);
    }else if (distp1p2 < 2 && distp2p3 <2) {
        productOneSelector.setAttribute('visible',true);
        reagentOneSelector.setAttribute('visible',false);
        reagentTwoSelector.setAttribute('visible',false);
        reagentThreeSelector.setAttribute('visible',false);
    }
}

function scaffoldType1 (aFrameScene, table) {       // create scaffold for reaction with 2 reagents and 2 products with only 2 markers
    for (let element in table){
        for (let object in table[element]) {        //create a specified div for every reagent, product and condition
            let marker = (table[element][object][2]);
            let markerNode = document.getElementById(marker+"MarkerSelector")

            if (!markerNode){      // if <a-marker> doesn't exist yet
                aFrameScene.innerHTML += `
                    <a-marker type = 'pattern' url = './markers/pattern-${marker}.patt' id = "${marker}MarkerSelector" material="" arjs-anchor="" arjs-hit-testing=""> 
                        <a-obj-model id = "${object}" src = "#obj-${table[element][object][0]}" mtl = "#mtl-${table[element][object][1]}" visible = "false"></a-obj-model> <!-- ptetre remplacer par un entity vers l'objet -->
                    </a-marker>
                `
            }else{
                markerNode.innerHTML += `
                    <a-obj-model id = "${object}" src = "#obj-${table[element][object][0]}" mtl = "#mtl-${table[element][object][1]}" visible = "false"></a-obj-model>
                `
            }
        }
    }
}


function scaffoldType2 (aFrameScene, table) { // for H20 molecule...
    for (let element in table){
        for (let object in table[element]) {        //create a specified div for every reagent, product and condition
            let marker = (table[element][object][2]);
            if (element === 'reagents'){
                aFrameScene.innerHTML += `
                <a-marker type = 'pattern' url = './markers/pattern-${marker}.patt' id = "${marker}MarkerSelector" material="" arjs-anchor="" arjs-hit-testing=""> 
                    <a-obj-model id = "${object}" src = "#obj-${table[element][object][0]}" mtl = "#mtl-${table[element][object][1]}" visible = "false"></a-obj-model> <!-- ptetre remplacer par un entity vers l'objet -->
                </a-marker>
                `
            } else if (element === 'products'){
                let markerNode = document.getElementById(marker+"MarkerSelector");
                markerNode.innerHTML += `
                    <a-obj-model id = "${object}" src = "#obj-${table[element][object][0]}" mtl = "#mtl-${table[element][object][1]}" visible = "false"></a-obj-model>
                `
            }
        }
    }
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

const buttonB = document.getElementById('buttonB');

function goDocu_ar() { // displays AR documentation
    var x = documentation_ar;
    hideReactionPage();
    reaction.style.display = "none";  //hides reaction page
    bigTitle.style.display = 'none';
    killRunningReaction();
    documentation_reac.style.display = "none"; //hides the other documentation
    languageButtons.style.display = "block";
    footer.style.marginTop = '0';
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

function goDocu_reac() {  // diplays chemistry documentation
    //see goDocu_ar for comments
    var x = documentation_reac;
    hideReactionPage();
    reaction.style.display = "none";  //hides reaction page
    killRunningReaction();
    bigTitle.style.display = 'none';
    documentation_ar.style.display = "none"; //hides the other documentation
    languageButtons.style.display = "block";
    footer.style.marginTop = '0';
    if (x.style.display === "none") { 
        x.style.display = "block";
        if (english.style.display === "block") {  // conditional display of languages
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


