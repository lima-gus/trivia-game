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
      <div>
        <h1 data-testid="settings-title"> Configurações </h1>
        <form>
          <label htmlFor="categories">
            Selecione a categoria:
            <select name="category" id="category" onChange={ this.handleChange }>
              <option defaultValue="">Todas</option>
              {categories.map(({ id, name }) => (
                <option key={ id } value={ id }>{ name }</option>))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Selecione a dificuldade:
            <select name="difficulty" id="difficulty" onChange={ this.handleChange }>
              <option defaultValue="">Todas</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            Selecione o tipo:
            <select name="questionsType" id="type" onChange={ this.handleChange }>
              <option defaultValue="">Todos</option>
              <option value="multiple">Múltipla escolha</option>
              <option value="boolean">Verdadeiro ou falso</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Enviar
          </button>
        </form>
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
