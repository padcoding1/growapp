const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/plants`;

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

const showPlant = async (plantId) => {
  try {
    const res = await fetch(`${BASE_URL}/${plantId}`, {
      headers: { Authorization: `Bearer: ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createPlant = async (plantFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deletePlant = async (plantId) => {
  try {
    const res = await fetch(`${BASE_URL}/${plantId}`, {
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

async function updatePlant(plantId, plantFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${plantId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const searchPlant = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/search/${query}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, showPlant, createPlant, deletePlant, updatePlant, searchPlant };
