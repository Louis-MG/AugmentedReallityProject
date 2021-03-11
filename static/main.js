const footer = document.getElementsByClassName('footer')[0];
const moleculeBackground = document.getElementById("bgvid");
const container1 = document.getElementsByClassName('container1')[0];
const bigTitle = document.getElementsByClassName("bigTitle")[0];
const divReaction = document.getElementById('reaction');
const documentation = document.getElementById('docu');

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
            break;
        };
        moduleNumber++;
    };
    return moduleArray;
};

//create buttons for every module
function collection() {
    let height = 600; // reactions container height in pixel
    let top = 0; // box y position in pixel
    let previousPosition = 0; // 0:Start, 1:66%R, 2:Mid, 3:66%L  position of the previous box
    let scaffold = '';
    let positionAttr = 'right: 66%';
    let transformAttr = ';';
    let index = 0;
    for (let reactionModule of moduleArray) {
        scaffold += `
        <div id="box${index}" style="${positionAttr};top:${top}px;position: fixed;background-color: white;box-shadow: rgba(0, 0, 0, 0.3) 0 0 20px;border-collapse: collapse;border-radius: 20px;width: 350px;height: 230px${transformAttr}">
            <div class="mediumTitle">${reactionModule.data['name']}</div>
            <div class="descriptionText">${reactionModule.data['description']}</div>
            <button type="button" class="buttonD" id="button${index}">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-right-short" viewBox="1 0 16 16">
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
            </button>
            ${reactionModule.data['image']}
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
            };
        };
        index++;
    };    
    container1.innerHTML = scaffold;
    index--;
    while (index > -1) {
        eval('const button'+index+" = document.getElementById('button"+index+"')");
        eval('button'+index+".addEventListener('click', loadReaction, false);");
        eval('button'+index+'.param='+index+';')
        index--;
    }
};
 
function loadReaction(evt){
    let nbReaction = evt.currentTarget.param;
    let moduleReaction = moduleArray[nbReaction]
    console.log('loading '+moduleReaction.data['title']+' reaction...');
    hideReactionPage();
    bigTitle.innerHTML = moduleReaction.data['name'];
    camera(true);
    load(divReaction, nbReaction);
}

function hideReactionPage(){
    console.log("hiding reaction page...");
    container1.style.display = 'none';
    footer.style.display= 'none';
    moleculeBackground.style.display = 'none';
}

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

function load (divRoot, nbReaction){
    //create <a-scene> scaffold
    createScaffold(divRoot, nbReaction);
    //reaction
    window.currentReaction = Reaction(nbReaction);
}

function killRunningReaction() {
    if (typeof window.currentReaction !== 'undefined') { // if some reaction is already running
        console.log("killing the previous reaction...")
        clearInterval(window.currentReaction) // kill it !
    }
}

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

const buttonA = document.getElementById('buttonA');
buttonA.addEventListener('click', showReactionPage);

// create the a-frame scene
function createScaffold(divRoot, nbReaction) {
    let moduleReaction = moduleArray[nbReaction];
    divRoot.innerHTML += `
    <!-- reaction information -->
    <div class="mainText">
        <p id="info"><b>${moduleReaction.data['description']}</b></p>
    </div>

    <!-- a-frame scene reaction -->
    <a-scene id="theScene" embedded = "" artoolkit='patternRatio: 500; sourceType: webcam;' inspector = "" keyboard-shortcuts = "" screenshot = "">

    </a-scene>
  `

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

    if ( sizeReagents == 2 && sizeProducts == 2 && sizeConditions == 0) {  //bimolecular reaction
        scaffoldType1(aFrameScene, table);
    }else if (sizeReagents == 3 && sizeProducts == 1 && sizeConditions == 0) { //ex. water formation
        scaffoldType2(aFrameScene, table);
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
        
        if ( sizeReagents == 2 && sizeProducts == 2 && sizeConditions == 0 ) {
            reactionType1(table);         
        }else if (sizeReagents == 3 && sizeProducts == 1 && sizeConditions == 0) {
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
                    <a-marker preset = '${marker}' id = "${marker}MarkerSelector" material="" arjs-anchor="" arjs-hit-testing=""> 
                        <a-obj-model id = "${object}" src = "#obj-${table[element][object][0]}" mtl = "#mtl-${table[element][object][1]}" visible = "false"></a-obj-model>
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

function scaffoldType2 (aFrameScene, table) {
    for (let element in table){
        for (let object in table[element]) {        //create a specified div for every reagent, product and condition
            let marker = (table[element][object][2]);
            if (element == 'reagents'){
                aFrameScene.innerHTML += `
                <a-marker preset = '${marker}' id = "${marker}MarkerSelector" material="" arjs-anchor="" arjs-hit-testing=""> 
                    <a-obj-model id = "${object}" src = "#obj-${table[element][object][0]}" mtl = "#mtl-${table[element][object][1]}" visible = "false"></a-obj-model>
                </a-marker>
                `    
            } else if (element == 'products'){
                let markerNode = document.getElementById(marker+"MarkerSelector");
                markerNode.innerHTML += `
                    <a-obj-model id = "${object}" src = "#obj-${table[element][object][0]}" mtl = "#mtl-${table[element][object][1]}" visible = "false"></a-obj-model>
                `
            }
        }
    }
}