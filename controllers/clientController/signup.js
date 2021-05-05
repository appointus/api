const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Client = require('../../models/clients')

async function signup(body) {
    try {
        const { email, password, phone, first_name, last_name } = body
        const candidate = await Client.findOne({ email })
        if (candidate) {
            return { status: 400, message: "User already exists" }
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        let clients = new Client({ email, password: hashedPassword, phone, first_name, last_name });
        await clients.save();
        return { status: 500, message: "User is created" }
    } catch (error) {
        return { status: 400, message: "Something went wong: " + error }
    }
}

module.exports = { signup }