export const data = {
    name: "Saponification",
    title: "Saponification reaction",
    description: "Saponification is a process that involves the conversion of fat, oil, or lipid, into soap and alcohol by the action of heat in the presence of aqueous alkali",
    image: "<img src='/static/assets/ioncarbo.png' style='width: 43%;position: relative; top:128px; left:8px'>"
}

export function load (divRoot){
    //create <a-scene> scaffold
    createScaffold(divRoot);
    //reaction
    window.currentReaction = setInterval(Reaction, 200);
}

function Reaction() {
    const ester = document.getElementById("ester");
    const koh = document.getElementById("koh");
    const productSoap = document.getElementById("product-soap");
    const productAlcohol = document.getElementById("product-alcohol")
    const divInfop = document.getElementById("infop");
    const scene = document.getElementById("thescene");

    scene.object3D.updateMatrixWorld(); //select the scene
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(ester.object3D.matrixWorld); //set the object ester in the scene
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(koh.object3D.matrixWorld); //set the object koh in the scene    
    var p3 = new THREE.Vector3(); p3.setFromMatrixPosition(productSoap.object3D.matrixWorld);
    var p4 = new THREE.Vector3(); p4.setFromMatrixPosition(productAlcohol.object3D.matrixWorld);
    let distEsterKoh = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z-p2.z,2)); //distance between the two molecules
    let distEsterA = 2 * Math.sqrt( Math.pow(p1.x - p3.x, 2) + Math.pow(p1.y - p3.y, 2) + Math.pow(p1.z-p3.z,2));
    let distEsterB = 2 * Math.sqrt( Math.pow(p1.x - p4.x, 2) + Math.pow(p1.y - p4.y, 2) + Math.pow(p1.z-p4.z,2));
    let distKohA = 2 * Math.sqrt( Math.pow(p2.x - p3.x, 2) + Math.pow(p2.y - p3.y, 2) + Math.pow(p2.z-p3.z,2));
    let distKohB = 2 * Math.sqrt( Math.pow(p2.x - p4.x, 2) + Math.pow(p2.y - p4.y, 2) + Math.pow(p2.z-p4.z,2));

    divInfop.innerHTML = "<p>" + distEsterKoh + "</p>"; //shows distance

    if (distEsterKoh > 2.5) { // if the two markers are close enough
        if (document.querySelector("#hiroMarkerSelector").object3D.visible === true){ // if the HiroMarker is visible
          ester.setAttribute('visible',true)
        }
        if (document.querySelector("#kanjiMarkerSelector").object3D.visible === true){ // if the kanjiMarker is visible
          koh.setAttribute('visible',true)
        }
        if (document.querySelector("#letterAMarkerSelector").object3D.visible === true){ // if the LetterAMarker is visible
            productSoap.setAttribute('visible',false)
        }
        if ( document.querySelector("#letterBMarkerSelector").object3D.visible === true){ // if the LetterBMarker is visible
        	productAlcohol.setAttribute('visible',false)
        }
    }else if (distEsterKoh < 2.5 && distEsterA < 3 && distEsterB < 3 && distKohA < 3 && distKohB ){
        if (document.querySelector("#hiroMarkerSelector").object3D.visible === true){
            ester.setAttribute('visible',false)
        }
        if (document.querySelector("#kanjiMarkerSelector").object3D.visible === true){
            koh.setAttribute('visible',false)
        }
        if (document.querySelector("#letterAMarkerSelector").object3D.visible === true){
          product-soap.setAttribute('visible', true)
        }
        if (document.querySelector("letterBMarkerSelector").object3D.visible === true){
        	product-alcohol.setAttribute('visible',true)
        }

    }else{
      if (document.querySelector("#hiroMarkerSelector").object3D.visible === true){
        ester.setAttribute('visible',true)
      }
      if (document.querySelector("#kanjiMarkerSelector").object3D.visible === true){
        koh.setAttribute('visible',true)
      }
    }
}

function createScaffold(divRoot) {
    divRoot.innerHTML += `
    
    <!-- reaction information -->

    <div class="mainText">
        <p id="info"><b> Move markers around to provoke the saponification reaction </b></p>
        <p id="infop"></p>
    </div>

    <!-- saponification reaction -->
    <a-scene id="thescene" embedded = "" artoolkit='patternRatio: 500; sourceType: webcam;'>

      <!--reagents-->
        <a-assets>
          <a-asset-item id = "ester-obj" src ="static/assets/ester.obj"></a-asset-item>
          <a-asset-item id = "ester-mtl" src ="static/assets/ester.mtl"></a-asset-item>
          <a-asset-item id = "koh-obj" src ="static/assets/koh.obj"></a-asset-item>
          <a-asset-item id = "koh-mtl" src ="static/assets/koh.mtl"></a-asset-item>
        </a-assets>

      <a-marker preset = 'hiro' id = "hiroMarkerSelector">
        <a-obj-model id = "ester" src = "#ester-obj" mtl = "#ester-mtl" scale="1 1 1" visible = "false"></a-obj-model>
      </a-marker>
      <a-marker preset = 'kanji' id = "kanjiMarkerSelector">
        <a-obj-model id = "koh" src = "#koh-obj" mtl = "#koh-mtl" scale="1 1 1" visible = "false"></a-obj-model>
      </a-marker>

      <!--products-->
      <a-assets>      
        <a-asset-item id = "prod-soap-mtl src="static/assets/soap.mtl></a-asset-item>
        <a-asset-item id =" prod-soap-obj" src ="static/assets/soap.obj"></a-asset-item>
        <a-asset-item id =" prod-alcohol-mtl" src="static/assets/alcohol.mtl"></a-asset-item>
        <a-asset-item id =" prod-alcohol-obj" src="static/assets/alcohol.obj"></a-asset-item>

      </a-assets>

      <a-marker preset = 'letterA' id = "letterAMarkerSelector">
        <a-obj-model id = "product-soap" src = '#prod-soap-obj' mtl = '#prod-soap-mtl' scale = "1 1 1" visible = "false"></a-obj-model>
      <a-marker preset ='letterB' id =" letterBMarkerSelector">
        <a-obj-model id = "product-alcohol" src  ='#prod-alcohol-obj' mtl ='#prod-alcohol-mtl' scale = "1 1 1" visible = "false"></a-obj-model>	
      </a-marker>


      <a-entity camera></a-entity>

    </a-scene>
  `
  }