import { config } from "dotenv"
config()

export const cloudinaryConfig ={
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}

export const dbConfig ={
    mongoDB_url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_DB_NAME
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