// functions for Documentation

function change_to_english() {
    var x = document.getElementById("english");
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById("french").style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("french").style.display = "none";
    }
}


function change_to_french() {
    var x = document.getElementById("french");
    if (x.style.display === "none") {
      x.style.display = "block" ;
      document.getElementById("english").style.display = "none";
    } else {
      x.style.display = "block";
      document.getElementById("english").style.display = "none";
    }
}



// document.getElementById("english").style.display = "none" ;
// document.getElementById("french").style.display = "block" ;