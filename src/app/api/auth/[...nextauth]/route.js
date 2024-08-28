import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/model/User";
import { usersDBConnect } from "@/utils/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await usersDBConnect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error('No user found with the email');
          }
          
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) {
            throw new Error('Incorrect password');
          }

          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };