const jwt  = require('jsonwebtoken');

const getTokenFrom = request => {
    const authorization = request.get('Authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    
    return null
}

exports.sign = function(user, secretkey){

    

    try{
        
        return jwt.sign(user, secretkey);
    }
    catch(e){

        return e
    }
}

exports.verify_token=async function(accessToken){
    try{

        const secretkey=process.env.SECRET
        return await jwt.verify(accessToken, secretkey, (err, authData) => {

            
            if(err) {
                return false
            } else {
                return true       
            }

        });

       

    }
    catch(e){

        return false
    }
}

exports.verify =  function(req, res, next){


    const secretkey=process.env.SECRET

    let accessToken = getTokenFrom(req)
    
    if (!accessToken){        
        return res.status(403).send()
    }


    try{

        jwt.verify(accessToken, secretkey, (err, authData) => {

            if(err) {

                return res.status(401).send(err)

            } else {

                //console.log(authData) 
                
            }

        });

        next()

    }
    catch(e){

        return res.status(401).send()
    }
}