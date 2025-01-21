export const getUser = (req, res) => {
  try {
    res.send("Welcome to default user route");
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
