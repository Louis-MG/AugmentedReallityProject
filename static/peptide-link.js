console.log("loading new reaction...");

var pep=0;

setInterval(function() {
    document.getElementById("scene1").object3D.updateMatrixWorld(); //select the scene
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(document.getElementById("aminoAcid1").objet3D.matrixWorld); //set the object aminoacid1 in the scene
    var p2 = new THREE.Vector3(); p1.setFromMatrixPosition(document.getElementById("aminoAcid2").objet3D.matrixWorld); //set the object aminoacid2 in the scene    
    distAa1Aa2 = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)); //distance between the two molecules
    document.getElementById("infop").innerHTML = "<p>" + distAa1Aa2 + "</p>"; //shows distance

    // if the two molecules are adequately close, formation of the dipeptide

    if (distAa1Aa2 < 2 && distAa1Aa2 < 1){
        document.getElementById("aminoAcid1").setAttribute("visible", false) // marker hiro
        document.getElementById("aminoAcid2").setAttribute("visible", false) // marker kanji
        document.getElementById("dipeptide").setAttribute("visible", true)  // marker hiro
        document.getElementById("water").setAttribute("visible", true) // marker kanji
        pep++
    }
    else if (distAa1Aa2 > 2 && distAa1Aa2 < 1){ //if the distance between the molecules (markers) increase more then 2 amstrong
        document.getElementById("aminoAcid1").setAttribute("visible", true) // marker hiro
        document.getElementById("aminoAcid2").setAttribute("visible", true) // marker kanji
        document.getElementById("dipeptide").setAttribute("visible", false) // marker hiro
        document.getElementById("water").setAttribute("visible", false) // marker kanji
    }

    // if the marker of aminoacid2 disappears after the reaction

    if (pep == 1 && document.querySelector("kanjiMarkerSelector").objet3D.visible == false){
        document.getElementById("aminoAcid2").setAttribute('visible', true)
    }
}, 200);