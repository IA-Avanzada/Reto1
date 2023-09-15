import joblib

# Carga el modelo
model = joblib.load("decision_tree_model.pkl")

# Carga los datos de prueba (sustituye con tus propios datos)
test_data = {
    "feature1": 1,
    "feature2": 2,
    "feature3": 3,
    "feature4": 4,
    "feature5": 5,
    "feature6": 6
}

# Realiza la predicción
prediction = model.predict([[test_data["feature1"], test_data["feature2"], test_data["feature3"], test_data["feature4"], test_data["feature5"], test_data["feature6"]]])

# Imprime el resultado
print("Resultado de la predicción:", prediction)