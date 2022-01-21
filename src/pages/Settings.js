import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSettings } from '../redux/actions';
import { fetchCategories } from '../services';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: '',
      difficulty: '',
      questionsType: '',
    };
    this.renderCategoriesOptions = this.renderCategoriesOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.renderCategoriesOptions();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { category, difficulty, questionsType } = this.state;
    const { setPreferences } = this.props;
    setPreferences([category, difficulty, questionsType]);
    const { history } = this.props;
    history.push('/');
  }

  async renderCategoriesOptions() {
    const categories = await fetchCategories();
    this.setState({
      categories,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="w-full flex h-screen">
        <div className="m-auto">
          <h1
            className="uppercase text-gray-700 text-xs font-bold mb-2"
            data-testid="settings-title"
          > Settings </h1>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="relative">
              <label
                htmlFor="categories"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Category
                <select
                  className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="category"
                  id="category"
                  onChange={this.handleChange}
                >
                  <option defaultValue="">All</option>
                  {categories.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>))}
                </select>
              </label>
            </div>
            <div>
              <label
                htmlFor="difficulty"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Difficulty
                <select
                  className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="difficulty"
                  id="difficulty"
                  onChange={this.handleChange}
                >
                  <option defaultValue="">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Types
                <select
                  className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="questionsType"
                  id="type"
                  onChange={this.handleChange}
                >
                  <option defaultValue="">All</option>
                  <option value="multiple">Multiple choice</option>
                  <option value="boolean">True of False</option>
                </select>
              </label>
            </div>
            <div className="flex justify-center mt-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={this.handleClick}
              >
                Set
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPreferences: (state) => dispatch(getSettings(state)),
});

Settings.propTypes = {
  setPreferences: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
