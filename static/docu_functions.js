// functions for Documentation

// These functions change the div displayed: there is one for each language. French is default. Last one if for the top left arrow button:

function change_to_english() {
    var x = document.getElementById("english"); //looks for the english div
    if (x.style.display === "none") {
      x.style.display = "block"; //if not visible, changes the display to block
      document.getElementById("french").style.display = "none"; //hides french and italian divs
      document.getElementById("italian").style.display = "none"
    } else {
      x.style.display = "block"; //if it was visible
      document.getElementById("french").style.display = "none"; // hides french and italian
      document.getElementById("italian").style.display = "none"
    }
}

// other functions follow the exact same structure
// when looking for an element, careful with getElementByID and getElementsById (stupid s)

function change_to_french() {
    var x = document.getElementById("french");
    if (x.style.display === "none") {
      x.style.display = "block" ;
      document.getElementById("english").style.display = "none";
      document.getElementById("italian").style.display = "none"
    } else {
      x.style.display = "block";
      document.getElementById("english").style.display = "none";
      document.getElementById("italian").style.display = "none"
    }
}

function change_to_italian() {
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
    window.location.href = "home.html"; // sends the user back to the home menu
}
