const express = require('express');
const Task = require('../models/task')
const auth = require('../middlewares/auth');
const router = new express.Router();

//TASKS
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/tasks', auth, async (req, res) => {
    const page = parseInt(req.query.page); // Make sure to parse the limit to number
    const limit = parseInt(req.query.limit);// Make sure to parse the skip to number

    try {
        if(req.query.completed) {
            const startIndex = (page - 1) * limit
            const endIndex = (page * limit) 
            const tasks = await Task.find({ owner: req.user._id, completed: req.query.completed})
            const dataTask = tasks.slice(startIndex, endIndex)
            res.status(201).send(dataTask)
        } else {
            const startIndex = (page - 1) * limit
            const endIndex = (page * limit) 
            const tasks = await Task.find({ owner: req.user._id})
            const dataTask = tasks.slice(startIndex, endIndex)
            res.status(201).send(dataTask)
        }      
    } catch (error) {
        res.status(500).send(error) 
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task){
           return res.status(400).send()
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed','description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send('Invalid operation')
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task){
            return res.status(404).send('there is not task with this id')
        }
        updates.forEach((update) => task[update] = req.body[update])       
        await task.save() 
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        if(!task){
            res.status(404).send('there is not task with this id')
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;