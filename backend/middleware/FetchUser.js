import jwt  from 'jsonwebtoken'
const JWT_SECRET = "react";

function FetchUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    res.status(403).send({error : "Access denied"});
  }

  try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
    //   req.send(data.user);
      next();
  } catch (error) {
    res.status(401).send({ error: "Access denied bala" });
  }
   
}

export default FetchUser  
