//CORS(Cross-Origin Resource Sharing) is a security feature implemented by web browsers. 
//It controls a web page or web applic running at one origin(domain) is allowed to make requests and access resources from a different origin.
//Imagine a website running at https://example.com, and this website wants to make requests to a server at 
//https://api.example.com to fetch data. Browsers, as a security measure, restrict such requests by default to prevent potential 
//security vulnerabilities.In practical terms, if a server has proper CORS configuration, it allows certain domains to access its resources, while blocking others
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
//data will be comming from different sources like url, json , json form , request to body , so limiting how many json will come
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({limit: "16kb"}))
app.use(express.static("public"))

export { app }
