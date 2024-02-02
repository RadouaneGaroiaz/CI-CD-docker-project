import { useState } from "react";

import axios from "axios"; 
import "./style.css";


const Home = () => {
  const [form, setForm] = useState({
    name: "",
    price: 0,
  });

  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "name" && value === "") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  const submitForm = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://backend-cicd.azurewebsites.net/products', {
        name: form.name,
        price: form.price,
      });

      if (response.status === 200) {
        console.log('Form data sent successfully');
        alert('Product added successfully');
      } else if (response.status === 400) {
        console.log('Form data validation failed');
        alert('Invalid product');
      }
    } catch (error) {
      console.error('Error occurred while sending form data', error);
      alert('Error occurred while sending form data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
  {/*     <img src={logo} alt="Logo" /> */}
      <h2>Add product</h2>
      <form className="form">
        <input
          name="name"
          onChange={handleChange}
          spellCheck="false"
          className="control"
          type="text"
          placeholder="Product name"
          value={form.name}
        />
        <div className={`spinner ${isLoading ? "loading" : ""}`}></div>

        <input
          name="price"
          onChange={handleChange}
          spellCheck="false"
          className="control"
          type="number"
          placeholder="Product price"
          value={form.price}
        />

        <button
          disabled={isLoading}
          className="control"
          type="button"
          onClick={submitForm}
        >
          Add product
        </button>
      </form>
    </div>
  );
};

export default Home;
