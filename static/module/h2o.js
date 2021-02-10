export const data = {
    name: "Water",
    title: "H2O formation",
    description: "For the exemple",
    image: "<img src='/static/assets/Water.png' style='width: 22%;position: relative; top:149px; left:34px'>"
}

let hoh = 0; //counter
let distOH1 = 0;
let distOH2 = 0;

export function load (divRoot){
    //create <a-scene> scaffold
    createScaffold(divRoot);
    //reaction
    window.currentReaction = setInterval(Reaction, 200);
}

function Reaction(){
    document.getElementById("thescene").object3D.updateMatrixWorld();
    let p1 = new THREE.Vector3(); p1.setFromMatrixPosition(document.getElementById("hoh1").object3D.matrixWorld);
    let p2 = new THREE.Vector3(); p2.setFromMatrixPosition(document.getElementById("hyd1").object3D.matrixWorld);
    let p3 = new THREE.Vector3(); p3.setFromMatrixPosition(document.getElementById("hyd2").object3D.matrixWorld);
    distOH1 = 2 * Math.sqrt( Math.pow(p2.x-p1.x,2) + Math.pow(p2.y-p1.y,2) + Math.pow(p2.z-p1.z,2) );
    distOH2 = 2 * Math.sqrt( Math.pow(p3.x-p1.x,2) + Math.pow(p3.y-p1.y,2) + Math.pow(p3.z-p1.z,2) );
    document.getElementById("infop").innerHTML="<p>" + distOH1 + "     " + distOH2 + "     " + hoh + "</p>";
    // At the first or second step, if the distance between one of the H and O is smaller than 2 angström...
    if (distOH1 < 2 && hoh < 2){
        document.getElementById("hyd1").setAttribute('visible',false); //...the H disappears
        document.getElementById("hoh1").setAttribute('visible',true);
        document.getElementById("hoh2").setAttribute('visible',true); //...the H on H2O appears
        document.getElementById("l1").setAttribute('visible',true);    //...the bond between them appears

    }
    // if the distance is too long between H and O...
    else if (distOH1 > 2 && hoh < 2){
        document.getElementById("hyd1").setAttribute('visible',true); //...the H is visible
        document.getElementById("hoh1").setAttribute('visible',true);
        document.getElementById("hoh2").setAttribute('visible',false);//...the H on H2O is not visible
        document.getElementById("l1").setAttribute('visible',false);  //...the bond is not visible
    }
    // At the first or second step, if the distance between one of the H and O is smaller than 2 angström...
    if (distOH2 < 2 && hoh < 2){
        document.getElementById("hyd2").setAttribute('visible',false); //...the H disapears
        document.getElementById("hoh1").setAttribute('visible',true);  //...the H on H2O appears
        document.getElementById("hoh3").setAttribute('visible',true);
        document.getElementById("l2").setAttribute('visible',true);    //...the bond between them appears
        hoh++;
    }
    // if the distance is too long between H and O...
    else if (distOH2 > 2 && hoh < 2){
        document.getElementById("hyd2").setAttribute('visible',true); //...the H is visible
        document.getElementById("hoh1").setAttribute('visible',true);
        document.getElementById("hoh3").setAttribute('visible',false);//...the H on H2O is not visible
        document.getElementById("l2").setAttribute('visible',false);  //...the bond is not visible
    }


    //Now,when we put out hydrogens markers out of the camera shot, the molecule has to stay on the last marker

    // when hiro marker desappears, the bond and H(of H2O) stay visible
    if(hoh === 1 && document.querySelector("#lysmarker").object3D.visible === false){
        document.getElementById("hoh2").setAttribute('visible',true);
        document.getElementById("l1").setAttribute('visible',true);
        hoh = 2;
    }
    // when we put away the kanji marker, it's reinitialize the H2O molecule at O
    if(hoh === 2 && document.querySelector("#glumarker").object3D.visible === false){
        document.getElementById("hoh2").setAttribute('visible',false);
        document.getElementById("l1").setAttribute('visible',false);
        hoh=0;
    }
    // when letterA marker desappears, the bond and H(of H2O) stay visible
    if(hoh === 1 && document.querySelector("#promarker").object3D.visible === false){
        document.getElementById("hoh3").setAttribute('visible',true);
        document.getElementById("l2").setAttribute('visible',true);
        hoh = 2;
    }
    // when we put away the kanji marker, it's reinitialize the H2O molecule at O
    if(hoh === 2 && document.querySelector("#glumarker").object3D.visible === false){
        document.getElementById("hoh3").setAttribute('visible',false);
        document.getElementById("l2").setAttribute('visible',false);
        hoh=0;
        }
}

function createScaffold(divRoot) {
    divRoot.innerHTML += `
    
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
  `
}