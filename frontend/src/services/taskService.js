const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/tasks`;

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

const createTask = async (taskFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskFormData),
    });

    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}`, {
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

async function updateTask(taskId, taskFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskFormData),
    });

    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}

const showTask = async (taskId) => {
  try {
    const res = await fetch(`${BASE_URL}/${taskId}`, {
      headers: { Authorization: `Bearer: ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, createTask, deleteTask, updateTask, showTask };
