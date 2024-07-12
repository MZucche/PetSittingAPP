const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const router = require ("express").Router();
const getUserInfo = require ("../lib/getUserInfo")
const express = require("express");


router.post("/", async (req,res) => {
    const {email, password} = req.body;
    
    if (!!!email ||!!!password) {
        return res.status(400).json(jsonResponse(400,{
            error: "Campos Requeridos",
        }))
    }

    const user = await User.findOne({email})

    if (user){
        const correctPassword = await user.comparePassword(password, user.password);

        if (correctPassword){
            const accessToken= user.createAccessToken();
            const refreshToken = await user.createRefreshToken();
            res
                .status(200)
                .json(jsonResponse(200,{ user: getUserInfo(user),accessToken,refreshToken }))
        } else{
            res.status(400).json(jsonResponse(400,{
                error: "Usuario o contraseña incorrecto"
            })
        )
        }
    }else{
        res.status(400).json(jsonResponse(400,{
            error: "No se encontro al usuario"
        })
    )
    }
});

module.exports= router;