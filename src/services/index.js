import md5 from 'crypto-js/md5';

export const fetchTokenTrivia = async () => {
  const getToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const responseJson = await getToken.json();
  return responseJson.token;
};

export const fetchQuestionsTrivia = async (token) => {
  const getQuestions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const responseJson = await getQuestions.json();
  return responseJson;
};

export const getGravatarImage = (email) => {
  const hash = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hash}`;
};

export const fetchCategories = async () => {
  const getCategories = await fetch('https://opentdb.com/api_category.php');
  const responseJson = await getCategories.json();
  return responseJson.trivia_categories;
};

export const fetchQuestionsWithPreferences = (
  async (category, difficulty, type, token) => {
    const chosenCategory = category === '' ? category : `&category=${category}`;
    const chosenDifficulty = difficulty === '' ? difficulty : `&difficulty=${difficulty}`;
    const chosenType = type === '' ? type : `&type=${type}`;
    const fetchQuestions = await fetch(`https://opentdb.com/api.php?amount=5${chosenCategory}${chosenDifficulty}${chosenType}&token=${token}`);
    const responseJson = await fetchQuestions.json();
    return responseJson;
  });
