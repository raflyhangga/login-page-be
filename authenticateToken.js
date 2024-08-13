export default function authenticateToken(req,res,next){
    // Middleware for checking the validity of the token.

    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];

    // If there is no token, return 401
    if(!token) return res.sendStatus(401);

    // Checking validity of the token
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
