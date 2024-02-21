import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";
export default function Editpizza() {
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);
  const { pizza, error, loading } = getpizzabyidstate;
  const editpizzastate = useSelector((state) => state.editPizzaReducer);
  const { editloading, editsuccess } = editpizzastate;
  const { pizzaid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (pizza) {
      if (pizza._id === pizzaid) {
        setname(pizza.name);
        setdescription(pizza.description);
        setcategory(pizza.category);
        setsmallprice(pizza.prices[0]["small"]);
        setmediumprice(pizza.prices[0]["medium"]);
        setlargeprice(pizza.prices[0]["large"]);
        setimage(pizza.image);
      } else {
        dispatch(getPizzaById(pizzaid));
      }
    } else {
      dispatch(getPizzaById(pizzaid));
    }
  }, [pizza, dispatch]);

  function formHandler(e) {
    e.preventDefault();
    const editedpizza = {
      _id: pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        small: smallprice,
        medium: mediumprice,
        large: largeprice,
      },
    };
    dispatch(editPizza(editedpizza));
  }

  return (
    <div>
      <h1>Edit Pizza</h1>
      <h1>Pizza Id = {pizzaid}</h1>
      <div className="text-start">
        {loading && <Loading />}
        {error && <Error error="Somethig went wrong" />}
        {editsuccess && <Success success="Pizza details edited successfully" />}
        {editloading && <Loading />}

        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="small variant price"
            value={smallprice}
            onChange={(e) => {
              setsmallprice(Number(e.target.value));
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="medium variant price"
            value={mediumprice}
            onChange={(e) => {
              setmediumprice(Number(e.target.value));
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="large variant price"
            value={largeprice}
            onChange={(e) => {
              setlargeprice(Number(e.target.value));
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Category (veg/nonveg)"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Image URL"
            value={image}
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <button className="btn mt-3" type="submit">
            Edit Item
          </button>
        </form>
      </div>
    </div>
  );
}
