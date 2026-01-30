import express from "express"
import { OAuth2Client } from "google-auth-library"

const router = express.Router()

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/auth/google/callback"
)

router.get("/google", (_req, res) => {
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"]
  })
  res.redirect(url)
})

router.get("/google/callback", async (req, res) => {
  const code = req.query.code as string

  const { tokens } = await client.getToken(code)
  client.setCredentials(tokens)

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: process.env.GOOGLE_CLIENT_ID
  })

  const payload = ticket.getPayload()

  const user = {
    id: payload?.sub,
    email: payload?.email,
    name: payload?.name
  }

  res.cookie("user", JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax"
  })

  res.redirect(`${process.env.FRONTEND_URL}/upload`)
})

export default router
