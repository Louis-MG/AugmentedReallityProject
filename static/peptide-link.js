setInterval(function createReaction() {
    console.log("loading new reaction...");
    var pep=0;

    const scene = document.getElementById("thescene")
    scene.object3D.updateMatrixWorld(); //select the scene
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(document.getElementById("aminoAcid1").object3D.matrixWorld); //set the object aminoacid1 in the scene
    var p2 = new THREE.Vector3(); p1.setFromMatrixPosition(document.getElementById("aminoAcid2").object3D.matrixWorld); //set the object aminoacid2 in the scene    
    let distAa1Aa2 = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)); //distance between the two molecules
    const divInfop = document.getElementById("infop")
    divInfop.innerHTML = "<p>" + distAa1Aa2 + "</p>"; //shows distance

    // if the two molecules are adequately close, formation of the dipeptide

    const aminoAcid1 = document.getElementById("aminoAcid1");
    const aminoAcid2 = document.getElementById("aminoAcid2");
    //const dipeptide = document.getElementById("dipeptide");
    //const water = document.getElementById("water");

    if (distAa1Aa2 < 2 && distAa1Aa2 < 1){
        aminoAcid1.setAttribute("visible", false) // marker hiro
        aminoAcid2.setAttribute("visible", false) // marker kanji
        //dipeptide.setAttribute("visible", true)  // marker hiro
        //water.setAttribute("visible", true) // marker kanji
        pep++
    }
    else if (distAa1Aa2 > 2 && distAa1Aa2 < 1){ //if the distance between the molecules (markers) increase more then 2 amstrong
        aminoAcid1.setAttribute("visible", true) // marker hiro
        aminoAcid2.setAttribute("visible", true) // marker kanji
        //dipeptide.setAttribute("visible", false) // marker hiro
        //water.setAttribute("visible", false) // marker kanji
    }

    // if the marker of aminoacid2 disappears after the reaction

    if (pep == 1 && document.querySelector("#kanjiMarkerSelector").object3D.visible == false){
        aminoAcid2.setAttribute('visible', true)
    }
}, 200);

export {createReaction};