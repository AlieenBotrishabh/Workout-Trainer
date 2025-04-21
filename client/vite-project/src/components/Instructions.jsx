import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sun, Camera, CheckCircle, Activity } from 'lucide-react';

export default function Instruction() {
  const navigate = useNavigate();
  
  const instructions = [
    {
      icon: <Sun className="w-8 h-8 text-blue-300" />,
      title: "Proper Lighting",
      description: "Ensure you're in a well-lit area so the AI can accurately track your movements."
    },
    {
      icon: <Camera className="w-8 h-8 text-blue-300" />,
      title: "Camera Setup",
      description: "Position your camera so your full body is visible during exercises."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-300" />,
      title: "Follow Guidance",
      description: "Pay attention to on-screen posture guidance for maximum effectiveness."
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-300" />,
      title: "Track Progress",
      description: "Monitor your reps, posture score, and progress in real time."
    }
  ];

  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-black text-blue-300 p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Workout Instructions</h1>
        
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-center">
          Before you start, prepare your workout space and follow these guidelines
          to get the most accurate feedback from our AI trainer.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {instructions.map((instruction, index) => (
            <div key={index} className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 hover:border-blue-400 transition shadow-lg hover:shadow-blue-500/20">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-blue-800/50 rounded-full mr-4">
                  {instruction.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-200 mb-2">{instruction.title}</h3>
                  <p className="text-blue-300">{instruction.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/workout')}
            className="group px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-500 transition-all duration-300 flex items-center space-x-2 hover:shadow-blue-500/50"
          >
            <span>Start Workout</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}