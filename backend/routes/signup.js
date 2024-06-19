const { jsonResponse } = require("../lib/jsonResponse");
const router = require ("express").Router();
const User = require ("../schema/user")
const express = require("express");

router.post("/", async (req,res) => {
    const {name, surname, username, email, phone, address, password} = req.body;
    
    if (!!!name || !!!surname || !!!username || !!!email || !!!phone || !!!address || !!!password) {
        return res.status(400).json(jsonResponse(400,{
            error: "Campos Requeridos",
        }))
    }

    //crear usuario en la base de datos
    try {
        const user = new User();
        const exists = await user.usernameExists(username);

        if (exists){
            return res.status(409).json(jsonResponse(409, {
                error: "Ya existe un usuario con ese nombre de usuario",
        }))
        } 
        else{
        const newUser = new User({name, surname, username, email, phone, address, password});

        await newUser.save();

        return res.status(200).json(jsonResponse(200,{
        message: "El usuario se registro con exito"
        }))
        }
           
    } catch (error) {
        res.status(500).json(jsonResponse(500,{
            error: "Error creando usuario"
        }))
    }
});

module.exports= router;