// functions for Documentation

function switchToEnglish() {
  var x = document.getElementById("english");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("french").style.display = "none";
    document.getElementById("italian").style.display = "none"
  } else {
    x.style.display = "block";
    document.getElementById("french").style.display = "none";
    document.getElementById("italian").style.display = "none";

  }
}

function switchToFrench() {
  var x = document.getElementById("french");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("english").style.display = "none";
    document.getElementById("italian").style.display = "none"
  } else {
    x.style.display = "block";
    document.getElementById("english").style.display = "none";
    document.getElementById("italian").style.display = "none";

  }
}

function switchToItalian() {
  var x = document.getElementById("italian");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("french").style.display = "none";
    document.getElementById("english").style.display = "none"
  } else {
    x.style.display = "block";
    document.getElementById("french").style.display = "none";
    document.getElementById("english").style.display = "none";

  }
}

function goHome() {
    window.location.href = "home.html";
}


// document.getElementById("english").style.display = "none" ;
// document.getElementById("french").style.display = "block" ;