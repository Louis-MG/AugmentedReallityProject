
// if the following local function is set to more global, the water appears complete at the start and not the other objects

export const data {
    name: "Esterification",
    title: "Esterification",
    description: "Condensation of two chains R and R' linked by the carboxylic acid of R reacting with an alcohol on R' .",
    image : "<img src = '../assets/ester.png' style = 'width = 40%; position = relative; left = 30pc; top = 140px'></img>"
}

// changer tout ce qui est document par une divroot ou injection 

function esterification() { 
    // need constants to work with the html injection:
    const scene = document.getElementById("thescene");
    const carboxy = document.getElementById("carboxy");
    const alcohol = document.getElementById("alcohol");
    var ester  = 0 ;

    document.getElementById("thescene").object3D.updateMatrixWorld(); // select the scene by id in the html, the attribute object3D and the function updateMatrixWorld
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(document.getElementById("alcohol").object3D.matrixWorld); // H2O : the object will be partialy visible or not depending on distances
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(document.getElementById("carboxy").object3D.matrixWorld); // H1
    distCarboxyAlco = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) ; // calculate the distance between the two substrates 
    document.getElementById("infop").innerHTML="<p>" + distCarboxyAlco + "</p>" ; // shows distance


    if (distCarboxyAlco > 2 && ester < 1) {
        document.getElementById("carboxy").setAttribute('visible', true)
        document.getElementById("alcohol").setAttribute('visible', true)
        document.getElementById("ester").setAttribute('visible', false)
        document.getElementById("residue").setAttribute('visible', false)
    }

    else if (distCarboxyAlco < 2 && ester < 1) {
        document.getElementById("carboxy").setAttribute('visible', false)
        document.getElementById("alcohol").setAttribute('visible', false)
        document.getElementById("ester").setAttribute('visible', true)
        document.getElementById("residue").setAttribute('visible', true)
        ester = 1
    }

    // now if the marker if the carboxy disappears after the reaction the others stay visible:

    if (ester = 1 && document.querySelector("carboxy").object3D.visible== false) {
        document.getElementById("ester").setAttribute('visible', true)
        document.getElementById("carboxy").setAttribute('visible', false)
        document.getElementById("alcohol").setAttribute('visible', false)
    }

    // if the alcohol marker disappears the residue does so:  
    if (ester = 1 && document.querySelector("carboxy").object3D.visible== false) {
        document.getElementById("ester").setAttribute('visible', true)
        document.getElementById("carboxy").setAttribute('visible', false)
        document.getElementById("alcohol").setAttribute('visible', false)
    }

    // if the marker supporting the ester isnt visible anymore then set the molecule to not visible:

    if (ester = 1 && document.querySelector("CarboxySelectorName").object3D.visible== false) {
        document.getElementById("ester").setAttribute('visible', true)
        ester = 0 
    }

}
//function restarts every 200 ms to update :

function setInterval() {
    esterification, 200
}

function AddaScene() {
    document.getElementById("InjectSite").innerHTML += `

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

function load() {
    AddaScene()    
    // Workaround for an AR.js bug (https://github.com/jeromeetienne/AR.js/issues/410)
    const sceneEl = document.querySelector('a-scene');
    sceneEl.addEventListener('loaded', () => {
    sceneEl.camera = new THREE.PerspectiveCamera();
    });
    setInterval(esterification, 200)
}

export { load };
