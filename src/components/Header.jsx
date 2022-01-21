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
      <header className="w-full flex items-center justify-evenly mt-5">
        <img
          className="w-20 h-20 rounded-full mr-4"
          src={ urlImage }
          alt="profile-img"
          data-testid="header-profile-picture"
        />
        <div>
        <p className="text-gray-700 text-sm font-bold mt-2"> Player</p>
        <p className="text-gray-700" data-testid="header-player-name">
          { userName }
        </p>
        </div>
        <div>
        <p className="text-gray-700 text-sm font-bold mt-2"> Points </p>
        <p className="text-gray-700" data-testid="header-score">
          { score }
        </p>
        </div>
      </header>
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
