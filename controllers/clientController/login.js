const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Client = require('../../models/clients')

async function login(body) {
    try {
        const { email, password } = body;
        const user = await Client.findOne({ email });
        if (!user) {
            return { status: 400, message: 'User is not found' }
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return { status: 400, message: 'Incorrect password' }
        }

        const token = jwt.sign({ userId: user.id },
            "config.get('jwtSecret')", { expiresIn: '1h' }
        )

        return { status: 200, token, userId: user.id }
    } catch (error) {
        return { status: 400, message: "Something went wong ( " + error }
    }
}

module.exports = { login }