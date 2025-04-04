"use client";

import React, { useState } from "react";
import axios from "axios";
import NavBar from "../NavBar";

export default function Workplace() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<{ [key: string]: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!symptoms.trim()) {
      setError("Please enter symptoms.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        symptoms: symptoms.split(",").map((s) => s.trim()),
      });

      setResult(response.data);
    } catch (err) {
      setError("Error fetching prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-4xl font-bold text-white mb-6">Health Care Center</h1>

        {/* Input Box */}
        <div className="bg-black p-6 rounded-xl shadow-lg max-w-2xl w-full text-center border border-gray-700">
          <label className="text-white text-lg mb-2 block">Select Symptoms:</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
            placeholder="Type symptoms such as itching, headache, fatigue..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          {/* Buttons */}
          <div className="mt-4 space-x-4">
            <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700">
              Start Speech Recognition
            </button>
            <button
              onClick={handlePredict}
              className="px-5 py-2 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700"
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          </div>

          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>

        {/* AI System Results Section */}
        <h2 className="text-3xl font-bold text-white mt-10">Our AI System Results</h2>
        <div className="grid grid-cols-3 gap-4 mt-6 max-w-4xl">
          {result
            ? Object.entries(result).map(([key, value], index) => (
                <div
                  key={index}
                  className="bg-white text-gray-800 font-semibold px-4 py-3 rounded-lg shadow-md text-center hover:scale-105 transition-transform"
                >
                  <strong>{key}:</strong> {String(value)}
                </div>
              ))
            : ["Disease", "Description", "Precaution", "Medications", "Workouts", "Diets"].map((category, index) => (
                <div
                  key={index}
                  className="bg-white text-gray-800 font-semibold px-4 py-3 rounded-lg shadow-md text-center hover:scale-105 transition-transform"
                >
                  {category}
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
