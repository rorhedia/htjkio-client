const URL_BASE_DEV = "http://localhost:3000";
const URL_BASE = "https://htj-kio.herokuapp.com";

/**
 * COACHES
 */
const getCoaches = async (token) => {
  const response = await fetch(`${URL_BASE}/coaches`, {
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
 * IDEAS
 */
const addIdea = async (token, idea) => {
  const response = await fetch(`${URL_BASE}/ideas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(idea),
  });

  const data = await response.json();

  return data;
};

const getIdeas = async (token) => {
  const response = await fetch(`${URL_BASE}/ideas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

const getIdeasByUserId = async (token, id) => {
  const response = await fetch(`${URL_BASE}/ideas/user/${id}`, {
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
  const response = await fetch(`${URL_BASE}/ideas/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

const uploadImage = async (token, formdata) => {
  const response = await fetch(`${URL_BASE}/ideas/upload-image`, {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

const uploadFile = async (token, formdata) => {
  const response = await fetch(`${URL_BASE}/ideas/upload-file`, {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

const upload = async (token, formdata) => {
  const response = await fetch(`${URL_BASE}/ideas/upload`, {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

const updateStatusIdea = async (token, id, status) => {
  const response = await fetch(`${URL_BASE}/ideas/${id}/update`, {
    method: "PATCH",
    body: JSON.stringify(status),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

const deleteIdea = async (token, id) => {
  const response = await fetch(`${URL_BASE}/ideas/${id}/delete`, {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

/**
 * USERS
 */
const getUsers = async (token) => {
  const response = await fetch(`${URL_BASE}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await response.json();

  return data;
};

export {
  getCoaches,
  addIdea,
  upload,
  uploadImage,
  uploadFile,
  getIdeas,
  getIdeasByUserId,
  getIdeasById,
  updateStatusIdea,
  deleteIdea,
  getUsers,
};
