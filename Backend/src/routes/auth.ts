

import express from "express"
import { googleClient } from "../auth/google"

const router = express.Router()

router.get("/google", (req, res) => {
  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"]
  })

  res.redirect(url)
})

router.get("/google/callback", async (req, res) => {
  const code = req.query.code as string

  const { tokens } = await googleClient.getToken(code)
  googleClient.setCredentials(tokens)

  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token!,
    audience: process.env.GOOGLE_CLIENT_ID
  })

  const payload = ticket.getPayload()

  const user = {
    id: payload?.sub,
    email: payload?.email,
    name: payload?.name,
    picture: payload?.picture
  }

  // TEMP: store user in cookie (later replace with DB + session)
 res.cookie("user", JSON.stringify(user), {
  httpOnly: true,
  secure: true,
  sameSite: "none"   
})


  res.redirect("https://krafti-bruteforce.vercel.app/upload")
})

export default router
