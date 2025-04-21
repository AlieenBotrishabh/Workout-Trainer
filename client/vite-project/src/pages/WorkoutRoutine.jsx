import { useState, useEffect } from "react";
import { Calendar, Clock, Bell, CheckCircle, Edit, Trash, Plus, Activity, User } from "lucide-react";

export default function WorkoutRoutine() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Push-ups", sets: 3, reps: 15, days: ["Monday", "Wednesday", "Friday"], completed: false },
    { id: 2, name: "Squats", sets: 4, reps: 12, days: ["Tuesday", "Thursday", "Saturday"], completed: false },
    { id: 3, name: "Planks", sets: 3, reps: 60, days: ["Monday", "Wednesday", "Friday"], completed: false }
  ]);
  
  const [reminders, setReminders] = useState([
    { id: 1, time: "07:00", days: ["Monday", "Wednesday", "Friday"], active: true },
    { id: 2, time: "18:30", days: ["Tuesday", "Thursday"], active: true }
  ]);
  
  const [newWorkout, setNewWorkout] = useState({ name: "", sets: 3, reps: 10, days: [] });
  const [newReminder, setNewReminder] = useState({ time: "08:00", days: [] });
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);
  const [currentDay, setCurrentDay] = useState("");
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);
  
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  useEffect(() => {
    const date = new Date();
    const dayIndex = date.getDay();
    // Convert from JS day (0 = Sunday) to our format (0 = Monday)
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    setCurrentDay(daysOfWeek[adjustedIndex]);
  }, []);
  
  const toggleDay = (day, target) => {
    if (target === "workout") {
      if (editingWorkout) {
        const updatedDays = editingWorkout.days.includes(day)
          ? editingWorkout.days.filter(d => d !== day)
          : [...editingWorkout.days, day];
        setEditingWorkout({ ...editingWorkout, days: updatedDays });
      } else {
        const updatedDays = newWorkout.days.includes(day)
          ? newWorkout.days.filter(d => d !== day)
          : [...newWorkout.days, day];
        setNewWorkout({ ...newWorkout, days: updatedDays });
      }
    } else {
      if (editingReminder) {
        const updatedDays = editingReminder.days.includes(day)
          ? editingReminder.days.filter(d => d !== day)
          : [...editingReminder.days, day];
        setEditingReminder({ ...editingReminder, days: updatedDays });
      } else {
        const updatedDays = newReminder.days.includes(day)
          ? newReminder.days.filter(d => d !== day)
          : [...newReminder.days, day];
        setNewReminder({ ...newReminder, days: updatedDays });
      }
    }
  };
  
  const saveWorkout = () => {
    if (editingWorkout) {
      setWorkouts(workouts.map(w => w.id === editingWorkout.id ? editingWorkout : w));
      setEditingWorkout(null);
    } else {
      if (newWorkout.name && newWorkout.days.length > 0) {
        setWorkouts([...workouts, { ...newWorkout, id: Date.now(), completed: false }]);
        setNewWorkout({ name: "", sets: 3, reps: 10, days: [] });
        setShowAddWorkout(false);
      }
    }
  };
  
  const saveReminder = () => {
    if (editingReminder) {
      setReminders(reminders.map(r => r.id === editingReminder.id ? editingReminder : r));
      setEditingReminder(null);
    } else {
      if (newReminder.days.length > 0) {
        setReminders([...reminders, { ...newReminder, id: Date.now(), active: true }]);
        setNewReminder({ time: "08:00", days: [] });
        setShowAddReminder(false);
      }
    }
  };
  
  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };
  
  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };
  
  const toggleWorkoutCompletion = (id) => {
    setWorkouts(workouts.map(w => 
      w.id === id ? { ...w, completed: !w.completed } : w
    ));
  };
  
  const toggleReminderActive = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };
  
  const todaysWorkouts = workouts.filter(workout => workout.days.includes(currentDay));
  const activeReminders = reminders.filter(reminder => reminder.days.includes(currentDay) && reminder.active);
  
  return (
    <div className="w-screen flex flex-col min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-blue-300">
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-900 opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-800 opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-40 w-24 h-24 rounded-full bg-blue-700 opacity-10 blur-lg"></div>
      </div>
      
      {/* Header */}
      <header className="py-6 px-6 text-center relative z-10">
        <div className="w-24 h-1 bg-blue-500 rounded mx-auto mb-4"></div>
        <h1 className="text-4xl font-bold text-blue-300 mb-2">Workout Tracker</h1>
        <p className="text-blue-400 opacity-80">Track, schedule, and complete your fitness goals</p>
      </header>
      
      <div className="w-full max-w-5xl mx-auto px-4 pb-16 relative z-10">
        {/* Today's Overview */}
        <div className="mb-8 bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-3xl shadow-xl border border-blue-900/30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <Calendar className="mr-2 text-blue-600" size={24} />
              Today: {currentDay}
            </h2>
            <span className="text-sm bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full border border-blue-800/50">
              {todaysWorkouts.length} workouts
            </span>
          </div>
          
          {todaysWorkouts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-blue-900/10 rounded-2xl border border-blue-800/20">
              <Activity size={48} className="text-blue-600 mb-4 opacity-70" />
              <p className="text-blue-400">No workouts scheduled for today</p>
              <button
                onClick={() => setShowAddWorkout(true)}
                className="mt-4 px-5 py-2 bg-blue-600 text-black font-semibold rounded-full shadow hover:bg-blue-400 transition flex items-center"
              >
                <Plus size={18} className="mr-1" /> Add Workout
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {todaysWorkouts.map(workout => (
                <li key={workout.id} className={`group flex items-center justify-between p-4 rounded-xl border ${workout.completed ? 'bg-blue-900/20 border-blue-700/30' : 'bg-blue-900/10 border-blue-800/20'} transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10`}>
                  <div>
                    <h3 className="font-medium text-xl text-blue-200">{workout.name}</h3>
                    <p className="text-blue-400">{workout.sets} sets × {workout.reps} {workout.name.toLowerCase().includes("plank") ? "seconds" : "reps"}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => toggleWorkoutCompletion(workout.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${workout.completed ? 'bg-green-600/30 text-green-400 ring-2 ring-green-500/50' : 'bg-blue-900/40 text-blue-400 hover:bg-blue-800/60'}`}
                    >
                      <CheckCircle size={22} />
                    </button>
                    <button 
                      onClick={() => setEditingWorkout(workout)}
                      className="p-2 rounded-full bg-blue-900/20 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-800/40"
                    >
                      <Edit size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Active Reminders for Today */}
        <div className="mb-8 bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-3xl shadow-xl border border-blue-900/30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <Bell className="mr-2 text-blue-600" size={24} />
              Today's Reminders
            </h2>
            <span className="text-sm bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full border border-blue-800/50">
              {activeReminders.length} active
            </span>
          </div>
          
          {activeReminders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-blue-900/10 rounded-2xl border border-blue-800/20">
              <Clock size={48} className="text-blue-600 mb-4 opacity-70" />
              <p className="text-blue-400">No reminders set for today</p>
              <button
                onClick={() => setShowAddReminder(true)}
                className="mt-4 px-5 py-2 bg-blue-600 text-black font-semibold rounded-full shadow hover:bg-blue-400 transition flex items-center"
              >
                <Plus size={18} className="mr-1" /> Add Reminder
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeReminders.map(reminder => (
                <li key={reminder.id} className="group flex items-center justify-between p-4 rounded-xl bg-blue-900/10 border border-blue-800/20 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-900/40 flex items-center justify-center mr-3">
                      <Clock size={20} className="text-blue-300" />
                    </div>
                    <span className="text-xl text-blue-200">{reminder.time}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleReminderActive(reminder.id)}
                      className={`p-2 rounded-full transition-all duration-300 ${reminder.active ? 'bg-blue-800/60 text-blue-300' : 'bg-gray-800/60 text-gray-400'}`}
                    >
                      <Bell size={20} />
                    </button>
                    <button 
                      onClick={() => setEditingReminder(reminder)}
                      className="p-2 rounded-full bg-blue-900/20 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-800/40"
                    >
                      <Edit size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Manage Workouts Section */}
          <div className="bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-3xl shadow-xl border border-blue-900/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <Activity className="mr-2 text-blue-600" size={24} />
                Manage Workouts
              </h2>
              <button 
                onClick={() => setShowAddWorkout(!showAddWorkout)}
                className="px-4 py-2 bg-blue-900/40 text-blue-300 rounded-full hover:bg-blue-800/60 transition-colors duration-300 flex items-center border border-blue-800/50"
              >
                {showAddWorkout ? "Cancel" : <><Plus size={18} className="mr-1" /> Add New</>}
              </button>
            </div>
            
            {showAddWorkout && (
              <div className="bg-blue-900/10 p-5 rounded-2xl mb-6 border border-blue-800/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <input 
                  type="text" 
                  placeholder="Exercise name"
                  value={editingWorkout ? editingWorkout.name : newWorkout.name}
                  onChange={(e) => editingWorkout 
                    ? setEditingWorkout({...editingWorkout, name: e.target.value})
                    : setNewWorkout({...newWorkout, name: e.target.value})
                  }
                  className="w-full p-3 mb-4 bg-blue-950/50 border border-blue-800/30 rounded-xl text-blue-200 placeholder-blue-400/60 focus:ring-2 focus:ring-blue-600/50 focus:outline-none"
                />
                <div className="flex mb-4">
                  <div className="w-1/2 pr-2">
                    <label className="text-sm text-blue-400 block mb-1">Sets</label>
                    <input 
                      type="number" 
                      min="1"
                      value={editingWorkout ? editingWorkout.sets : newWorkout.sets}
                      onChange={(e) => editingWorkout 
                        ? setEditingWorkout({...editingWorkout, sets: parseInt(e.target.value)})
                        : setNewWorkout({...newWorkout, sets: parseInt(e.target.value)})
                      }
                      className="w-full p-3 bg-blue-950/50 border border-blue-800/30 rounded-xl text-blue-200 focus:ring-2 focus:ring-blue-600/50 focus:outline-none"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="text-sm text-blue-400 block mb-1">Reps/Time</label>
                    <input 
                      type="number" 
                      min="1"
                      value={editingWorkout ? editingWorkout.reps : newWorkout.reps}
                      onChange={(e) => editingWorkout 
                        ? setEditingWorkout({...editingWorkout, reps: parseInt(e.target.value)})
                        : setNewWorkout({...newWorkout, reps: parseInt(e.target.value)})
                      }
                      className="w-full p-3 bg-blue-950/50 border border-blue-800/30 rounded-xl text-blue-200 focus:ring-2 focus:ring-blue-600/50 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="text-sm text-blue-400 block mb-2">Days</label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day, "workout")}
                        className={`px-3 py-2 text-sm rounded-full transition-all duration-300 ${
                          (editingWorkout ? editingWorkout.days : newWorkout.days).includes(day)
                            ? 'bg-blue-600 text-blue-100 shadow-lg shadow-blue-900/50'
                            : 'bg-blue-900/30 text-blue-400 border border-blue-800/40'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={saveWorkout}
                  className="w-full bg-blue-600 text-black py-3 rounded-xl font-semibold hover:bg-blue-500 transition-colors duration-300 shadow-lg shadow-blue-900/30"
                >
                  {editingWorkout ? "Update Workout" : "Add Workout"}
                </button>
              </div>
            )}
            
            <ul className="space-y-3">
              {workouts.map(workout => (
                <li key={workout.id} className="group flex items-center justify-between p-4 rounded-xl bg-blue-900/10 border border-blue-800/20 hover:bg-blue-900/20 transition-all duration-300">
                  <div>
                    <p className="font-medium text-blue-200">{workout.name}</p>
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-blue-400 px-2 py-1 bg-blue-900/30 rounded-full mr-2 border border-blue-800/30">
                        {workout.sets} sets × {workout.reps}
                      </p>
                      <p className="text-xs text-blue-400">
                        {workout.days.map(d => d.slice(0, 3)).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingWorkout(workout)}
                      className="p-2 rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-800/50 transition-colors duration-300"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => deleteWorkout(workout.id)}
                      className="p-2 rounded-full bg-red-900/20 text-red-400 hover:bg-red-900/30 transition-colors duration-300"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Manage Reminders Section */}
          <div className="bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-3xl shadow-xl border border-blue-900/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <Bell className="mr-2 text-blue-600" size={24} />
                Manage Reminders
              </h2>
              <button 
                onClick={() => setShowAddReminder(!showAddReminder)}
                className="px-4 py-2 bg-blue-900/40 text-blue-300 rounded-full hover:bg-blue-800/60 transition-colors duration-300 flex items-center border border-blue-800/50"
              >
                {showAddReminder ? "Cancel" : <><Plus size={18} className="mr-1" /> Add New</>}
              </button>
            </div>
            
            {showAddReminder && (
              <div className="bg-blue-900/10 p-5 rounded-2xl mb-6 border border-blue-800/20">
                <div className="mb-4">
                  <label className="text-sm text-blue-400 block mb-1">Time</label>
                  <input 
                    type="time" 
                    value={editingReminder ? editingReminder.time : newReminder.time}
                    onChange={(e) => editingReminder 
                      ? setEditingReminder({...editingReminder, time: e.target.value})
                      : setNewReminder({...newReminder, time: e.target.value})
                    }
                    className="w-full p-3 bg-blue-950/50 border border-blue-800/30 rounded-xl text-blue-200 focus:ring-2 focus:ring-blue-600/50 focus:outline-none"
                  />
                </div>
                <div className="mb-5">
                  <label className="text-sm text-blue-400 block mb-2">Days</label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day, "reminder")}
                        className={`px-3 py-2 text-sm rounded-full transition-all duration-300 ${
                          (editingReminder ? editingReminder.days : newReminder.days).includes(day)
                            ? 'bg-blue-600 text-blue-100 shadow-lg shadow-blue-900/50'
                            : 'bg-blue-900/30 text-blue-400 border border-blue-800/40'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={saveReminder}
                  className="w-full bg-blue-600 text-black py-3 rounded-xl font-semibold hover:bg-blue-500 transition-colors duration-300 shadow-lg shadow-blue-900/30"
                >
                  {editingReminder ? "Update Reminder" : "Add Reminder"}
                </button>
              </div>
            )}
            
            <ul className="space-y-3">
              {reminders.map(reminder => (
                <li key={reminder.id} className="group flex items-center justify-between p-4 rounded-xl bg-blue-900/10 border border-blue-800/20 hover:bg-blue-900/20 transition-all duration-300">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full ${reminder.active ? 'bg-blue-900/40' : 'bg-gray-800/40'} flex items-center justify-center mr-3`}>
                      <Clock size={20} className={reminder.active ? 'text-blue-300' : 'text-gray-400'} />
                    </div>
                    <div>
                      <p className={`font-medium ${reminder.active ? 'text-blue-200' : 'text-gray-400'}`}>{reminder.time}</p>
                      <p className="text-xs text-blue-400">
                        {reminder.days.map(d => d.slice(0, 3)).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleReminderActive(reminder.id)}
                      className={`p-2 rounded-full ${reminder.active ? 'bg-blue-900/30 text-blue-400' : 'bg-gray-800/30 text-gray-500'} hover:bg-blue-800/50 transition-colors duration-300`}
                    >
                      <Bell size={18} />
                    </button>
                    <button 
                      onClick={() => setEditingReminder(reminder)}
                      className="p-2 rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-800/50 transition-colors duration-300"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => deleteReminder(reminder.id)}
                      className="p-2 rounded-full bg-red-900/20 text-red-400 hover:bg-red-900/30 transition-colors duration-300"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Overview Stats */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 to-blue-950 p-6 rounded-3xl shadow-xl border border-blue-900/30">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <User size={20} className="text-blue-500 mr-2" />
              <span className="text-xl font-medium text-blue-300">Your Progress</span>
            </div>
            <div className="w-24 h-1 bg-blue-500 rounded mx-4"></div>
            <span className="text-lg text-blue-400">{workouts.filter(w => w.completed).length} / {workouts.length} workouts completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}