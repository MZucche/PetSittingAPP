const getTokenFromHeader = require("./getTokenFromHeader");
const { verifyAccessToken } = require("./verifyTokens");
const { jsonResponse } = require("../lib/jsonResponse");

function authenticate(req, res, next){
    console.log('Iniciando autenticación');
    const token = getTokenFromHeader(req.headers);
    if (token){
        const decoded = verifyAccessToken(token);
        if (decoded){
            req.user = { ...decoded.user}
            next()
        } else{
            return res.status(401).send(jsonResponse(401, {error: "No se proporciono un token"}))
        }

    } else{
        return res.status(401).send(jsonResponse(401, {error: "No se proporciono un token"}))
    }
}

module.exports= authenticate;