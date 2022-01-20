import { UPDATE_SCORE,
  SAVE_URL_IMAGE,
  SAVE_USER_NAME,
  RESET_DATA,
  GET_PREFERENCES } from './actionTypes';

export const updateScoreAction = (score) => ({
  type: UPDATE_SCORE,
  score,
});

export const saveGravatarUrlImage = (urlImage) => ({
  type: SAVE_URL_IMAGE,
  urlImage,
});

export const saveUserName = (userName) => ({
  type: SAVE_USER_NAME,
  userName,
});

export const resetUserData = () => ({
  type: RESET_DATA,
});

export const getSettings = ([category, difficulty, questionsType]) => ({
  type: GET_PREFERENCES,
  category,
  difficulty,
  questionsType,
});
