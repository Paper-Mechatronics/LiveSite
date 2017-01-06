// get the value of browser stored variable moduleType
var moduleType = localStorage.getItem("moduleType");
// when the document is ready change dropdown value to associated value of moduleType
$( document ).ready(function() {
	if(moduleType){
		document.getElementById("dropdown").value = moduleType
		// update modules based off changed dropdown value
		changeMods();
		// reset moduleType variable 
		localStorage.setItem("moduleType", "");
	}
})