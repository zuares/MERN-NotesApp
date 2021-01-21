const { hash, compare } = require("bcrypt");
const jwt = require('jsonwebtoken')
// Models
const Users = require('../models/userModel');

// Controller
const userController = {
    // Register
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await Users.findOne({ email: email });
            if (user) return res.status(400).json({ msg: "The email has already exists" });
            const passwordHash = await hash(password, 12);
            const newUser = new Users({
                username, email, password: passwordHash
            });
            await newUser.save();
            res.json({ msg: "Register successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email: email });
            if (!user) return res.status(400).json({ msg: "Email doesnt exists" });
            const isMatch = await compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Passsword incorect" });

            // Create token
            const payload = { id: user._id, name: user.username }
            const token = jwt.sign(payload, process.env.TOKEN);
            res.json({ msg: "Login successfuly", token });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // Verify
    verifiedToken: (req, res) => {
        try {
            const token = req.header("Authorization");
            if (!token) return res.send(false);

            jwt.verify(token, process.env.TOKEN, async (err, verified) => {
                err && res.send(false);
                const user = await Users.findById(verified.id);
                !user && res.send(false);
                return res.send(true);

            })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = userController