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
    const products = document.getElementById("products");
    const divInfop = document.getElementById("infop");
    const scene = document.getElementById("thescene");

    scene.object3D.updateMatrixWorld(); //select the scene
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(aminoAcid1.object3D.matrixWorld); //set the object aminoacid1 in the scene
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(aminoAcid2.object3D.matrixWorld); //set the object aminoacid2 in the scene    
    var p3 = new THREE.Vector3(); p3.setFromMatrixPosition(products.object3D.matrixWorld);
    let distAa1Aa2 = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z-p2.z,2)); //distance between the two molecules
    let distOne = 2 * Math.sqrt( Math.pow(p3.x - p2.x, 2) + Math.pow(p3.y - p2.y, 2) + Math.pow(p3.z-p2.z,2));
    let distTwo = 2 * Math.sqrt( Math.pow(p3.x - p1.x, 2) + Math.pow(p3.y - p1.y, 2) + Math.pow(p3.z-p1.z,2));
    divInfop.innerHTML = "<p>" + distAa1Aa2 + "</p>"; //shows distance

    if (distAa1Aa2 > 2.5){
        if (document.querySelector("#hiroMarkerSelector").object3D.visible == true){
          aminoAcid1.setAttribute('visible',true)
        }
        if (document.querySelector("#kanjiMarkerSelector").object3D.visible == true){
          aminoAcid2.setAttribute('visible',true)
        }
        if (document.querySelector("#letterAMarkerSelector").object3D.visible == true){
            products.setAttribute('visible',false)
        }
    }else if (distAa1Aa2 < 2.5 && distOne < 3 && distTwo < 3){
        if (document.querySelector("#hiroMarkerSelector").object3D.visible == true){
            aminoAcid1.setAttribute('visible',false)
        }
        if (document.querySelector("#kanjiMarkerSelector").object3D.visible == true){
            aminoAcid2.setAttribute('visible',false)
        }
        if (document.querySelector("#letterAMarkerSelector").object3D.visible == true){
          products.setAttribute('visible', true)
        }
    }else{
      if (document.querySelector("#hiroMarkerSelector").object3D.visible == true){
        aminoAcid1.setAttribute('visible',true)
      }
      if (document.querySelector("#kanjiMarkerSelector").object3D.visible == true){
        aminoAcid2.setAttribute('visible',true)
      }
    }
};

function createScaffold(divRoot) {
    divRoot.innerHTML += `
    <a-scene id="thescene" embedded = "" artoolkit='patternRatio: 500; sourceType: webcam;'>

      <!--reagents-->
        <a-assets>
          <a-asset-item id = "aa-obj" src = "static/assets/objAfinal.obj"></a-asset-item>
          <a-asset-item id = "aa-mtl" src = "static/assets/objAfinal.mtl"></a-asset-item>
        </a-assets>

      <a-marker preset = 'hiro' id = "hiroMarkerSelector">
        <a-obj-model id = "aminoAcid1" src = "#aa-obj" mtl = "#aa-mtl" scale="20 20 20" visible = "false"></a-obj-model>
      </a-marker>
      <a-marker preset = 'kanji' id = "kanjiMarkerSelector">
        <a-obj-model id = "aminoAcid2" src = "#aa-obj" mtl = "#aa-mtl" scale="20 20 20" visible = "false"></a-obj-model>
      </a-marker>

      <!--products-->
      <a-assets>      
        <a-asset-item id = "prod-obj" src = "static/assets/objAB__H2O.obj"></a-asset-item>
        <a-asset-item id = "prod-mtl" src = "static/assets/objAB__H2O.mtl"></a-asset-item>
      </a-assets>

      <a-marker preset = 'letterA' id = "letterAMarkerSelector">
        <a-obj-model id = "products" src = '#prod-obj' mtl = '#prod-mtl' scale = "20 20 20" visible = "false"></a-obj-model>
      </a-marker>

      <a-entity camera></a-entity>

    </a-scene>
  `
  };