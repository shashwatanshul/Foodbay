import axios from "axios";
export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/pizzas/getallpizzas`
    );
    console.log(response);
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZA_REQUEST" });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/pizzas/addpizza`,
      { pizza }
    );
    console.log(response);
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
  } catch (error) {
    dispatch({ type: "ADD_PIZZA_FAILED", payload: error });
  }
};

export const editPizza = (editedpizza) => async (dispatch) => {
  dispatch({ type: "EDIT_PIZZA_REQUEST" });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/pizzas/editpizza`,
      { editedpizza }
    );
    console.log(response);
    dispatch({ type: "EDIT_PIZZA_SUCCESS" });
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "EDIT_PIZZA_FAILED", payload: error });
  }
};

export const getPizzaById = (pizzaid) => async (dispatch) => {
  dispatch({ type: "GET_PIZZABYID_REQUEST" });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/pizzas/getpizzabyid`,
      { pizzaid }
    );
    console.log(response);
    dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZABYID_FAILED", payload: error });
  }
};

export const deletePizza = (pizzaid) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/pizzas/deletepizza`,
      { pizzaid }
    );
    alert("Pizza Deleted Successfully");
    console.log(response);
    window.location.href = "/";
  } catch (error) {
    alert("Something went wrong");
    console.log(error);
  }
};
