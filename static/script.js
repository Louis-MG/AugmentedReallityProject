
// selector

var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    console.log(s.options[i].innerHTML + " has been loaded")
                    if (typeof window.currentReaction !== 'undefined'){ // if some reaction is already running
                        console.log("killing the previous reaction...")
                        clearInterval(window.currentReaction) // kill it !
                        document.getElementById("infop").innerHTML="<p>" +"Loading..."+ "</p>";
                        document.getElementById("hyd1").setAttribute('visible',false) //...everything disappear
                        document.getElementById("l1").setAttribute('visible',false)
                        document.getElementById("l2").setAttribute('visible',false)
                        document.getElementById("hyd2").setAttribute('visible',false)
                        document.getElementById("hyd2").setAttribute('visible',false)
                        document.getElementById("hoh1").setAttribute('visible',false)
                        document.getElementById("hoh2").setAttribute('visible',false)
                        document.getElementById("hoh3").setAttribute('visible',false)
                    }
                    if (s.options[i].innerHTML == "reaction 1"){ // if the user choose "reaction 1"
                        console.log("loading new reaction...")
                        var hoh=0 // step counter
                        window.currentReaction = setInterval(function(){
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

                    }

                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);