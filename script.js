console.log("loading new reaction...")
var hoh=0 // step counter
setInterval(function(){
    document.getElementById("thescene").object3D.updateMatrixWorld();
    var p1 = new THREE.Vector3(); p1.setFromMatrixPosition(document.getElementById("hoh1").object3D.matrixWorld);
    var p2 = new THREE.Vector3(); p2.setFromMatrixPosition(document.getElementById("hyd1").object3D.matrixWorld);
    var p3 = new THREE.Vector3(); p3.setFromMatrixPosition(document.getElementById("hyd2").object3D.matrixWorld);
    distOH1 = 2 * Math.sqrt( Math.pow(p2.x-p1.x,2) + Math.pow(p2.y-p1.y,2) + Math.pow(p2.z-p1.z,2) );
    distOH2 = 2 * Math.sqrt( Math.pow(p3.x-p1.x,2) + Math.pow(p3.y-p1.y,2) + Math.pow(p3.z-p1.z,2) );
    document.getElementById("infop").innerHTML="<p>" + distOH1 + "     " + distOH2 + "     " + hoh + "</p>";

    // At the first or second step, if the distance between one of the H and O is smaller than 2 angström...
    if (distOH1 < 2 && hoh < 2){
        document.getElementById("hyd1").setAttribute('visible',false) //...the H disappears
        document.getElementById("hoh1").setAttribute('visible',true)
        document.getElementById("hoh2").setAttribute('visible',true)  //...the H on H2O appears
        document.getElementById("l1").setAttribute('visible',true)    //...the bond between them appears

    }
    // if the distance is too long between H and O...
    else if (distOH1 > 2 && hoh < 2){
        document.getElementById("hyd1").setAttribute('visible',true) //...the H is visible
        document.getElementById("hoh1").setAttribute('visible',true)
        document.getElementById("hoh2").setAttribute('visible',false)//...the H on H2O is not visible
        document.getElementById("l1").setAttribute('visible',false)  //...the bond is not visible
    }
    // At the first or second step, if the distance between one of the H and O is smaller than 2 angström...
    if (distOH2 < 2 && hoh < 2){
        document.getElementById("hyd2").setAttribute('visible',false) //...the H disapears
        document.getElementById("hoh1").setAttribute('visible',true)  //...the H on H2O appears
        document.getElementById("hoh3").setAttribute('visible',true)
        document.getElementById("l2").setAttribute('visible',true)    //...the bond between them appears
        hoh++
    }
    // if the distance is too long between H and O...
    else if (distOH2 > 2 && hoh < 2){
        document.getElementById("hyd2").setAttribute('visible',true) //...the H is visible
        document.getElementById("hoh1").setAttribute('visible',true)
        document.getElementById("hoh3").setAttribute('visible',false)//...the H on H2O is not visible
        document.getElementById("l2").setAttribute('visible',false)  //...the bond is not visible
    }


    //Now,when we put out hydrogens markers out of the camera shot, the molecule has to stay on the last marker

    // when hiro marker desappears, the bond and H(of H2O) stay visible
    if(hoh == 1 && document.querySelector("lysmarker").object3D.visible == false){
        document.getElementById("hoh2").setAttribute('visible',true)
        document.getElementById("l1").setAttribute('visible',true)
        hoh = 2;
    }
    // when we put away the kanji marker, it's reinitialize the H2O molecule at O
    if(hoh == 2 && document.querySelector("glumarker").object3D.visible == false){
        document.getElementById("hoh2").setAttribute('visible',false)
        document.getElementById("l1").setAttribute('visible',false)
        hoh=0
    }
    // when letterA marker desappears, the bond and H(of H2O) stay visible
    if(hoh == 1 && document.querySelector("promarker").object3D.visible == false){
        document.getElementById("hoh3").setAttribute('visible',true)
        document.getElementById("l2").setAttribute('visible',true)
        hoh = 2
    }
    // when we put away the kanji marker, it's reinitialize the H2O molecule at O
    if(hoh == 2 && document.querySelector("glumarker").object3D.visible == false){
        document.getElementById("hoh3").setAttribute('visible',false)
        document.getElementById("l2").setAttribute('visible',false)
        hoh=0
    }
}, 200);