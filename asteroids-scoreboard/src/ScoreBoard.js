import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

export class ScoreBoard extends React.Component {

    render() {

        const renderStat = (name, value, description) => {
            return <div>
                        <h3>{name}</h3>
                        <h2>{value}</h2>
                        <h4>{description}</h4>
                    </div>
        } 

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Most Accurate</h3>
                                    </div>
                                    <div className="panel-body">
                                        {this.props.mostAccurate && renderStat(
                                            this.props.mostAccurate.name,
                                            this.props.mostAccurate.accuracy.toFixed(1) + '%'
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Least Accurate</h3>
                                    </div>
                                    <div className="panel-body">
                                        {this.props.leastAccurate && renderStat(
                                            this.props.leastAccurate.name,
                                            this.props.leastAccurate.accuracy.toFixed(1) + '%'
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Most treacherous</h3>
                                    </div>
                                    <div className="panel-body">
                                        {this.props.mostTreacherous && renderStat(
                                            this.props.mostTreacherous.name,
                                            this.props.mostTreacherous.killedFriend,
                                            'friendly kills'
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Rock hunter</h3>
                                    </div>
                                    <div className="panel-body">
                                        {this.props.rockHunter && renderStat(
                                            this.props.rockHunter.name,
                                            this.props.rockHunter.shotAsteroid,
                                            'rocks blown up'
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Highest kills</h3>
                                    </div>
                                    <div className="panel-body">
                                        {this.props.highestKills && renderStat(
                                            this.props.highestKills.name,
                                            this.props.highestKills.shotAsteroid,
                                            'enemies and rocks blown up'
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">Survivor</h3>
                                    </div>
                                    <div className="panel-body">
                                        {this.props.survivor && renderStat(
                                            this.props.survivor.name,
                                            this.props.survivor.died,
                                            'deaths'
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">High score</h3>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Accuracy</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.highScore.map((player) => (
                                            <tr key={player.name}>
                                                <td>{player.name}</td>
                                                <td>{player.accuracy.toFixed(1)}%</td>
                                                <td>{player.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                
                {JSON.stringify(this.props.highScore)}
            </div>
        )
    }
}

// {"ECU":{"score":25,"fired":86,"Friend":26,"shotAsteroid":5,"hitByAsteroid":1},"OPW":{"score":20,"died":6,"Friend":3,"fired":69,"shotAsteroid":4},"NCH":{"score":10,"died":13,"fired":18,"hitByAsteroid":2,"Friend":3,"shotAsteroid":2},"GTV":{"score":15,"fired":88,"Friend":2,"shotAsteroid":3,"died":2},"UXL":{"score":5,"fired":48,"died":14,"Friend":1,"shotAsteroid":1,"hitByAsteroid":1}}

// <table className="table table-striped">
//     <tr>
//         <th>Name</th>
//         <th>Score</th>
//         <th>Fired</th>
//         <th>Friendly kills</th>
//         <th>Enemy kills</th>
//         <th>Deaths by bullet</th>
//         <th>Deaths by rock</th>
//     </tr>
//     {this.props.highScore.map((player) => (
//         <tr key={player.name}>
//             <td>{player.name}</td>
//             <td>{player.score}</td>
//             <td>{player.fired}</td>
//             <td>{player.killedFriend}</td>
//             <td>{player.killedEnemy}</td>
//             <td>{player.died}</td>
//             <td>{player.hitByAsteroid}</td>
//         </tr>
//     ))}
// </table>

const getAccuracy = (player) => {
    return ((player.killedEnemy || 0) + (player.shotAsteroid || 0)) / (player.fired || 1)
} 

const mapStateToProps = (state) => {
    const highScore = _.map(state.score, (value, prop) => {
        return { ...value, name: prop, accuracy: getAccuracy(value)*100 }
    }).sort((a, b) => b.score - a.score)

    return {
        highScore: highScore,
        mostAccurate: _.maxBy(highScore, function(o){return o.accuracy}),
        leastAccurate: _.minBy(highScore, function(o){return o.accuracy}),
        mostTreacherous: _.maxBy(highScore, function(o){return o.killedFriend}),
        rockHunter: _.maxBy(highScore, function(o){return o.shotAsteroid}),
        highestKills: _.maxBy(highScore, function(o){return o.shotAsteroid + o.killedEnemy}),
        survivor: _.minBy(highScore, function(o){return o.died}),
        score: state.score
    }
}

export default connect(
  mapStateToProps
)(ScoreBoard)