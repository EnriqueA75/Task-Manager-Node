const express = require('express');
const router = new express.Router();
const User = require('../models/user')
const auth = require('../middlewares/auth')
const multer = require('multer');
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')

//USERS
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
}) 
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send('There was an error login in')
    }
})
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Logged out')
    } catch (error) {
        res.status(500).send(error)
    }
})
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('Logged out from all your devices')
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/users/me', auth, async (req, res) => {
        res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send('Invalid operation')
    }
    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])       
        await user.save() 
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne()
        sendCancelationEmail(req.user.email, req.user.name)
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a image'))
        }
        cb(undefined, true)
    }
})
router.post('/users/me/avatar', auth,  upload.single('upload'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()

    req. user.avatar = buffer
    await req.user.save()
    res.status(200).send('saved')   	
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send('saved')   	
})
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send(error)
    }
})
module.exports = router; 