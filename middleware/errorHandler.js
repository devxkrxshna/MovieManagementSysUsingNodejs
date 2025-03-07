const {constants} = require("../constants")
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title: "validation errror", message: err.message, stackTrace : err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title: "not found", message: err.message, stackTrace : err.stack});
            break;
            case constants.UNAUTHORIZED:
                res.json({title: "unauthorized access", message: err.message, stackTrace : err.stack});
                break;
            case constants.FORBIDDEN:
                res.json({title: "forbidden access", message: err.message, stackTrace : err.stack});
                break;
             case constants.SERVER_ERROR:
                res.json({title: "server errorrr", message: err.message, stackTrace : err.stack});
                break;
        default:
            break;


    }
    
    

    
};

module.exports = errorHandler;