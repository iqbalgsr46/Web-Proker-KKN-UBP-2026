import { SignJWT, jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET || "default_super_secret_key_for_kkn_educoloring_dev";
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return new TextEncoder().encode(secret);
};

export async function signToken(payload: { id: string; email: string }) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 1 week

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(getJwtSecretKey());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload as { id: string; email: string };
  } catch (error) {
    return null;
  }
}
