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
        <p data-testid="feedback-text">{ phrase }</p>
        <span>
          Você acertou
          <p data-testid="feedback-total-question">{ assertions }</p>
          questões
        </span>
        <span>
          Um total de
          <p data-testid="feedback-total-score">{ score }</p>
          pontos
        </span>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
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
        { assertions < MIN_QUESTIONS
          ? (
            this.returnFeedback('Podia ser melhor...')
          )
          : (
            this.returnFeedback('Mandou bem!')
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
