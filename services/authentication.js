import JWT from "jsonwebtoken";

const secret = "Tame_Impala--The_Slow_Rush";

function createTokenForUser(user) {
  const payload = {
    name: user.fullName,
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secret, {});
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);

  return payload;
}

export { createTokenForUser, validateToken };
