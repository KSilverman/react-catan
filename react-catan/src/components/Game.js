import React from 'react'
import '../assets/css/react-catan.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { Stage, Layer, RegularPolygon, Image, Group, Text } from 'react-konva';
import Land from '../components/Land'
import catanHelper from '../assets/js/catanHelper'

/** @class Game representing a Catan game. */
class Game extends React.Component {
/**
 * Creates an instance of a Catan game.
 *
 * @author [Kyle Silverman](https://github.com/KSilverman)
 * @param {props} attributes defined by parent component.
 */

 constructor(props) {
 	super(props);

 	this.state = {
 		landArray: catanHelper.getLands()
 	}
 }

 render() {
 	return(
 		<Container fluid>
 		<Row>
 			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
	 			{
	 				this.state.landArray.map(land => (
	 					<Col className="outline">
	 						<Land type={land.type} value={land.value} xOffset={land.xOffset} yOffset={land.yOffset}/>
	 					</Col>
	 				))
	 			}
 				</Layer>
 			</Stage>
 		</Row>
      	</Container>
 	);
 };
}

export default Game;