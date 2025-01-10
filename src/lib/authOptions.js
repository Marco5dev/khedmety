import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DBConnect } from "@/utils/mongodb";
import User from "@/model/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await DBConnect();
        const user = await User.findOne({ email: credentials.email });
        
        if (user && (await user.comparePassword(credentials.password))) {
          // Return only the data you want to store in the token
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            bio: user.bio || "",
            role: user.role || "user",
            avatar: user.avatar || null
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        // Handle session update
        return { ...token, ...session };
      }
      if (user) {
        // Initial sign in
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.bio = user.bio;
        token.role = user.role;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          bio: token.bio,
          role: token.role,
          avatar: token.avatar
        };
      }
      return session;
    }
  },
  pages: {
    signIn: "/login?type=login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
