import { UPDATE_SCORE,
  SAVE_URL_IMAGE,
  SAVE_USER_NAME,
  RESET_DATA,
  GET_PREFERENCES } from '../actions/actionTypes';

const INITIAL_STATE = {
  score: 0,
  urlImage: '',
  userName: '',
  category: '',
  difficulty: '',
  type: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return ({
      ...state,
      score: action.score,
    });
  case SAVE_URL_IMAGE:
    return ({
      ...state,
      urlImage: action.urlImage,
    });
  case SAVE_USER_NAME:
    return ({
      ...state,
      userName: action.userName,
    });
  case RESET_DATA:
    return ({
      ...state,
      score: 0,
      urlImage: '',
      userName: '',
    });
  case GET_PREFERENCES:
    return ({
      ...state,
      category: action.category,
      difficulty: action.difficulty,
      type: action.questionsType,
    });
  default:
    return state;
  }
};

export default game;
