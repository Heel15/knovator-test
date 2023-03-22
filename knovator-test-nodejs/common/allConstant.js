const responseMessages = {
    errorCode: {
        status: 500,
        message: "Something went wrong!",
    },
    createCode: {
        status: 201,
        message: "New resource created."
    },
    incorrectCred: {
        status: 200,
        message: 'Username or password incorrect!'
    },
    alreadyExitsCode: {
        status: 100,
        message: "Record already exits.",
    },
    unauthorizedCode: {
        status: 401,
        message: "Unauthorized Access!",
    },
    invalidPayloadCode: {
        status: 400,
        message: "Invalid req payload.",
    },
    resourceUpdated: {
        status: 200,
        message: "Resource successfully updated."
    },
    resourceDeleted: {
        status: 200,
        message: "Resource successfully deleted."
    }
};

module.exports = {
    responseMessages,
};
