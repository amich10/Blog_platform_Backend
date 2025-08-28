import { config } from "dotenv"
config()

export const cloudinaryConfig ={
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}

export const mongoDbConfig = {
    mongoUri:process.env.MONGODB_URL,
    mongoDbName:process.env.MONGODB_DB_NAME
}
export const dbConfig ={
   databaseName: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port:process.env.DB_PORT 
}

export const smtpConfig = {
    provider:process.env.SMTP_PROVIDER,
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    fromAddress:process.env.SMTP_FROM,
    user:process.env.SMTP_USER,
    password:process.env.SMTP_PASSWORD,
}

export const appConfig = {
    frontendUrl:process.env.FRONTEND_URL,
    jwtSecret:process.env.JWT_SECRET
}

export const userRoles = {
    ADMIN:'admin',
    AUTHOR:'author',
    USER:'user'
}

export const genderTypes = {
    MALE:"male",
    FEMALE:"female",
    OTHER:"other"
}
export const userStatus = {
    ACTIVE: "active",
    INACTIVE: "inactive"
}

export const postStatus = {
    PUBLISHED:'published',
    UNPUBLISHED:'unpublished'
}
