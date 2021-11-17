import React from 'react'
import '../assets/css/react-catan.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Land from '../components/Land'
import Board from '../components/Board'
import PlayerHand from '../components/PlayerHand'
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
        	players: catanHelper.getPlayers(this.props.numberOfPlayers),
            currentRoll: 0,
            currentTurn: 0
        }

        this.rollDice = this.rollDice.bind(this)
        this.endTurn = this.endTurn.bind(this)
    }

    rollDice() {
        let num1 = Math.floor(Math.random() * 6) + 1
        let num2 = Math.floor(Math.random() * 6) + 1
        this.setState(state => ({currentRoll: num1+num2}))
    }

    endTurn(index) {
        let currentTurn = this.state.currentTurn
        let nextTurn = (currentTurn < this.props.numberOfPlayers-1) ? currentTurn+1 : 0
        this.setState(state => ({currentTurn: nextTurn}))
    }

    render() {
     	return(
     		<Container fluid>
                <Row>
                    <Col> 
                        Current Roll: {this.state.currentRoll} 
                        <Button onClick={this.rollDice} variant="warning">Roll</Button>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.players.map((player, index) => (
                            <Col className="outline">
                                <Row>
                                    <Col>
                                        Points: { player.points }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Hand: { player.hand }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="danger" 
                                                onClick={() => this.endTurn(index)}
                                                disabled={index !== this.state.currentTurn}>
                                            End Turn
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
                <Row>
                    <Col>
             			<Board  
                            landArray={this.state.landArray} 
                            players={this.state.players}
                            currentTurn={this.state.currentTurn}
                        />
                    </Col>
                </Row>
          	</Container>
     	);
     };
}

export default Game;