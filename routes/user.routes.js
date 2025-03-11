const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
    return res.send("Welcome to user route")
})

module.exports = router;