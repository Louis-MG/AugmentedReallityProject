// if the following local function is set to more global, the water appears complete at the start and not the other objects

export const data = {
    name: "Esterification",
    title: "Esterification",
    description: "Condensation of two chains R and R' linked by the carboxylic acid of R reacting with an alcohol on R'.",
    image : "<img src = '/static/assets/ester.png' style='width: 43%;position: relative; top:128px; left:8px'>"
}


export function load (divRoot){
    //create <a-scene> scaffold
    createScaffold(divRoot);
    //reaction
    window.currentReaction = setInterval(Reaction, 200);
}

function Reaction() { 
    const scene = document.getElementById("thescene");
    const carboxy = document.getElementById("carboxy");
    const alcohol = document.getElementById("alcohol");
    const residue = document.getElementById("residue");
    const ester = document.getElementById("ester");
    const divInfop = document.getElementById("infop");

    scene.object3D.updateMatrixWorld(); // select the scene by id in the html, the attribute object3D and the function updateMatrixWorld
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(alcohol.object3D.matrixWorld); // sets posiiton of the alcohol
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(carboxy.object3D.matrixWorld); // sets position of the carboxy (fatty acid obj)
    let distCarboxyAlco = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) ; // calculate the distance between the two molecules 
    divInfop.innerHTML="<p>" + distCarboxyAlco + "</p>" ; // shows distance


    if (distCarboxyAlco > 2 ) { //if distance is too big and the reaction did not happened yet
        if (document.querySelector("#hiroMarkerSelector").object3D.visible === true){
            alcohol.setAttribute('visible',true)
          }
          if (document.querySelector("#kanjiMarkerSelector").object3D.visible === true){
            carboxy.setAttribute('visible',true)
          }
          if (document.querySelector("#letterAMarkerSelector").object3D.visible === true){
            residue.setAttribute('visible',false)
          } 
          if (document.querySelector("#letterBMarkerSelector").object3D.visible === true){
            ester.setAttribute('visible',false)
          }
    }

    else if (distCarboxyAlco < 2 ) { //if the distance is inferior to the threshold and the reaction did not happened yet
        if (document.querySelector("#hiroMarkerSelector").object3D.visible === true){
            alcohol.setAttribute('visible',false)
        }
        if (document.querySelector("#kanjiMarkerSelector").object3D.visible === true){
            carboxy.setAttribute('visible',false)
        }
        if (document.querySelector("#letterAMarkerSelector").object3D.visible === false){
            residue.setAttribute('visible',true)
        } 
        if (document.querySelector("#letterBMarkerSelector").object3D.visible === false){
            ester.setAttribute('visible',true)
        }
    }

}

function createScaffold(divRoot) {
    divRoot.innerHTML += `

    <div class="mainText">
        <p id="info"><b>Move the markers closer to witness the esterification !</b></p>
        <p id="infop"></p>
    </div>

    <a-scene id="thescene" embedded = "" artoolkit='patternRatio: 500; sourceType: webcam;'>

        <a-assets> <!-- assets must be a child of scene -->
            <a-asset-item id="carboxy_obj" src="../static/assets/fatty_acid.obj"></a-asset-item>
            <a-asset-item id="carboxy_mtl" src="../static/assets/fatty_acid.mtl"></a-asset-item>
            <a-asset-item id="alcohol_obj" src="../static/assets/alcohol.obj"></a-asset-item>
            <a-asset-item id="alcohol_mtl" src="../static/assets/alcohol.mtl"></a-asset-item>
            <a-asset-item id="ester_obj" src="../static/assets/ester.obj"></a-asset-item>
            <a-asset-item id="ester_mtl" src="../static/assets/ester.mtl"></a-asset-item>
            <a-asset-item id="residue_obj" src="../static/assets/hoh.obj"></a-asset-item>
            <a-asset-item id="residue_mtl" src="../static/assets/hoh.mtl"></a-asset-item>
        </a-assets>

        <a-marker preset='hiro' id="hiroMarkerSelector">
            <a-obj-model id = "alcohol" src = "#alcohol_obj" mtl = "#alcohol_mtl" visible = "false" scale = "2 2 2"></a-obj-model> 
        </a-marker>

        <a-marker preset  = "kanji" id = "kanjiMarkerSelector">
            <a-obj-model id = "carboxy" src = "#carboxy_obj" mtl = "#carboxy_mtl" visible = "false" scale = "2 2 2"></a-obj-model>  
        </a-marker>

        <a-marker preset = 'letterA' id = "letterAMarkerSelector">
            <a-obj-model id = "residue" src = "#residue_obj" mtl = "#residue_mtl" visible = "false" scale = "2 2 2"></a-obj-model>
        </a-marker>

        <a-marker preset = 'letterB' id = "letterBMarkerSelector">
            <a-obj-model id = "ester" src = "#ester_obj" mtl = "#ester_mtl" visible = "false" scale = "2 2 2"></a-obj-model>  
        </a-marker>

        <a-entity camera></a-entity>

    </a-scene>
    ` 
}

