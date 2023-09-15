import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
    feature5: "",
    feature6: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const prediction = data.result;

        // Mapea el valor de la predicción a una respuesta específica
        let responseText = "";
        switch (prediction) {
          case 1:
            responseText = "🚶🏻‍♂️ Caminando 🚶🏻‍♂️";
            break;
          case 3:
            responseText = "🕺🏻 Arrastrando 🕺🏻";
            break;
          case 4:
            responseText = "⬆️ Subiendo escaleras ⬆️";
            break;
          case 5:
            responseText = "⬇️ Bajando escaleras ⬇️";
            break;
          case 6:
            responseText = "🧍🏻‍♂️ De pie 🧍🏻‍♂️";
            break;
          case 7:
            responseText = "🪑 Sentado 🪑";
            break;
          case 8:
            responseText = "🛌 Acostado 🛌";
            break;
          default:
            responseText = "Resultado desconocido";
        }

        setResult(responseText);
      } else {
        setResult("Error en la solicitud");
      }
    } catch (error) {
      console.error(error);
      setResult("Error en la solicitud");
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        flexDirection: "column", // Cambiamos a dirección de columna
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ color: "white", marginBottom: '3rem' }}>Predicción con Decision Tree</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "40px",
              }}
            >
              <TextField
                label="Back - X"
                variant="outlined"
                type="number"
                name="feature1"
                value={formData.feature1}
                onChange={handleChange}
                style={{ marginBottom: "20px" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    color: "white",
                    borderColor: "white",
                    backgroundColor: "#323232",
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Back - Y"
                variant="outlined"
                type="number"
                name="feature2"
                value={formData.feature2}
                onChange={handleChange}
                style={{ marginBottom: "20px" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    color: "white",
                    borderColor: "white",
                    backgroundColor: "#323232",
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Back - Z"
                variant="outlined"
                type="number"
                name="feature3"
                value={formData.feature3}
                onChange={handleChange}
                style={{ marginBottom: "20px" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    color: "white",
                    borderColor: "white",
                    backgroundColor: "#323232",
                    borderRadius: "10px",
                  },
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Thigh - X"
                variant="outlined"
                type="number"
                name="feature4"
                value={formData.feature4}
                onChange={handleChange}
                style={{ marginBottom: "20px" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    color: "white",
                    borderColor: "white",
                    backgroundColor: "#323232",
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Thigh - Y"
                variant="outlined"
                type="number"
                name="feature5"
                value={formData.feature5}
                onChange={handleChange}
                style={{ marginBottom: "20px" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    color: "white",
                    borderColor: "white",
                    backgroundColor: "#323232",
                    borderRadius: "10px",
                  },
                }}
              />
              <TextField
                label="Thigh - Z"
                variant="outlined"
                type="number"
                name="feature6"
                value={formData.feature6}
                onChange={handleChange}
                style={{ marginBottom: "20px" }}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    color: "white",
                    borderColor: "white",
                    backgroundColor: "#323232",
                    borderRadius: "10px",
                  },
                }}
              />
            </div>
          </div>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            style={{ marginTop: "10px" }}
            sx={{
              textTransform: "none",
              backgroundColor: "#419430",
              borderRadius: "10px",
              fontSize: "18px",
              marginTop: "2rem",
              '&:hover': {
                backgroundColor: "#337126",
              },
            }}
          >
            Predecir
          </Button>
        </form>
        {result && (
          <div>
            <h2 style={{ color: "white", marginTop:"4rem" }}>Resultado:</h2>
            <p style={{ color: "white", fontSize:"40px", marginTop:"-0.6rem" }}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
