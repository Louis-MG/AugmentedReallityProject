function createReaction() {
    //console.log("loading new reaction...");

    const aminoAcid1 = document.getElementById("aminoAcid1");
    const aminoAcid2 = document.getElementById("aminoAcid2");
    const dipeptide = document.getElementById("dipeptide");
    const water = document.getElementById("water");
    const divInfop = document.getElementById("infop")
    const aa2Text = document.getElementById("aminoAcid2Text")
    const wat2Text = document.getElementById("waterText")


    document.getElementById("thescene").object3D.updateMatrixWorld(); //select the scene
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(aminoAcid1.object3D.matrixWorld); //set the object aminoacid1 in the scene
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(aminoAcid2.object3D.matrixWorld); //set the object aminoacid2 in the scene    
    let distAa1Aa2 = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z-p2.z,2)); //distance between the two molecules
    divInfop.innerHTML = "<p>" + distAa1Aa2 + "</p>"; //shows distance

    if (distAa1Aa2 > 2.5){
        if (document.querySelector("#letterAMarkerSelector").object3D.visible == true){
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
        if (document.querySelector("#letterAMarkerSelector").object3D.visible == true){
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

//export {createReaction};
setInterval(createReaction, 200);