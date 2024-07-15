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

const update = async (plant) => {
  try {
    const res = await fetch(`${BASE_URL}/${plant._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(plant),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, update };
