// determine what type of module to send the user back to ie. mechanism/motion
function transferType(){
	// if it is a motion store variable moduleType to motion
	if(openCloseModule || upDownModule || flapModule || rotateModule){
		localStorage.setItem("moduleType", "motion");
	}
	// otherwise store variable moduleType to mechanism
	else{
		localStorage.setItem("moduleType", "mechanism");
	}
	// redirect window back to module home page
	window.location.href="./create.php"
}