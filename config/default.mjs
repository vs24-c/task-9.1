import dotenv from "dotenv";
dotenv.config()

export default Object.freeze({
  port: process.env.PORT,
  databaseName: process.env.DB_NAME,
  databaseUrl: process.env.MONGODB_URL,
  mongoURI: `${process.env.MONGODB_URL}${process.env.DB_NAME}`,
  sess_secret: process.env.SECRET_SESSION,
});