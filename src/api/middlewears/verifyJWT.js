const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (!authHeader) {
      res.status(401).send({ message: "Unauthorized access" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
      req.decoded = decoded;
      next();
    });
};

module.exports = verifyJWT;