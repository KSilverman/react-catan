const helpers = {


	getXOffsetMultiplier: function(rowIndex, columnIndex) {
		if(rowIndex === 0 || rowIndex === 4) {
			return 1;
		}
		if(rowIndex === 1 || rowIndex === 3) {
			return 0.5;
		}
		return 0;
	},

	/**
	* Returns randomized land array of JSON data.
	*
	* @return {array} the randomizedarray land JSON data [return=[{"type": "brick", "value": 4},...[]].
	*/
	
	getLands: function() {
		var piecesArray = [];
		var valueArray = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]
		var typeArray = ["brick","brick","brick","ore","ore","ore","wood","wood","wood","wood",
							"hay","hay","hay","hay","goat","goat","goat","goat"]
		var rowArray = [3,4,5,4,3]
		//randomize values and types (same length)
		for (let i = valueArray.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [valueArray[i], valueArray[j]] = [valueArray[j], valueArray[i]];
	        [typeArray[i], typeArray[j]] = [typeArray[j], typeArray[i]];
    	}
    	var randomBlankNum = Math.floor(Math.random()*valueArray.length)
    	var foundRandomNum = false;
    	var rowIndex = 0;
    	var columnIndex = 0;
    	var columnCounter = 1;
    	for(let i = 0; i < valueArray.length; i++) {
    		if(columnCounter > rowArray[rowIndex]) { 
    			rowIndex++;
    			columnIndex = 0;
    			columnCounter = 1;
    		}
    		if(i === randomBlankNum) {
    			piecesArray.push({"type": "blank", "value": 0, "xOffset": (columnIndex+1)+this.getXOffsetMultiplier(rowIndex, columnIndex), "yOffset": rowIndex})
    			foundRandomNum = true
    			columnCounter++;
    			columnIndex++;
    		}
    		if(columnCounter > rowArray[rowIndex]) { 
    			rowIndex++;
    			columnIndex = 0;
    			columnCounter = 1;
    		}
			piecesArray.push({"type": typeArray[i], "value": valueArray[i], 
							"xOffset": (columnIndex+1)+this.getXOffsetMultiplier(rowIndex, columnIndex), "yOffset": rowIndex})
			columnCounter++;
			columnIndex++;
    	}
    	//insert blank piece at random index
    	//piecesArray.splice(Math.floor(Math.random()*piecesArray.length),0,{"type": "blank", "value": 0, "offset": 0})
    	return piecesArray
	},

	getLandDots : function(value) {
		if(value === 2 || value === 12) {
			return "."
		}
		else if(value === 3 || value === 11) {
			return ".."
		}
		else if(value === 4 || value === 10) {
			return "..."
		}
		else if(value === 5 || value === 9) {
			return "...."
		}
		else if(value === 6 || value === 8) {
			return "....."
		}
		return "" //blank
	},

	getLandColor: function(type) {
		if(type === "brick") {
			return "FireBrick"
		}
		if(type === "wood") {
			return "DarkGreen"
		}
		if(type === "ore") {
			return "DarkGrey"
		}
		if(type === "goat") {
			return "Chartreuse"
		}
		if(type === "hay") {
			return "Gold"
		}
		return "Khaki" //blank
	},

	getLandPNG: function(type) {
		var imageName = ""
		if(type === "brick") {
			imageName = "land_brick"
		}
		else if(type === "wood") {
			imageName = "land_wood"
		}
		else if(type === "ore") {
			imageName = "land_ore"
		}
		else if(type === "goat") {
			imageName = "land_goat"
		}
		else if(type === "hay") {
			imageName = "land_hay"
		} else {
			imageName = "land_blank"
		}
		/*
			For land image in Land component:
			fillPatternImage={catanHelper.getLandPNG(this.props.type)}
			fillPatternOffsetX={250}
			fillPatternOffsetY={70}
		*/
		var image = new Image()
		var landImage = require('../img/lands/'+imageName+'.png').default
		image.src = landImage
		return image
	}

}

export default helpers;