import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-blue-400">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-r from-blue-900 to-black text-blue-300">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-300">Welcome to Workout Trainer</h1>
        <p className="text-xl md:text-2xl max-w-xl mb-8">
          Achieve your fitness goals with real-time pose detection and personalized tracking.
        </p>
        <button
          onClick={() => navigate('/workout')}
          className="px-6 py-3 bg-blue-600 text-black font-semibold rounded-full shadow hover:bg-blue-400 transition"
        >
          Get Started
        </button>
      </section>
      
      {/* Features Section - Styled and Enhanced */}
      <section className="min-h-screen px-6 md:px-20 py-24 bg-gradient-to-b from-black via-blue-950 to-black flex flex-col justify-center relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-900 opacity-20 blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-800 opacity-20 blur-xl"></div>
          <div className="absolute top-40 right-40 w-24 h-24 rounded-full bg-blue-700 opacity-10 blur-lg"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col items-center mb-16">
            <div className="w-24 h-1 bg-blue-500 rounded mb-8"></div>
            <h2 className="text-5xl font-bold text-center mb-4 text-blue-300">Powerful Features</h2>
            <p className="text-xl text-blue-400 opacity-80 max-w-xl text-center">
              Experience cutting-edge technology that transforms your workout routine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature Card 1 */}
            <div className="group bg-gradient-to-br from-gray-900 to-blue-950 p-8 rounded-3xl shadow-xl 
                        hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-300 border border-blue-900/30
                        flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="bg-blue-900/20 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-800/40 transition-colors duration-300">
                <span className="text-4xl">🕺</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Real-Time Pose Detection</h3>
              <p className="text-blue-400/80">Advanced AI technology monitors your form with precision, ensuring safe and effective workouts. Get instant feedback on your technique.</p>
              <div className="mt-6 flex">
                <span className="text-blue-500 font-medium group-hover:text-blue-300 transition-colors duration-300 flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Feature Card 2 */}
            <div className="group bg-gradient-to-br from-gray-900 to-blue-950 p-8 rounded-3xl shadow-xl 
                        hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-300 border border-blue-900/30
                        flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="bg-blue-900/20 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-800/40 transition-colors duration-300">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Interactive Analytics</h3>
              <p className="text-blue-400/80">Track your progress with detailed visualizations of your performance data. Monitor improvements and identify areas for growth.</p>
              <div className="mt-6 flex">
                <span className="text-blue-500 font-medium group-hover:text-blue-300 transition-colors duration-300 flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Feature Card 3 */}
            <div className="group bg-gradient-to-br from-gray-900 to-blue-950 p-8 rounded-3xl shadow-xl 
                        hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-300 border border-blue-900/30
                        flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="bg-blue-900/20 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-blue-800/40 transition-colors duration-300">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-blue-300 group-hover:text-blue-200 transition-colors duration-300">Custom Workout Plans</h3>
              <p className="text-blue-400/80">Personalized exercise routines designed to meet your specific fitness goals. Adjust difficulty and focus areas as you improve.</p>
              <div className="mt-6 flex">
                <span className="text-blue-500 font-medium group-hover:text-blue-300 transition-colors duration-300 flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Feature Highlight */}
          <div className="mt-20 bg-blue-900/10 border border-blue-800/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4 text-blue-300">Start your fitness journey today</h3>
              <p className="text-blue-400/80 mb-6">
                Join thousands of users who have transformed their workouts with our AI-powered trainer. 
                Whether you're a beginner or an experienced athlete, our app adapts to your level.
              </p>
              <button 
                onClick={() => navigate('/workout')}
                className="px-6 py-3 bg-blue-600 text-black font-semibold rounded-full shadow hover:bg-blue-400 transition flex items-center"
              >
                Try It Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-blue-900/20 p-2 rounded-2xl w-64 h-64 flex items-center justify-center relative">
                <div className="absolute inset-0 border-4 border-dashed border-blue-700/30 rounded-2xl animate-pulse"></div>
                <span className="text-8xl">💪</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Creator Section */}
      <section className="h-screen px-6 md:px-20 py-16 bg-gradient-to-b from-gray-900 to-black flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10 text-blue-400">About the Creator</h2>
          <div className="flex flex-col items-center md:flex-row gap-8">
            <img
              src="/api/placeholder/150/150"
              alt="Creator"
              className="w-40 h-40 rounded-full object-cover shadow-lg border-2 border-blue-600"
            />
            <div className="text-lg text-left">
              <p className="mb-4">
                Hi! I'm <span className="font-semibold text-blue-300">Rishabh Kumar</span>, a full-stack developer passionate about combining technology and fitness.
                This app helps users train smarter with the power of real-time AI.
              </p>
              <p>
                Connect with me on:{' '}
                <a href="#" className="text-blue-300 underline hover:text-blue-500">LinkedIn</a>,{' '}
                <a href="#" className="text-blue-300 underline hover:text-blue-500">GitHub</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}