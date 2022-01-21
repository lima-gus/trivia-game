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
      <div className="w-full flex h-screen">
        <div className="m-auto">
          <h1
            className="uppercase text-gray-700 text-xs font-bold mb-2"
            data-testid="ranking-title"
          >
            Ranking
          </h1>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {ranking.map((person, index) => (
              <div
                className="bg-gray-100 flex items-center mt-3 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                key={index}>
                <img className="w-20 h-20 rounded-full mr-4" src={person.picture} alt="ranking person" />
                <div className="text-sm">
                  <div>
                    <p className="text-gray-700 text-sm font-bold mt-2">Name</p>
                    <p className="text-gray-700" data-testid={`player-name-${index}`}> {person.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm font-bold mt-2">Points</p>
                    <p className="text-gray-700" data-testid={`player-score-${index}`}>{person.score}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-5">
              <Link to="/">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  data-testid="btn-go-home"
                >
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ranking;
