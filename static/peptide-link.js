console.log("loading new reaction...");

let pep = 0;

setInterval(function(){
    document.getElementById("scene1").object3D.updateMatrixWorld(); // select the scene by id in the html, the attribute object3D and the function updateMatrixWorld
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(document.getElementById("aminoacid1").object3D.matrixWorld); // H2O : the object will be partialy visible or not depending on distances
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(document.getElementById("aminoacid2").object3D.matrixWorld); // H1
    distAa1Aa2 = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) ; // calculate the distance between the two substrates 
    document.getElementById("infop").innerHTML="<p>" + distAa1Aa2 + "</p>" ; // shows distance


    //dont  know


    if (distCarboxyAlco > X && ester < 1){
        document.getElementById("carboxy").setAttribute('visible', true)
        document.getElementById("alcohol").setAttribute('visible', true)
        document.getElementById("ester").setAttribute('visible', false)
        document.getElementById("residue").setAttribute('visible', false)
    }

    else if (distCarboxyAlco < X && ester < 1) {
        document.getElementById("carboxy").setAttribute('visible', false)
        document.getElementById("alcohol").setAttribute('visible', false)
        document.getElementById("ester").setAttribute('visible', true)
        document.getElementById("residue").setAttribute('visible', true)
    }

    // now if the marker if the caboxy disapears after the reaction:

    if (ester = 1 && document.querySelector("CarboxySelectorName").object3D.visible== false) {
        document.getElementById("ester").setAttribute('visible', true)

    }

}, 200)
