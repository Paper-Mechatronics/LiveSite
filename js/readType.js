var moduleType = localStorage.getItem("moduleType");
$( document ).ready(function() {
	console.log(moduleType)
	if(moduleType){
		document.getElementById("dropdown").value = moduleType
		changeMods();
		localStorage.setItem("moduleType", "");
	}
})