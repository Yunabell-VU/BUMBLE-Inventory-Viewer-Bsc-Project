import axios from "axios";

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            baseURL:"http://localhost:8081/api/v2",
            headers: {
                'Content-Type':'application/json'
            }
        }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}

export const get = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            baseURL:"http://localhost:8081/api/v2",
        }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}

export const deleteModel = (url) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            baseURL:"http://localhost:8081/api/v2",
        }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}

export const validate = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            baseURL:"http://localhost:8081/api/v2",
        }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}