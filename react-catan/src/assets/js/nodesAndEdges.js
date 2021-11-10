const nodesAndEdges = {

	getAllNodes: function() {
		var nodes = [
			{ id: '1-1', type: 'special', position: { x: 220, y: 208 }},
			{ id: '1-2', type: 'special', position: { x: 310, y: 210 }},
			{ id: '1-3', type: 'special', position: { x: 397, y: 210 }},
			{ id: '2-1', type: 'special', position: { x: 175, y: 230 }},
			{ id: '2-2', type: 'special', position: { x: 265, y: 230 }},
		]
		return nodes;
	},

	getAllEdges: function() {
		var edges = [
			{ id: '2-1-1-1', source: '2-1', target: '1-1', type: 'straight', style:{stroke:'orange',strokeWidth:5}},
			{ id: '2-2-1-1', source: '1-1', target: '2-2', type: 'straight', style:{stroke:'orange',strokeWidth:5}},
		]
		return edges
	},

	getAllElements: function(nodeArray, edgeArray) {
		return nodeArray.concat(edgeArray)
	}

}

export default nodesAndEdges;