import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials"
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    /* GitHub({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }) */
    Credentials({
      credentials: {
        username: { label: "username" },
        password: { label: "password", type: "password" }
      },
      async authorize() {
        return await ({ logged: true })
      }
    })
  ],
  secret: "akldjfoiaudfaksjdfiuoew3oui12iouweq908suijkl213oijklwpqsa",
  trustHost: true,
})