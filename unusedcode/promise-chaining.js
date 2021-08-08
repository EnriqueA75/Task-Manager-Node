require('../src/db/mongoose')
const User = require('../src/models/user')

// 610c24b3f266053a5c03a868

// User.findByIdAndUpdate('610c24b3f266053a5c03a868',
//     {age: 1}
// ).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const updateAgentCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: 2})
    const count = await User.countDocuments({ age })

    return count
}

updateAgentCount('610c24b3f266053a5c03a868', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})