module.exports = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  switch (req.path) {
    case "/register":
      if (![firstName, lastName, email, password].every(Boolean))
        return res.status(401).json("Missing Credentials");
      if (!validEmail(email)) return res.status(401).json("Invalid Email");
      break;
    case "/login":
      if (![email, password].every(Boolean))
        return res.status(401).json("Missing Credentials");
      break;
  }
  if (!validEmail(email)) return res.status(401).json("Invalid Email");
  next();
};
