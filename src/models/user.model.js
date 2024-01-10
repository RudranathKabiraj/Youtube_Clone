import mongoose, {Schema} from "mongoose";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true, 
            unique: true,
            lowerCase: true,
            trim: true,
            index: true //for better searching
        },
        email: {
            type: String,
            required: true, 
            unique: true,
            lowerCase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true, 
            trim: true,
            index: true
        },
        avatar: {
            type: String,   //Cloudinary url
            required: true
        },
        coverImage: {
            type: String,   //Cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true , 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {timestamps: true}
)

//Before saving password pre is used for that bcrypt.hash will encrypt the password before saving,if is used becoz whenever we change any avatar or full name ,password will get encrypted every time so this.modified is used so that whenver we are changing or accessing the password field then only it will  get encrypted
//This will only enrpt the password only when changing or accessing the password field
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password , 10)
    next()
})

//bcrypt.compare will compare the user given pass and the the stored encrypted pass
userSchema.methods.isPasswordCorrect = async function(password){    //methods is an object which can store multiple methods and custom messages
   return await bcrypt.compare(password , this.password)    // will return true or false
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)

