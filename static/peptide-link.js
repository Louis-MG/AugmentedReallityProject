export function createReaction (divRoot){
    //create <a-scene> scaffold
    createScaffold(divRoot);    
    //create a camera
    const sceneEl = document.getElementById("thescene");
    sceneEl.addEventListener("loaded", () => {
      sceneEl.camera = new THREE.PerspectiveCamera()});    
    //reaction
    setInterval(Reaction, 200);
};

function Reaction() {
    const aminoAcid1 = document.getElementById("aminoAcid1");
    const aminoAcid2 = document.getElementById("aminoAcid2");
    const dipeptide = document.getElementById("dipeptide");
    const water = document.getElementById("water");
    const divInfop = document.getElementById("infop");
    const aa2Text = document.getElementById("aminoAcid2Text");
    const wat2Text = document.getElementById("waterText");
    const scene = document.getElementById("thescene");

    scene.object3D.updateMatrixWorld(); //select the scene
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(aminoAcid1.object3D.matrixWorld); //set the object aminoacid1 in the scene
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(aminoAcid2.object3D.matrixWorld); //set the object aminoacid2 in the scene    
    let distAa1Aa2 = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z-p2.z,2)); //distance between the two molecules
    divInfop.innerHTML = "<p>" + distAa1Aa2 + "</p>"; //shows distance

    if (distAa1Aa2 > 2.5){
        if (document.querySelector("#hiroMarkerSelector").object3D.visible == true){
            aminoAcid1.setAttribute('visible',true)
            water.setAttribute('visible',false)
            wat2Text.setAttribute('visible',false)
        }
        if (document.querySelector("#kanjiMarkerSelector").object3D.visible == true){
            aminoAcid2.setAttribute('visible',true)
            aa2Text.setAttribute('visible',true)
            dipeptide.setAttribute('visible',false)
        }
    }else if (distAa1Aa2 < 2.5){
        if (document.querySelector("#hiroMarkerSelector").object3D.visible == true){
            aminoAcid1.setAttribute('visible',false)
            water.setAttribute('visible',true)
            wat2Text.setAttribute('visible',true)
        }
        if (document.querySelector("#kanjiMarkerSelector").object3D.visible == true){
            aminoAcid2.setAttribute('visible',false)
            aa2Text.setAttribute('visible',false)
            dipeptide.setAttribute('visible',true)
        }
    }
};

function createScaffold(divRoot) {
    divRoot.innerHTML += `
    <a-scene id="thescene" embedded = "" artoolkit='patternRatio: 500; sourceType: webcam;'>
      
      <!--first  aminoacid and water-->
      <a-assets>
        <a-asset-item id = "aa1-obj" src = "static/assets/objAfinal.obj"></a-asset-item>
        <a-asset-item id = "aa1-mtl" src = "static/assets/objAfinal.mtl"></a-asset-item>
      </a-assets>

      <a-marker preset = 'hiro' id = "hiroMarkerSelector">
        <a-sphere id = "water" color = "red" radius = "0.20" visible = "false"></a-sphere>
        <a-text id = "waterText" value = "water" side = "left" visible = "false"></a-text>
        <a-obj-model id = "aminoAcid1" src = "#aa1-obj" mtl = "#aa1-mtl" scale="20 20 20" visible = "false"></a-obj-model>
      </a-marker>

      <!--second  aminoacid and dipeptide-->
      <a-assets>      
        <a-asset-item id = "pep-obj" src = "static/assets/objABfinal.obj"></a-asset-item>
        <a-asset-item id = "pep-mtl" src = "static/assets/objABfinal.mtl"></a-asset-item>
      </a-assets>

      <a-marker preset = 'kanji' id = "kanjiMarkerSelector">
        <a-sphere id = "aminoAcid2" color = "white" radius = "0.25" visible = "false"></a-sphere>
        <a-text id = "aminoAcid2Text" value="amino acid 2" side = "left" visible = "false"></a-text>
        <a-obj-model id = "dipeptide" src = "#pep-obj" mtl = "#pep-mtl"  scale = "15 15 15" visible = "false"></a-obj-model>
      </a-marker>

      <a-entity camera></a-entity>

    </a-scene>
  `
  };