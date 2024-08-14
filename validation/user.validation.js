const { checkSchema } = require('express-validator');

const userDataSchema = checkSchema({
    name: {
        exists: {
            errorMessage: "Name required",
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: "Name should be string"
        }
    },
    username: {
        exists: {
            errorMessage: "Username required",
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: "Username should be string"
        },
        isLength: {
            options: {
                min: 3,
                max: 7
            }
        }
    },
    password: {
        exists: {
            errorMessage: "Invalid password",
            options: {
                checkFalsy: true
            }
        },
        isString: {
            errorMessage: "Password should be string"
        },
        isLength: {
            options: {
                min: 5
            },
            errorMessage: "Password should be at least 5 characters"
        }
    }
})

module.exports = {userDataSchema}
