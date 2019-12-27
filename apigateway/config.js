let config = {
    WWW_PORT : ( process.env.PORT || 8080),
    notes_URL : ( process.env.notes_URL || "http://localhost:3000")
}

module.exports = config; 