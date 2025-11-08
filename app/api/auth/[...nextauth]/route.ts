import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "@node-rs/argon2";
import clientPromise from "@/lib/mongodb";

const authOptions = {
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        let email = credentials?.email || "";
        let password = credentials?.password || "";

        email = String(email);
        password = String(password);

        console.log("AUTHORIZE CALLED WITH:", { email, password });

        const client = await clientPromise;
        const db = client.db("nextblog");

        const user = await db.collection("users").findOne({ email });

        if (!user) throw new Error("User not found");

        const valid = await verify(user.password, password);

        if (!valid) throw new Error("Invalid password");
        if (!user.verified) {
          throw new Error("Email not verified");
          }


        console.log("✅ USER AUTHENTICATED:", email);

        return {
          id: user._id.toString(),
          email: user.email
        };
      }
    })
  ],

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
