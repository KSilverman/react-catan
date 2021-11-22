import React from 'react'
import '../assets/css/react-catan.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Land from '../components/Land'
import Board from '../components/Board'
import PlayerHand from '../components/PlayerHand'
import catanHelper from '../assets/js/catanHelper'
import nodesAndEdges from '../assets/js/nodesAndEdges'

const customNameStyle = function(color) {
    return {
        color: color
    }
};

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
            currentTurn: 0,
            isRolled: false
        }

        this.rollDice = this.rollDice.bind(this)
        this.endTurn = this.endTurn.bind(this)
        this.buildRoad = this.buildRoad.bind(this)
        this.buildSettlement = this.buildSettlement.bind(this)
        this.buildCity = this.buildCity.bind(this)
        this.giveDevCard = this.giveDevCard.bind(this)
    }

    rollDice() {
        let num1 = Math.floor(Math.random() * 6) + 1
        let num2 = Math.floor(Math.random() * 6) + 1
        let newRoll = num1+num2;
        let updatedPlayers = this.state.players

        for(let i = 0; i < this.state.intersections; i++) {
            let intersection = this.state.intersections[i];
            if(intersection.owner !== '') {
                let intersectionValues = Object.keys(intersection.data)
                for(let j = 0; j < intersection.data.length; j++) {
                    console.log(intersectionValues[j])
                    if(intersectionValues[j] == newRoll) {
                        //add first entry (the value) to player hand
                        console.log("yes")
                        updatedPlayers[catanHelper.getPlayerIndexByName(intersection.owner)].hand.push(intersection.data[j][0]) 
                    }
                }
            }
        }

        console.log(updatedPlayers)

        this.setState(state => ({currentRoll: newRoll, players: updatedPlayers, isRolled: true}))
    }

    endTurn(index) {
        let currentTurn = this.state.currentTurn
        let nextTurn = (currentTurn < this.props.numberOfPlayers-1) ? currentTurn+1 : 0
        this.setState(state => ({currentTurn: nextTurn, isRolled: false}))
    }

    buildRoad(index) {

    }

    buildSettlement(index) {

    }

    buildCity(index) {

    }

    giveDevCard(index) {

    }

    render() {
     	return(
     		<Container fluid>
                <Row>
                    <Col> 
                        Current Roll: {this.state.currentRoll} 
                        <Button onClick={this.rollDice} variant="info">Roll</Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                    {
                        this.state.players.map((player, index) => (
                            <Row className="outline" style={customNameStyle(player.name)}>
                                <PlayerHand player={player} />
                                <Row>
                                    Actions:
                                    <Col>
                                        <Button variant="primary" 
                                                onClick={() => this.buildRoad(index)}
                                                disabled={index !== this.state.currentTurn}>
                                            Road
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="success" 
                                                onClick={() => this.buildSettlement(index)}
                                                disabled={index !== this.state.currentTurn}>
                                            Settlement
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="warning" 
                                                onClick={() => this.buildCity(index)}
                                                disabled={index !== this.state.currentTurn}>
                                            City
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="light" 
                                                onClick={() => this.giveDevCard(index)}
                                                disabled={index !== this.state.currentTurn}>
                                            Dev Card
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" 
                                                onClick={() => this.endTurn(index)}
                                                disabled={index !== this.state.currentTurn}>
                                            End Turn
                                        </Button>
                                    </Col>
                                </Row>
                            </Row>
                        ))
                    }
                    </Col>
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