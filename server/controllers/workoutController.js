exports.getWorkoutData = (req, res) => {
    // Placeholder response – can be updated to return actual user data, logs, etc.
    res.json({
      msg: 'Welcome to your workout session!',
      userId: req.user.id,
      timestamp: new Date().toISOString()
    });
  };
  