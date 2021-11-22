import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import catanHelper from '../assets/js/catanHelper'
import '../assets/css/react-catan.css';

const customNameStyle = function(color) {
    return {
        color: color
    }
};

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
        <div>
 		<Row>
            <Col>
                { this.props.player.name } - Points: {this.props.player.points}
            </Col>
        </Row>

        <Row>
            <Col>
                Buildings Remaining: 
                Roads: x{this.props.player.roads} 
                Settlments: x{this.props.player.settlements} 
                Cities: x{this.props.player.cities}
            </Col>
        </Row>

        <Row>
            <Col>
                Cards:
                {
                    this.props.player.hand.map((card) => (
                        
                            <img src={catanHelper.getCard(card)} class="card-image" alt="" />
                        
                    ))
                }
            </Col>
        </Row>
        </div>
 	);
 };
}

export default PlayerHand;