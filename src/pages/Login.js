import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTokenTrivia } from '../services';
import { resetUserData } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isButtonDisabled: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { resetUser } = this.props;
    resetUser();
  }

  validateButton() {
    const { name, email } = this.state;
    if (name.length && email.length) {
      this.setState({
        isButtonDisabled: false,
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  async handleClick() {
    const token = await fetchTokenTrivia();
    localStorage.setItem('token', token);
    const { name, email: gravatarEmail } = this.state;
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              type="text"
              name="name"
              id="input-player-name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              type="email"
              name="email"
              id="input-gravatar-email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>

        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configs
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetUser: () => dispatch(resetUserData()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
