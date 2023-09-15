from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS  # Importa Flask-CORS

app = Flask(__name__)

# Carga el modelo de árbol de decisiones
model = joblib.load("decision_tree_model.pkl")
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

@app.route("/predict", methods=["OPTIONS"])
def options():
    response = jsonify()
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST")
    return response, 200

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Recibe los datos del cliente
        data = request.get_json()

        print("Datos recibidos:", data)  # Agrega esta línea para ver los datos recibidos
        
        # Asegúrate de que se proporcionaron todos los datos necesarios
        required_fields = ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"El campo '{field}' es obligatorio."}), 400
        
        # Realiza la predicción utilizando los datos recibidos
        prediction = model.predict([[int(data["feature1"]), int(data["feature2"]), int(data["feature3"]), int(data["feature4"]), int(data["feature5"]), int(data["feature6"])]])

        # Convierte el resultado a un tipo serializable en JSON (por ejemplo, int o str)
        prediction = int(prediction)  # Puedes convertirlo a un entero si es apropiado
        
        # Devuelve la etiqueta resultante
        return jsonify({"result": prediction})
    
    except Exception as e:
        print("Error:", str(e))  # Agrega esta línea para ver el error
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
