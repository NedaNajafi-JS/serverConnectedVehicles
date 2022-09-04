//To have unifrom responses all over the project and services


function response (data)  {
    this.status = 'success',
    this.data = {
        data
    }
}

function responseV1 (data)  {
    this.status = 'success',
    this.data = {
        ...data
    }
}

function ServerError (error) {
    this.status = 'fail',
    this.data = {
        message: 'Server error',
        error: error.message
    }
}

function ParameterError (error) {
    this.status ='fail',
    this.data = {
        message: 'Input error',
        error: error
    }
}

module.exports = {
    response,
    responseV1,
    ServerError,
    ParameterError
}