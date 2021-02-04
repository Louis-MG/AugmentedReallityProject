var ester = 0

setInterval(function() {
    document.getElementById("thescene").object3D.updateMatrixWorld(); // select the scene by id in the html, the attribute object3D and the function updateMatrixWorld
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(document.getElementById("alcohol").object3D.matrixWorld); // H2O : the object will be partialy visible or not depending on distances
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(document.getElementById("carboxy").object3D.matrixWorld); // H1
    distCarboxyAlco = 2 * Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) ; // calculate the distance between the two substrates 
    document.getElementById("infop").innerHTML="<p>" + distCarboxyAlco + "</p>" ; // shows distance

    // prendre en compte les liens, donc il faut séparer le caborxy de son H, et l'alcool du R

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
        ester  = 1
    }

    // now if the marker if the carboxy disappears after the reaction the others stay visible :

    if (ester = 1 && document.querySelector("carboxy").object3D.visible== false) {
        document.getElementById("ester").setAttribute('visible', true)
        document.getElementById("carboxy").setAttribute('visible', false)
        document.getElementById("alcohol").setAttribute('visible', false)
    }

    // if the maarker supporting the ester isnt visible anymore then set the molecule to not visible :

    if (ester = 1 && document.querySelector("CarboxySelectorName").object3D.visible== false) {
        document.getElementById("ester").setAttribute('visible', true)
        ester = 0 
    }

}, 200);