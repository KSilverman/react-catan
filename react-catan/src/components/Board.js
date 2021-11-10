import React from 'react'
import '../assets/css/react-catan.css';
import { Container, Row, Col } from 'react-bootstrap';
import ReactFlow, { Handle } from 'react-flow-renderer';
import { Stage, Layer, RegularPolygon, Image, Group, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import Land from '../components/Land'
import catanHelper from '../assets/js/catanHelper'
import nodesAndEdges from '../assets/js/nodesAndEdges'

const customNodeStyles = {
	background: 'pink',
	border: '1px solid blue',
	padding: 7,
	borderRadius: 50,
};

const customHandleStyle = {
	visibility: 'hidden',
	margin: '2px'
}

const CustomNodeComponent = ({ data }) => {
	return (
		<div style={customNodeStyles}>
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
	}

	componentDidMount() {
	    window.addEventListener("resize", this.onLoad);
	}

	  componentWillUnmount() {
	    window.removeEventListener("resize", this.onLoad);
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
	 			 <ReactFlow 
	 			 		style={{ height: window.innerHeight, 
	 			 			width: window.innerWidth, 
	 			 			marginTop: -(window.innerHeight),
	 			 			top: 0,
	 			 			left: 0,
	 			 			
	 			 		}}
	 			 		
				   		elements={this.props.landArray.nodeArray} 
				   		nodesConnectable={false}
				   		nodesDraggable={false}
				   		paneMoveable={false}
				   		zoomOnScroll={false}
				   		zoomOnDoubleClick={false}
				   		nodeTypes={nodeTypes}
				   	/>
				   	
			</div>
		);
	};
}

/*
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
*/

export default Board;