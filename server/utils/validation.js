/* eslint-disable no-useless-escape */
function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
}

module.exports = { validateEmail };
