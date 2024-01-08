//The constructor method is a special method for creating and initializing an object created with a class. only one special method with 
//the name "constructor" in a class — a SyntaxError is thrown if the class contains more than one occurrence of a constructor method.

class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went wrong",
        errors =[],
        statck =""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if(statck){
            this.stack = statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}