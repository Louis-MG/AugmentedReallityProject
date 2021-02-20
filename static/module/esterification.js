// if the following local function is set to more global, the water appears complete at the start and not the other objects

export const data = {
    name: "Esterification",
    title: "Esterification",
    description: "Condensation of two chains R and R' linked by the carboxylic acid of R reacting with an alcohol on R'.",
    image : "<img src = '/static/assets/ester.png' sstyle='width: 43%;position: relative; top:128px; left:8px'></img>"
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
    var esterification  = 0 ;

    document.getElementById("thescene").object3D.updateMatrixWorld(); // select the scene by id in the html, the attribute object3D and the function updateMatrixWorld
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(alcohol.object3D.matrixWorld); // sets posiiton of the alcohol
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(carboxy.object3D.matrixWorld); // sets position of the carboxy (fatty acid obj)
    distCarboxyAlco = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) ; // calculate the distance between the two molecules 
    document.getElementById("infop").innerHTML="<p>" + distCarboxyAlco + "</p>" ; // shows distance


    if (distCarboxyAlco > 2 && esterification < 1) { //if distance is too big and the reaction did not happened yet
        carboxy.setAttribute('visible', true)   // shows the carboxy
        alcohol.setAttribute('visible', true)   // shows the alcohol
        ester.setAttribute('visible', false)    // hides the ester
        residue.setAttribute('visible', false)  //hides the residue
    }

    else if (distCarboxyAlco < 2 && esterification < 1) { //if the distance is inferior to the threshold and the reaction did not happened yet
        carboxy.setAttribute('visible', false)  // hide the substrates
        alcohol.setAttribute('visible', false)
        ester.setAttribute('visible', true)     // shows the products
        residue.setAttribute('visible', true)
        esterification = 1                      // sets reaction indicator to "happened"
    }

    // now if the marker if the carboxy disappears after the reaction the others stay visible:

    if (esterification = 1 && document.querySelector("carboxy").object3D.visible == false) {
        ester.setAttribute('visible', false)
        carboxy.setAttribute('visible', false) // the carboxy and ester are on the same marker, and the carboxy was used
        alcohol.setAttribute('visible', false) // alcohol was used
        residue.setAttribute('visible', true)  // only the residue remains visible
    }

    // if the alcohol marker disappears the residue does so:  
    if (esterification = 1 && document.querySelector("#lysmarker").object3D.visible== false) {
        residue.setAttribute('visible', false)       
        alcohol.setAttribute('visible', false)
    }

    // if the marker supporting the ester isnt visible anymore then set the molecule to not visible:

    if (esterification = 1 && document.querySelector("#promarker").object3D.visible== false) {
        ester.setAttribute('visible', false)
        carboxy.setAttribute('visible', false)
        esterification = 0 
    }

}

function createScaffold(divRoot) {
    divRoot.innerHTML += `

    <a-scene embedded artoolkit='patternRatio: 500; sourceType: webcam;' id="thescene">

        <a-assets> <!-- assets must be a child of scene -->
            <a-asset-item id="carboxy_obj" src="../static/assets/fatty_acid.obj"></a-asset-item>
            <a-asset-item id="carboxy_mtl" src="../static/assets/fatty_acid.mtl"></a-asset-item>
        </a-assets>
        
        <a-assets> 
            <a-asset-item id="alcohol_obj" src="../static/assets/alcohol.obj"></a-asset-item>
            <a-asset-item id="alcohol_mtl" src="../static/assets/alcohol.mtl"></a-asset-item>
        </a-assets>

        <a-assets> <!-- product 1 -->
            <a-asset-item id="ester_obj" src="../static/assets/ester.obj"></a-asset-item>
            <a-asset-item id="ester_mtl" src="../static/assets/ester.mtl"></a-asset-item>
        </a-assets>

        <a-assets> <!-- product 2 aka residue -->
            <a-asset-item id="residue_obj" src="../static/assets/hoh.obj"></a-asset-item>
            <a-asset-item id="residue_mtl" src="../static/assets/hoh.mtl"></a-asset-item>
        </a-assets>

        <a-marker preset='hiro' id="lysmarker">
            <a-obj-model id = "alcohol" src = "#alcohol_obj" mtl = "#alcohol_mtl" visible = "false" scale = "23 23 23"></a-obj-model> 
            <a-obj-model id = "residue" src = "#residue_obj" mtl = "#residue_mtl" visible = "false" scale = "23 23 23"></a-obj-model>
        </a-marker>


        <a-marker preset  = "kanji" id = "promarker">
            <a-obj-model id = "carboxy" src = "#carboxy_obj" mtl = "#carboxy_mtl" visible = "false" scale = "23 23 23"></a-obj-model>  
            <a-obj-model id = "ester" src = "#ester_obj" mtl = "#ester_mtl" visible = "false" scale = "23 23 23"></a-obj-model>  
        </a-marker>

        <a-entity camera></a-entity>

    </a-scene>
    ` ;
}

