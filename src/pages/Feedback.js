import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: 0,
      score: 0,
    };
    this.restorePlayer = this.restorePlayer.bind(this);
  }

  componentDidMount() {
    this.restorePlayer();
    this.setRanking();
  }

  setRanking() {
    const { userName, urlImage, score } = this.props;
    const currentRanking = localStorage.getItem('ranking');
    const newRankingEntry = { name: userName, score, picture: urlImage };
    if (currentRanking === null) {
      localStorage.setItem('ranking', JSON.stringify([newRankingEntry]));
    } else {
      const currentRankingArray = JSON.parse(currentRanking);
      const newRanking = [...currentRankingArray, newRankingEntry];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  restorePlayer() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.setState({ score: player.score, assertions: player.assertions });
  }

  returnFeedback(phrase) {
    const { score, assertions } = this.state;
    return (
      <div>
        <Header />
        <div className="w-full flex h-96">
          <div className="m-auto">
            <h1 className="uppercase text-gray-700 text-xs font-bold mb-2"> Feedback </h1>
            <div className="bg-white w-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <p data-testid="feedback-text">{phrase}</p>
              <div className="mt-3">
                <p data-testid="feedback-total-question">{`${'You got'} ${assertions} ${'questions right'}`}</p>
              </div>
              <div className="mt-3 mb-3">
                <p data-testid="feedback-total-score"> {`${'Total of'} ${score} ${'points'}`}</p>
              </div>
              <div className="inline-flex">
                <Link to="/ranking">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                    type="button"
                    data-testid="btn-ranking"
                  >
                    Leaderboard
                  </button>
                </Link>
                <Link to="/">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                    type="button"
                    data-testid="btn-play-again"
                  >
                    Play Again!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { userName } = this.props;
    console.log(userName);
    const MIN_QUESTIONS = 3;
    const { assertions } = this.state;
    return (
      <div>
        {assertions < MIN_QUESTIONS
          ? (
            this.returnFeedback('Could be better 😞')
          )
          : (
            this.returnFeedback('Nice job! 😄')
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ game: { userName, urlImage, score } }) => ({
  userName,
  urlImage,
  score,
});

Feedback.propTypes = {
  userName: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
