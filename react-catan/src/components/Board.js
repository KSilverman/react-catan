import React from 'react'
import '../assets/css/react-catan.css';
import { Container, Row, Col } from 'react-bootstrap';
import ReactFlow, { ReactFlowProvider, Handle, isNode, getConnectedEdges  } from 'react-flow-renderer';
import { Stage, Layer, RegularPolygon, Image, Group, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import Land from '../components/Land'
import catanHelper from '../assets/js/catanHelper'
import nodesAndEdges from '../assets/js/nodesAndEdges'

const customNodeStyles = function(color) {
	return {
		background: color,
		border: '1px solid blue',
		padding: 5,
		borderRadius: 50,
		marginTop: -4,
		marginLeft: -5 
	}
};

const customHandleStyle = {
	visibility: 'hidden',
	margin: '2px'
}

const CustomNodeComponent = ({ data }) => {
	return (
		<div style={customNodeStyles(data.color)}>
		    <Handle type="source" position="right" style={customHandleStyle} />
		    <Handle type="target" position="left" style={customHandleStyle} />
		</div>
	);
};

const nodeTypes = {
	special: CustomNodeComponent,
};

const mystyle = {
  height: '100%',
  width: '100%'
};

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

class Board extends React.Component {
/**
 * Creates an instance of a Catan Board.
 *
 * @author [Kyle Silverman](https://github.com/KSilverman)
 * @param {props} attributes defined by parent component.
 */
	constructor(props) {
		super(props);
		this.state = {
			elements: this.props.landArray.elements,
			nodes: this.props.landArray.nodeArray,
			edges: this.props.landArray.edgeArray,
			intersections: this.props.landArray.intersectionArray
		}

		this.onElementClick = this.onElementClick.bind(this)
	}

	componentDidMount() {
	    window.addEventListener("resize", this.onLoad);
	}

	componentWillUnmount() {
	    window.removeEventListener("resize", this.onLoad);
	}

	getIntersectionByID(id) {
		let intersections = this.state.intersections
		for(let i = 0; i < intersections.length; i++) {
			if(intersections[i].id === id) { return intersections[i] }
		}
		return null
	}

	onElementClick(event, element) {
		var newElements = []
		var currentPlayer = this.props.players[this.props.currentTurn]
		this.state.elements.map((elem) => {
			if(element.id === elem.id) {
				if(isNode(elem)) {
					let currentIntersectionIndex = catanHelper.findIntersection(elem.id, this.state.intersections)
					if(this.state.intersections[currentIntersectionIndex].owner === '') {
						let newColor = currentPlayer.name
						elem.data.color = newColor
						this.state.intersections[currentIntersectionIndex].owner = currentPlayer.name
						console.log(this.getIntersectionByID(elem.id))
					}
				} else {
					elem.style = {stroke:'white',strokeWidth:5}
				}
			}
			newElements.push(elem)
		});
		this.setState(state => ({elements: newElements, intersections: this.state.intersections}))
		
	}



	render() {
		return (
			<div>
			<Stage width={window.innerWidth} height={window.innerHeight}>
					<Layer>
		 			{
		 				this.props.landArray.piecesArray.map(land => (
		 					<Col className="outline">
		 						<Land 
		 							id={land.id}
		 							type={land.type} 
		 							value={land.value} 
		 							hexagonX={land.hexagonX}
		 							hexagonY={land.hexagonY}
		 							textX={land.textX}
		 							textY={land.textY}
		 						/>
		 					</Col>
		 				))
		 			}
	 				</Layer>
	 			</Stage>
	 			<ReactFlowProvider>
		 			<ReactFlow 
	 			 		style={{ 
	 			 			height: window.innerHeight, 
	 			 			width: window.innerWidth, 
	 			 			marginTop: -(window.innerHeight),
	 			 			top: 0,
	 			 			left: 0,			
	 			 		}}
	 			 		
				   		elements={this.state.elements} 
				   		nodesConnectable={false}
				   		nodesDraggable={false}
				   		paneMoveable={false}
				   		zoomOnScroll={false}
				   		zoomOnDoubleClick={false}
				   		nodeTypes={nodeTypes}
				   		elementsSelectable={true}
				   		connectionMode={'loose'}
				   		onElementClick={this.onElementClick}
					/>
				</ReactFlowProvider>
			</div>
		);
	};
}

export default Board;