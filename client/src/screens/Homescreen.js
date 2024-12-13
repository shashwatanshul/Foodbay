import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas } from "../actions/pizzaActions";
import Pizza from "../components/Pizza";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Homescreen() {
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducer);
  const { pizzas, error, loading } = pizzasState;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter pizzas based on both search query and selected category
  const filteredPizzas = pizzas.filter((pizza) => {
    const nameMatch = pizza.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (selectedCategory === "all") {
      return nameMatch;
    } else {
      return nameMatch && pizza.category === selectedCategory;
    }
  });

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-md-6 mb-3">
          {/* Search bar with icon inside */}
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search pizzas..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="col-md-6">
          {/* Category filter dropdown */}
          <div className="input-group">
            <label className="input-group-prepend" htmlFor="categoryFilter">
              <span className="input-group-text">Filter by Category:</span>
            </label>
            <select
              id="categoryFilter"
              className="form-control"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">All</option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="Something went wrong" />
        ) : filteredPizzas.length > 0 ? (
          filteredPizzas.map((pizza) => (
            <div className="col-md-3 m-3" key={pizza._id}>
              <div>
                <Pizza pizza={pizza} />
              </div>
            </div>
          ))
        ) : (
          // Display a message when no pizzas are found
          <div className="col-md-12 text-center mt-4">
            <p className="text-danger">
              No Pizza Found Related To Your Search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homescreen;
