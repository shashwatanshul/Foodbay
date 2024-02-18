import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";
import { Link } from "react-router-dom";
export default function PizzasList() {
  const dispatch = useDispatch();
  const pizzasstate = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error } = pizzasstate;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, []);
  return (
    <div>
      <hr></hr>
      <h1>Pizzas List</h1>
      <hr></hr>
      <div className="table-responsive">
        {error && <Error error="Something went wrong" />}
        <table
          className="table table-bordered"
          style={{ borderColor: "#343a40" }}
        >
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th style={{ minWidth: "150px" }}>Prices</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          {pizzas &&
            pizzas.map((pizza) => {
              return (
                <tr>
                  <td>{pizza.name}</td>
                  <td>
                    Small : {pizza.prices[0]["small"]}
                    <br></br>
                    Medium : {pizza.prices[0]["medium"]}
                    <br></br>
                    Large : {pizza.prices[0]["large"]}
                  </td>
                  <td>{pizza.category}</td>
                  <td>
                    <i
                      className="fa fa-trash m1"
                      onClick={() => {
                        dispatch(deletePizza(pizza._id));
                      }}
                    ></i>
                    <Link to={`/admin/editpizza/${pizza._id}`}>
                      <i className="fa fa-edit m1"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}
