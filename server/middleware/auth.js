import jwt from 'jsonwebtoken';

// This is the request handler/controller/function to execute when a HTTP request is sent from FE.

// This is general purpose verification function 
export const verifyToken = async (req, res,next)=>{
    try{
        let token = req.header("Authorization"); // grab authorization header token from FE, 
        if (!token){
            return res.status(403).send("Access Denied");
        }
        if (token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err){
        res.status(500).json({error:err.message})
    }
}