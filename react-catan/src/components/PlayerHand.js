import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import '../assets/css/react-catan.css';


/** @class Game representing a Catan game. */
class PlayerHand extends React.Component {
/**
 * Creates an instance of a Path on a Catan board.
 *
 * @author [Kyle Silverman](https://github.com/KSilverman)
 * @param {props} attributes defined by parent component.
 */

 constructor(props) {
 	super(props);
 }

 render() {
 	return(
 		<Col className="outline">
            <Row>
                <Col>
                    { this.props.hand }
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button>End Turn</Button>
                </Col>
            </Row>
        </Col>
 	);
 };
}

export default PlayerHand;