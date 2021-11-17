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

	//TODO: fill each regular polygon (hexagon) with picture

	render() {
		return (
			<div>
	        	<Group>
		          	<RegularPolygon
		          		x={this.props.hexagonX}
		          		y={this.props.hexagonY}
		          		sides={6}
		          		radius={50}
		          		fill={catanHelper.getLandColor(this.props.type)}
		          		fillPatternImage={catanHelper.getLandPNG(this.props.type)}
		          		stroke="black"
		          	/>
		          	<Text					          		
		          		fontSize={20}
			            text={this.props.value + "\n" + catanHelper.getLandDots(this.props.value)}
			            x={this.props.textX}
			            y={this.props.textY}
			            strokeWidth={1}
			            align="center"
		          	/>
	          	</Group>
			</div>
		);
	};
}

export default Land;