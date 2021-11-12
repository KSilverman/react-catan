import React from 'react'
import '../assets/css/react-catan.css';
import { Container, Row, Col } from 'react-bootstrap';
import Land from '../components/Land'
import Board from '../components/Board'
import catanHelper from '../assets/js/catanHelper'
import nodesAndEdges from '../assets/js/nodesAndEdges'


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
 		landArray: catanHelper.getLands(),
 		elements: nodesAndEdges.getAllElements(nodesAndEdges.getAllNodes(),nodesAndEdges.getAllEdges())		
 	}
 }

 render() {
 	return(
 		<Container fluid>
 			<Board  
                landArray={this.state.landArray} 
                elements={this.state.elements} 
            />	
      	</Container>
 	);
 };
}

export default Game;