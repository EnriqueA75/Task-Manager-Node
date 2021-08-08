const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'localMongo'

MongoClient.connect(connectionURL, {
    useNewUrlParser:true   
}, (error, client) => {
    if(error) {
        return console.log('Unable to connect')
    }
        const db = client.db(databaseName)
        console.log('conection success')
})
//CREATE
db.collection('users').insertOne({
        _id: id,
        name: 'Daniels',
        age: 21
    }, (error, result) => {
        if(error){
            return console.log('Unable to insert')
        }
        console.log(result.ops)
    })
    db.collection('users').insertMany([{
        name: 'Enrique',
        age: 21
    },{
        name: 'Victoria',
        age: 22
    }], (error, result) => {
        if(error){
            return console.log('Unable to insert')
        }
        console.log(result.ops)
    })
    task
    db.collection('tasks').insertMany([{
        description: 'this is a description',
        completed: true
    },{
        description: 'this is a second description',
        completed: false
    },{
        description: 'this is a third description',
        completed: true
    }], (error, result) => {
        if(error){
            return console.log('Unable to insert')
        }
        console.log(result.ops)
    })

    //READ
    db.collection('users').findOne({_id: new ObjectID("610b0502f7b16c3be0aaf876")}, (error, user) => {
        if(error) {
            console.log('Unable to find user')
        }
        console.log(user)
    })
    db.collection('users').find({name: 'Énrique'}).count((error, users) => {
        console.log(users)
    })
    tasks
    db.collection('tasks').findOne({_id: new ObjectID("610b0b65942bde017417e9a2")}, (error, task) => {
        if(error) {
            console.log('Unable to find user')
        }
        console.log(task)
    })
    db.collection('tasks').find({completed: true}).toArray((error, task) => {
        console.log(task)
    })


    //UPDATE 
    db.collection('users').updateOne({
        _id: new ObjectID("610b1025b817145e10838516"),
    }, {
        $inc:{
            age: 20
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany({
        completed: true,
    }, {
        $set:{
            completed: false,
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


    //DELETE
    
    db.collection('users').deleteMany({
        age: 21
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').deleteOne({
        _id: new ObjectID("610b0b65942bde017417e9a4")
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    
    //MIDDLEWARE PROT
    app.use((req, res, next) => {
        if(req.method === 'GET'){
            res.send('GEt request are disable')
        } else {
            next()
        }
    })
    app.use((req, res, next) => {
        if(req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH' || req.method === 'DELETE'){
            res.status(503).send('SERVER IN MAINTENANCE')
        } else {
            next()
        }
    })

    //BUSCAR USUARIO POR ID
    router.get('/users/:id', async (req, res) => {
        const _id = req.params.id
            
        try {
            const user = await User.findById(_id)
            if(!user){
                return res.status(400).send('there is not user with this id')
            }
            res.status(200).send(user)
        } catch (error) {
            res.status(400).send(error)
        }
    })