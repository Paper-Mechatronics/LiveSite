function transferType(){
	console.log(openCloseModule)
	if(openCloseModule || upDownModule || flapModule || rotateModule){
		localStorage.setItem("moduleType", "motion");
	}
	else{
		localStorage.setItem("moduleType", "mechanism");
	}
	window.location.href="./create.php"
}