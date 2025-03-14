const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // ***1 see below
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  // if token is missing in the request body, it throws an error
  if (!token) {
    return res
      .status(401)
      .json({ error: "Token is missing or improperly formatted" });
  }

  try {
    console.log("Token received:", token);
    const { _id } = jwt.verify(token, process.env.SECRET); //***2 see below */

    req.user = await User.findOne({ _id }).select("_id"); // **3 see below */
    if (!req.user) {
      throw new Error("User not found");
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

// ***1 : Extract the Token
// The Authorization header typically looks like this: Bearer <token>.
// authorization.split(" ")[1]: Splits the header by spaces and extracts the token (the second part).

// ***2 : Verify the Token
// jwt.verify(token, process.env.SECRET):
//    Verifies the token using the secret key stored in process.env.SECRET.
//    --> If the token is valid, it decodes the payload (in this case, the _id of the user).
//    --> If the token is invalid or expired, it throws an error.

// **3 : Fetch User from Database
// User.findOne({ _id }).select("_id"): Fetches the user from the database using the _id from the token.
// The .select("_id") ensures only the _id field is returned.
// If the user is not found, an error is thrown.

// ***4 : Proceed to the Next Middleware/Route
// If the token is valid and the user is found, next() is called to pass control to the next middleware or route handler.
