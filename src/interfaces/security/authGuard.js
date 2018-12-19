import JsonWebToken from '../../interfaces/security/jsonWebToken'

const requireAuth = async (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        const jwt = new JsonWebToken();
        const verifiedToken = await jwt.decode(token)
        if (verifiedToken) {
            next();
        } else {
            res.status(403).json({message:"Forbidden"})
        }
        
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}
export default requireAuth;