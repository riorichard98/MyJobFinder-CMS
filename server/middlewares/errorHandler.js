const errorHandler = (error,req,res,next)=>{
    if(error.type === 'known'){
        res.status(error.code).json({
            message:error.message
        })
    }else if(error.name === 'SequelizeValidationError'){
        res.status(400).json({
            message: error.errors.map(e=> e.message)
        })
    }else if(error.name === 'JsonWebTokenError'){
        res.status(401).json({
            message: "Authentication error"
        })
    }
    else{
        res.status(500).json({
            message:"maybe there is an error on the internal server please report to the developer at riorichard12@gmail.com"
        })
    }
}

module.exports = {
    errorHandler
}