import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({ msg: "Unauthorized" });
    }else{
      if (token.startsWith("Bearer ")) {
        token = await token.slice(7, token.length).trimLeft();
      }
      const verified = await jwt.decode(token, process.env.JWT_SCECRATE);
  
      req.user = verified;
      next();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
