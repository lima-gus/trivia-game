import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTokenTrivia } from '../services';
import { resetUserData } from '../redux/actions';
import logo from '../trivia.png';

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
      <div className="w-full flex h-screen">
        <div className="m-auto">
          <img src={logo} className="mt-10 max-h-40" alt="logo" />
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                htmlFor="input-player-name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
                <input
                  className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  id="input-player-name"
                  data-testid="input-player-name"
                  value={name}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                htmlFor="input-gravatar-email"
                className="block text-gray-700 text-sm font-bold mb-2">
                E-mail:
                <input
                  className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  id="input-gravatar-email"
                  data-testid="input-gravatar-email"
                  value={email}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="flex items-center justify-evenly">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                data-testid="btn-play"
                disabled={isButtonDisabled}
                onClick={this.handleClick}
              >
                Play
              </button>
              <Link to="/settings">
                <button
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  type="button"
                  data-testid="btn-settings"
                >
                  Settings
                </button>
              </Link>
            </div>
          </form>
        </div>
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
