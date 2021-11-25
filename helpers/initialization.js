const User = require('../models/User')
const bcrypt = require('bcrypt')

const adminUser = {
    name: 'Admin',
    surname: 'Admin',
    email: 'admin.admin@default.com',
    password:'admin123',
    role: 'Admin'
}

exports.createDefaultAdminUser = async () => {
    const user = await User.findOne({ email: adminUser.email })
    if(!user) {
        adminUser.password = await bcrypt.hash(adminUser.password, 10)
        await User.create(adminUser)
    }
}