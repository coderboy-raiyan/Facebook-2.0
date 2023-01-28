const UserModel = require('../model/User.model');

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
}

function validateLength(text, min, max) {
    if (text.length > max || text.length < min) {
        return false;
    }
    return true;
}

async function validateUsername(username) {
    let again = false;

    do {
        const check = await UserModel.findOne({ username });
        if (check) {
            // Update the username
            username += (+new Date() * Math.random()).toString().substring(0, 1);

            again = true;
        } else {
            again = false;
        }
    } while (again);

    return username;
}

module.exports = { validateEmail, validateLength, validateUsername };
