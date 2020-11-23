const URL_BASE_DEV = "http://localhost:3000";

const login = () => {
  fetch(`${URL_BASE_DEV}/auth/login`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

/**
 * COACHES
 */
const getCoaches = async () => {
  const response = await fetch(`${URL_BASE_DEV}/coaches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
};

/**
 * IDEAS
 */
const addIdea = async (idea) => {
  const response = await fetch(`${URL_BASE_DEV}/ideas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(idea),
  });

  const data = await response.json();

  return data;
};

const getIdeas = async (token) => {
  const response = await fetch(`${URL_BASE_DEV}/ideas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

const getIdeasById = async (token, id) => {
  const response = await fetch(`${URL_BASE_DEV}/ideas/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

/**
 * USERS
 */
const getUsers = async () => {
  const response = await fetch(`${URL_BASE_DEV}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

export { login, getCoaches, addIdea, getIdeas, getIdeasById, getUsers };
