const helpers = {

	//(x,y) is the position of hte center of the hexagon
	getHexCoordinates: function(x, y) {
		var a = 50 //half the length of the hexagon
		var points = [];
		points.push({'x': x, 'y': y-a})
		points.push({'x': x, 'y': y+a})
		points.push({'x': x+((Math.sqrt(3)*a)/2), 'y': y+(a/2)}) //bottom right
		points.push({'x': x-((Math.sqrt(3)*a)/2), 'y': y+(a/2)}) //bottom left
		points.push({'x': x+((Math.sqrt(3)*a)/2), 'y': y-(a/2)}) //top right
		points.push({'x': x-((Math.sqrt(3)*a)/2), 'y': y-(a/2)}) //top left
		return points;
	},

	nodeAlreadyExists: function(x, y, area, nodeArray) {
		for(let i = 0; i < nodeArray.length; i++) {
			var nodePos = nodeArray[i].position;
			var inCircle = Math.pow(area, 2) - (Math.pow((x-nodePos.x),2) + Math.pow(y-nodePos.y,2))
			if(inCircle >= 0) { 
				return { bool: true, alreadyExistingNode: nodeArray[i] }; 
			}
		}
		return { bool: false, alreadyExistingNode: null };
	},

	adjectIntersectionExists: function(node, nodeArray, intersectionArray) {
		for(let i = 0; i < nodeArray.length; i++) {
			var n = nodeArray[i]
			var distance = Math.sqrt(Math.pow(n.position.x-node.position.x,2)
							+ Math.pow(n.position.y-node.position.y,2))
			if(distance < 55) {
				var currentIntersectionIndex = this.findIntersection(n.id, intersectionArray)
				var currentIntersection = intersectionArray[currentIntersectionIndex]
				if(currentIntersection.owner !== '') { return true; }
			}
		}
		return false;
	},

	findIntersection: function(id, intersectionArray) {
		let intersection = -1
		for(let i = 0; i < intersectionArray.length; i++) {
			if(intersectionArray[i].id === id) { 
				intersection = i
			}
		}
		return intersection;
	},

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
		var nodeArray = [];
		var edgeArray = [];
		var pathArray = [];
		var intersectionArray = [];
		var valueArray = [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12]
		var typeArray = ["brick","brick","brick","ore","ore","ore","wood","wood","wood","wood",
							"hay","hay","hay","hay","goat","goat","goat","goat"]
		var rowArray = [3,4,5,4,3]
		var desertPlacementArray = [4,5,8,9,10,13,14] //possible desert spots
		//randomize values and types (same length)
		for (let i = valueArray.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [valueArray[i], valueArray[j]] = [valueArray[j], valueArray[i]];
	        [typeArray[i], typeArray[j]] = [typeArray[j], typeArray[i]];
    	}

    	var xMultiplier = 87;
    	var yMultiplier = 75;
    	var xDivisor = 3.05;
    	var yDivisor = 4.5;

    	var randomBlankNum = desertPlacementArray[Math.floor(Math.random()*desertPlacementArray.length)]
    	var foundRandomNum = false
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
    			foundRandomNum = true
    			let x = (window.innerWidth/3)+(((columnIndex+1)+this.getXOffsetMultiplier(rowIndex, columnIndex))*xMultiplier)
    			let y = window.innerHeight/4+(rowIndex*yMultiplier)
    			let hexCords = this.getHexCoordinates(x,y);
    			piecesArray.push({
    						"id": i,
    						"type": "blank", 
    						"value": 0,
    						"hexagonX": x, 
    						"hexagonY": y,
    						"textX": ((window.innerWidth/xDivisor)+((columnIndex+1)+this.getXOffsetMultiplier(rowIndex, columnIndex))*xMultiplier),
    						"textY": window.innerHeight/yDivisor+(rowIndex*yMultiplier)
    					})

    			for(let j = 0; j < hexCords.length; j++) {
    				if(!this.nodeAlreadyExists(hexCords[j].x, hexCords[j].y, 5, nodeArray)) {
    					nodeArray.push({
    						id: (rowIndex+1).toString() + '-' + columnCounter.toString() + '-' + j.toString(), 
    						type: 'special', 
    						position: { x: hexCords[j].x, y: hexCords[j].y, },
    						data: { color: 'rgba(0,0,0,0.0)' },
    						className: 'test'
    					})
    					intersectionArray.push({
    						id: (rowIndex+1).toString() + '-' + columnCounter.toString() + '-' + j.toString(),
    						owner: '',
    						data: []
    					})
    				}
    			}

    			columnCounter++;
    			columnIndex++;
    		}
    		if(columnCounter > rowArray[rowIndex]) {
    			rowIndex++;
    			columnIndex = 0;
    			columnCounter = 1;
    		}
    		let x_2 = (window.innerWidth/3)+(((columnIndex+1)+this.getXOffsetMultiplier(rowIndex, columnIndex))*xMultiplier)
    		let y_2 = window.innerHeight/4+(rowIndex*yMultiplier)
    		let hexCords_2 = this.getHexCoordinates(x_2,y_2);

    		for(let j = 0; j < hexCords_2.length; j++) {
    			let nodeExists = this.nodeAlreadyExists(hexCords_2[j].x, hexCords_2[j].y, 5, nodeArray)
    			if(!nodeExists.bool) {
    				nodeArray.push({
    					id: (rowIndex+1).toString() + '-' + columnCounter.toString() + '-' + j.toString(),
    					type: 'special', 
    					position: { x: hexCords_2[j].x, y: hexCords_2[j].y },
    					data: { color: 'rgba(0,0,0,0.0)' },
    					className: 'test'
    				})
    				intersectionArray.push({
    					id: (rowIndex+1).toString() + '-' + columnCounter.toString() + '-' + j.toString(),
						owner: '',
						data: [ { [typeArray[i]]: valueArray[i]} ]
    				})
    			} else {
    				let currentIntersectionIndex = this.findIntersection(nodeExists.alreadyExistingNode.id, intersectionArray)
    				if(currentIntersectionIndex !== -1) {
    					intersectionArray[currentIntersectionIndex].data.push({ [typeArray[i]]: valueArray[i] })
    				}
    			}
    		}

			piecesArray.push({
						"id": (foundRandomNum) ? i+1 : i,
						"type": typeArray[i],
						"value": valueArray[i],
						"hexagonX": x_2, 
						"hexagonY": y_2,
						"textX": ((window.innerWidth/xDivisor)+((columnIndex+1)+this.getXOffsetMultiplier(rowIndex, columnIndex))*xMultiplier),
						"textY": window.innerHeight/yDivisor+(rowIndex*yMultiplier)
					})
			columnCounter++;
			columnIndex++;
    	}
    	//insert blank piece at random index
    	//piecesArray.splice(Math.floor(Math.random()*piecesArray.length),0,{"type": "blank", "value": 0, "offset": 0})

    	for(let i = 0; i < nodeArray.length; i++) {
    		var currentNode = nodeArray[i];
    		for(let j = i+1; j < nodeArray.length; j++) {
    			var otherNode = nodeArray[j]
    			var distance = Math.sqrt(Math.pow(otherNode.position.x-currentNode.position.x,2)+Math.pow(otherNode.position.y-currentNode.position.y,2))
				if(distance < 55) { //adding buffer of 5 px
					edgeArray.push({
						id: i.toString() + '-' + j.toString(), 
						source: currentNode.id, 
						target: otherNode.id, 
						type: 'straight', 
						style:{stroke:'orange',strokeWidth:5},
						className: 'test'
					})
					pathArray.push({
						id: i.toString() + '-' + j.toString(),
						owner: ''
					})
	    		}
	    	}
	    }

    	return {
    		'piecesArray': piecesArray,
    		'nodeArray': nodeArray, 
    		'edgeArray': edgeArray, 
    		'elements': nodeArray.concat(edgeArray),
    		'intersectionArray': intersectionArray,
    		'pathArray': pathArray
    	};
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
		var image = new Image(50,50)
		var landImage = require('../img/lands/'+imageName+'.png').default
		image.src = landImage
		return image
	},

	getPlayers: function(numberOfPlayers) {
		var players = []
		var colors = ['Blue', 'Red', 'White', 'Orange'];
		for(let i = 0; i < numberOfPlayers; i++) {
			var playerColor = colors[i];
			players.push({
				name: playerColor,
				roads: 15,
				settlements: 5,
				cities: 4,
				hand: [],
				points: 0
			})
		}
		return players
	},

	getPlayerIndexByName: function(playerName) {
		if(playerName === 'Red') { return 1 }
		if(playerName === 'White') { return 2 }
		if(playerName === 'Orange') { return 3 }
		return 0;
	},

	getCard: function(cardType) {
		var cardImage = require('../img/cards/resources/'+cardType+'.jpg').default
		return cardImage
	},

	getIntersectionsFromValue(value, intersectionArray) {
		var returnArray = []
		for(let intersection in intersectionArray) {
			for(let val in intersection.values) {
				if(value === val) {
					returnArray.push(intersection)
				}
			}
		}
		return returnArray;
	}

}

export default helpers;