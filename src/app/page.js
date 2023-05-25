"use client";
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que el campo de nombre no esté vacío
    if (prompt.trim() === "") {
      setError("Debes ingresar algo!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError("Error en la solicitud");
    }

    setIsLoading(false);
  };

  const handleChange = (event) => {
    setPrompt(event.target.value);
    setError("");
  };

  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-900">
      <div className="px-3 py-6 w-11/12 md:w-1/3 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-5">
        <h2 className="text-2xl smd:text-3xl font-bold text-white mb-4">
          Creador de chistes sobre programación.
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5">
          <div className="w-full flex flex-col justify-center items-center">
            <input
              type="text"
              name="prompt"
              placeholder="Ingresa tu frase o palabra..."
              className="bg-gray-800 text-white rounded-lg px-4 py-2 mb-4 w-3/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-indigo-700 border text-lg"
              value={prompt}
              onChange={handleChange}
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 w-2/5 rounded-lg text-center flex justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Enviar"
              )}
            </button>
          </div>

          {result && (
            <p className="text-white max-w-lg text-justify text-lg  my-10">
              <span className="font-bold">Respuesta:</span> {result}
            </p>
          )}
        </form>
      </div>
      <div className="absolute bottom-0 w-full h-10 text-center">
        <p className="text-gray-500 font-bold">
          © 2023 Yuliam Andrey Osorio Puerta. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
