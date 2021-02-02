var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

output.innerHTML = slider.value; //affiche au chargement de la page la valeur du slider

slider.oninput = function() {
	if ( slider.value > 10) {
  output.innerHTML = this.value + " au dessus de seuil ";

}
else {
	output.innerHTML=this.value;
}
} // quand le slider est update permet de changer la valeur affichée

