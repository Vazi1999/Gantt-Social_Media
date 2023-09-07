const jwt = require('jsonwebtoken');
require('dotenv').config(); // .env configuration

const jwtMiddleware = (req , res , next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    const currentUrl = req.url;
    if(token == null){
        return res.status(401).send('No token available');
    } 
    jwt.verify(token,process.env.ACCESS_TOKEN , (err,user)=>{
        if(err){
        return res.sendStatus(403).send('Expired Token , Please Sign in again!');
        }
        if((user.username != 'Shaked') && 
        (currentUrl === '/api/register' || currentUrl ==='/api/getUsers' || currentUrl === '/api/createItem')){
            return res.status(401).send('Not authorized!');
        }
        next()
    })
}

module.exports = jwtMiddleware;