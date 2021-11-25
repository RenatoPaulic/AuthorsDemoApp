exports.authenticate = (req, res, next) =>{
   if(req.isAuthenticated()) {
        return next()
    }
    res.status(401).send({
        success: false,
        error: "User not authenticated"
    })
}

exports.authorize = (...roles) => { 
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            return next()  
        }
        
        res.status(403).send({
            success: false,
            error: "User is not authorized to access this route"
        })
  }
}