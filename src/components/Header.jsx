import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveGravatarUrlImage, saveUserName } from '../redux/actions';
import { getGravatarImage } from '../services';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleGravatarImage = this.handleGravatarImage.bind(this);
  }

  componentDidMount() {
    this.handleGravatarImage();
  }

  handleGravatarImage() {
    const getStateStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { gravatarEmail, name } } = getStateStorage;
    const urlImage = getGravatarImage(gravatarEmail);
    const { urlGravatarImage, saveName } = this.props;
    urlGravatarImage(urlImage);
    saveName(name);
  }

  render() {
    const { urlImage, userName, score } = this.props;
    return (
      <div>
        <img
          src={ urlImage }
          alt="profile-img"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          Jogador:
          {' '}
          { userName }
        </h3>
        <h3>
          Ponto:
        </h3>
        <h3 data-testid="header-score">
          { score }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = ({ game: { score, urlImage, userName } }) => ({
  score,
  urlImage,
  userName,
});

const mapDispatchToProps = (dispatch) => ({
  urlGravatarImage: (url) => dispatch(saveGravatarUrlImage(url)),
  saveName: (name) => dispatch(saveUserName(name)),
});

Header.propTypes = {
  score: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  urlGravatarImage: PropTypes.func.isRequired,
  saveName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
