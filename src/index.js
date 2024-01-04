import dotenv from "dotenv";    //alternate method of require('dotenv).config() //manditory in package.json if using import dotenv=> -r dotenv/config --experimental-json-modules
import connectDB from "./db/index.js";

//dotenv is a JavaScript library that helps you load environment variables from a file named .env into the process
//.env object in Node.js applications. It simplifies the process of managing configuration settings and sensitive information
// (such as API keys, database connection strings, etc.) by allowing you to store them in a separate file, separate from your codebase.

dotenv.config({
    path: './env'
})
connectDB()












//The await keyword is used to wait for the promise to resolve before proceeding with the next steps in your code.
//using async nd await because database can be too far away from india
/*(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error")
        
    } catch (error) {
        console.error("ERROR: " , error)
        
    }
})()*/