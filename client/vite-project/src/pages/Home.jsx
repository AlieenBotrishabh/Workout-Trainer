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
          onClick={() => navigate('/instructions')}
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
<section className="min-h-screen px-6 md:px-20 py-24 bg-gradient-to-b from-blue-950 to-black flex items-center relative overflow-hidden">
  {/* Decorative Elements */}
  <div className="absolute top-0 left-0 w-full h-full">
    <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-800 opacity-20 blur-xl"></div>
    <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-blue-700 opacity-20 blur-xl"></div>
    <div className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-blue-600 opacity-10 blur-lg"></div>
  </div>
  
  <div className="max-w-6xl mx-auto w-full z-10">
    {/* Section Header */}
    <div className="flex flex-col items-center mb-16">
      <div className="w-24 h-1 bg-blue-500 rounded mb-8"></div>
      <h2 className="text-5xl font-bold text-center mb-4 text-blue-300">About the Creator</h2>
      <p className="text-xl text-blue-400 opacity-80 max-w-xl text-center">
        The mind behind this fitness innovation
      </p>
    </div>
    
    {/* Content Card */}
    <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-3xl shadow-xl border border-blue-900/30 overflow-hidden">
      {/* Top Pattern/Design Element */}
      <div className="h-8 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-900"></div>
      
      {/* Main Content */}
      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
        {/* Left Column - Profile */}
        <div className="md:w-1/3 flex flex-col items-center">
          {/* Profile Image with Glow Effect */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 blur-md transform scale-110 opacity-70 animate-pulse"></div>
            <img
              src="/api/placeholder/300/300"
              alt="Rishabh Kumar"
              className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg border-4 border-blue-900 relative z-10"
            />
          </div>
          
          {/* Name and Title */}
          <h3 className="text-2xl font-bold mb-2 text-blue-300">Rishabh Kumar</h3>
          <p className="text-blue-400 mb-4 text-center">Full-Stack Developer</p>
          
          {/* Skills/Expertise Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-900/40 text-blue-300 text-sm rounded-full border border-blue-800/50">React</span>
            <span className="px-3 py-1 bg-blue-900/40 text-blue-300 text-sm rounded-full border border-blue-800/50">TensorFlow</span>
            <span className="px-3 py-1 bg-blue-900/40 text-blue-300 text-sm rounded-full border border-blue-800/50">AI</span>
            <span className="px-3 py-1 bg-blue-900/40 text-blue-300 text-sm rounded-full border border-blue-800/50">Fitness</span>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300 group shadow-lg">
              <svg className="w-5 h-5 text-blue-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300 group shadow-lg">
              <svg className="w-5 h-5 text-blue-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300 group shadow-lg">
              <svg className="w-5 h-5 text-blue-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 bg-blue-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300 group shadow-lg">
              <svg className="w-5 h-5 text-blue-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Right Column - Bio */}
        <div className="md:w-2/3">
          {/* Bio Points with Icons */}
          <div className="space-y-6 text-lg mb-8">
            <div className="flex">
              <div className="mr-4 mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-blue-300">
                A <span className="font-semibold text-blue-200">full-stack developer</span> with over 5 years of experience in web and mobile application development, specializing in creating intuitive and responsive user interfaces.
              </p>
            </div>
            
            <div className="flex">
              <div className="mr-4 mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-blue-300">
                Passionate about combining <span className="font-semibold text-blue-200">technology and fitness</span> to create innovative solutions that help people achieve their health and wellness goals.
              </p>
            </div>
            
            <div className="flex">
              <div className="mr-4 mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-blue-300">
                Expert in <span className="font-semibold text-blue-200">AI and machine learning</span> technologies, with a focus on computer vision and pose estimation algorithms that power this workout application.
              </p>
            </div>
          </div>
          
          {/* Quote Section */}
          <div className="bg-blue-900/20 p-6 rounded-2xl border border-blue-800/30 mb-8 relative">
            <svg className="absolute top-4 left-4 w-8 h-8 text-blue-700/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <div className="pl-6">
              <p className="italic text-blue-400 mb-4">
                "I created this application to bridge the gap between technology and fitness. My goal is to make professional-quality workout guidance accessible to everyone, regardless of their location or budget. With real-time AI feedback, users can train with confidence knowing they're performing exercises correctly."
              </p>
              <p className="font-medium text-blue-300 text-right">
                — Rishabh Kumar
              </p>
            </div>
          </div>
          
          {/* Education/Experience */}
          <div className="mb-8">
            <h4 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
              </svg>
              Background
            </h4>
            <div className="flex items-center text-blue-400 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium text-blue-300">BE Computer Science</span>
              <span className="mx-2">•</span>
              <span>Chandigarh University</span>
            </div>
            <div className="flex items-center text-blue-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-medium text-blue-300">Lead Developer</span>
              <span className="mx-2">•</span>
              <span>FitTech Solutions</span>
            </div>
          </div>
          
          {/* Contact Button */}
          <button className="px-6 py-3 bg-blue-600 text-black font-semibold rounded-full shadow-lg hover:bg-blue-500 transition flex items-center group">
            Get In Touch
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  </section>
</div>
  );
}