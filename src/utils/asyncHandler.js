//The purpose of an asyncHandler is to simplify error handling in routes or middleware functions that involve asynchronous operations 
//(e.g., database queries, API calls).

//These two are wrapper function

//It's a common pattern used to wrap asynchronous route handlers or middleware functions, 
//ensuring consistent error handling for asynchronous operations.
const asyncHandler = (requestHandler) =>{
    (req , res , next) => {
        Promise.resolve(requestHandler(req , res , next)).catch((err) =>next(err))
//Promise.resolve() is used to wrap the invocation of requestHandler in a promise.
//If requestHandler resolves successfully, the .catch() block will be skipped.
//If requestHandler rejects with an error, the error will be caught and passed to the next middleware function, allowing you to handle errors centrally.

    }
}

export {asyncHandler}




//Using try-catch
// const asyncHandler =(fn) => async (re1 , res , next) =>{
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
        
//     }
// }