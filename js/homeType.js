function transferType(){
	console.log("running")
	if(openCloseModule || upDownModule || flapModule || rotateModule){
		localStorage.setItem("moduleType", "motion");
	}
	else{
		localStorage.setItem("moduleType", "mechanism");
	}
	window.location.href="./create.php"
}