const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/comments`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const showComment = async (commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${commentId}`, {
      headers: { Authorization: `Bearer: ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const updateComment = async (commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${commentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, showComment, createComment, deleteComment, updateComment };
