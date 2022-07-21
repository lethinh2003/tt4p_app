import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import dbConnect from "../../../database/dbConnect";
import { comparePassword } from "../../../utils/hashPassword";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import GoogleProvider from "next-auth/providers/google";
import sendEmail from "../../../utils/email";
var randomstring = require("randomstring");
var jwt = require("jsonwebtoken");
const JWT_EXPIRES = process.env.JWT_SECRET_KEY || 60 * 60;
const JWT_REFRESH_TOKEN_EXPIRES =
  process.env.JWT_REFRESH_TOKEN_EXPIRES || 24 * 60 * 60 * 365;

async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(
      `${process.env.ENDPOINT_SERVER}/api/v1/users/refresh-token`,
      {
        token: tokenObject.refreshToken,
      }
    );

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
      refreshToken: tokenResponse.data.refreshToken,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: parseInt(JWT_REFRESH_TOKEN_EXPIRES),
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    CredentialsProvider({
      id: "login",
      name: "login",
      async authorize(credentials, req) {
        try {
          const { account, password } = credentials;
          console.log(account, password);
          const user = await axios.post(
            `${process.env.ENDPOINT_SERVER}/api/v1/users/login`,
            {
              account,
              password,
            }
          );
          if (user.data.accessToken) {
            return user.data;
          }

          return null;
        } catch (err) {
          console.log(err);
          if (err.response.data.message) {
            throw new Error(err.response.data.message);
          }
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          if (profile.email_verified) {
            const checkUser = await User.find({
              account: profile.email,
            });
            if (checkUser.length === 0) {
              const generatePassword = randomstring.generate({
                length: 10,
                charset: "alphabetic",
              });
              const createUser = User.create({
                account: profile.email,
                password: generatePassword,
                confirmPassword: generatePassword,
                avatar: profile.picture,
                name: profile.name,
              });
              const message = `

            <div style=" width: 500px; padding: 10px;">
       
             <img src="https://i.imgur.com/U0BdIic.png" style="width: 40px; height: 40px" alt="Home Logo">
              <span>Hi there,</span>
              <p>Lời đầu tiên xin gửi lời cảm ơn đến bạn, vì đã ghé thăm trang web và đăng ký tham gia cùng với chúng tôi. 
              Sau đây là thông tin tài khoản của bạn: </p>
              <li >Tài khoản: ${profile.email}</li>
              <li >Mật khẩu: <b>${generatePassword}</b> </li>
              <p>Thư này được gửi tự động, vui lòng không reply lại bất cứ thông tin gì mang tính bảo mật cá nhân</p>
         
          </div>  `;
              const sendMail = sendEmail({
                email: profile.email,
                subject: "[No Reply] Đăng ký tài khoản thành công",
                message,
              });
              const data = await Promise.all([createUser, sendMail]);

              profile.account = data[0];
            } else {
              profile.account = checkUser[0];
            }
          }
          return profile.email_verified;
        } catch (err) {
          return false;
        }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        // This will only be executed at login. Each next invocation will skip this part.
        token.accessToken = user.accessToken;
        token.accessTokenExpiry = user.accessTokenExpiry;
        token.refreshToken = user.refreshToken;

        token.account = user.data.account;
        token.name = user.data.name;
        token.sex = user.data.sex;
        token.date = user.data.date;
        token.findSex = user.data.findSex;
        token.city = user.data.city;
        token.role = user.data.role;
        token.id = user.data._id;
      }

      // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
      const shouldRefreshTime = Math.round(
        token.accessTokenExpiry - 50 * 60 * 1000 - Date.now()
      );

      // If the token is still valid, just return it.
      if (shouldRefreshTime > 0) {
        return Promise.resolve(token);
      }
      // If the call arrives after 23 hours have passed, we allow to refresh the token.
      token = await refreshAccessToken(token);

      return Promise.resolve(token);
    },
    async session({ session, user, token }) {
      // Here we pass accessToken to the client to be used in authentication with your API
      session.accessToken = token.accessToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.error = token.error;
      session.user.account = token.account;
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.access_token = token.accessToken;
      session.user.name = token.name;
      session.user.sex = token.sex;
      session.user.findSex = token.findSex;
      session.user.city = token.city;
      session.user.date = token.date;
      return Promise.resolve(session);
    },
  },
});
