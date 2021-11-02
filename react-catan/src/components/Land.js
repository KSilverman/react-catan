import React from 'react'
import '../assets/css/react-catan.css';
import {Row, Col} from 'react-bootstrap';
import { Stage, Layer, RegularPolygon, Image, Group, Text } from 'react-konva';
import Konva from 'konva';
import catanHelper from '../assets/js/catanHelper'

class Land extends React.Component {
/**
 * Creates an instance of Land.
 *
 * @author [Kyle Silverman](https://github.com/KSilverman)
 * @param {props} attributes defined by parent component.
 */
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
	        	<Group>
		          	<RegularPolygon
		          		x={window.innerWidth/3 + (this.props.xOffset*87)}
		          		y={window.innerHeight/4 + (this.props.yOffset*75)}
		          		sides={6}
		          		radius={50}
		          		fill={catanHelper.getLandColor(this.props.type)}
		          		
		          		stroke="black"
		          	/>
		          	<Text					          		
		          		fontSize={20}
			            text={this.props.value + "\n" + catanHelper.getLandDots(this.props.value)}
			            x={window.innerWidth/3.08 + (this.props.xOffset*87)}
			            y={window.innerHeight/4.5 + (this.props.yOffset*75)}
			            strokeWidth={1}
			            align="center"
		          	/>
	          	</Group>	      	
			</div>
		);
	};
}

export default Land;