import React from 'react'
import { connect } from 'react-redux'

export class ScoreBoard extends React.Component {

    render() {
        return <div>{JSON.stringify(this.props.score)}</div>
    }
}

const mapStateToProps = (state) => {
  return {
    score: state.score
  }
}

export default connect(
  mapStateToProps
)(ScoreBoard)