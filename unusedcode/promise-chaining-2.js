require('../src/db/mongoose')
const Task = require('../src/models/task')

// 610c24b3f266053a5c03a868

// Task.findByIdAndDelete('610c486e29fcae71602189ab'
// ).then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const deleteTaskAgent = async (id, state) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: state })

    return count
}

deleteTaskAgent('610c437d1899ef03d850d365', true).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})