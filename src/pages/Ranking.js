import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: [],
    };

    this.getRanking = this.getRanking.bind(this);
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = this.rankingSorter(ranking);
    this.setState({
      ranking: sortedRanking,
    });
  }

  rankingSorter(ranking) {
    return ranking.sort((a, b) => b.score - a.score);
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        { ranking.map((person, index) => (
          <div key={ index }>
            <img src={ person.picture } alt="ranking person" />
            <h3 data-testid={ `player-name-${index}` }>{ person.name }</h3>
            <h3 data-testid={ `player-score-${index}` }>{ person.score }</h3>
          </div>
        )) }
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
