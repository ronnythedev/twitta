import NextAuth, { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

type ExtendedUserType = User & {username?:string; uid?:string};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // This is made-up username since we are not using actual Twitter or Twitter API whatsoever
      (session.user as ExtendedUserType).username = session.user?.name?.split(" ")
        .join("")
        .toLocaleLowerCase();

        (session.user as ExtendedUserType).uid = token.sub;
      
      return session;
    },
  },
});
