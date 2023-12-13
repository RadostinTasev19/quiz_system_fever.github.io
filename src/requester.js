import { userData } from "../src/userHelper.js"
const host = "https://parseapi.back4app.com"
const APP_ID = "v0YnZ5TJy80CMr6M8HvZK83LFreZwx3ov44cRUrQ"
const API_KEY = "TH6RbdwTh49Kt614B0BR92aNZpUrge4iAokmPYdG"

async function requester(url,method,data){
    const options = {
        method,
        headers:{
            "X-Parse-Application-Id" : APP_ID,
            "X-Parse-REST-API-Key" : API_KEY
        }
    }
    if (data) {
        options.headers["Content-Type"] = "application/json"
        options.body = JSON.stringify(data)
    }
    const user = userData.getUserData()
    console.log(user)
    if (user) {
        options.headers["X-Parse-Session-Token"] = user.sessionToken
    }
    try {
        debugger
        const response = await fetch(host + url,options)
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }
        if (response.status === 204) {
            return response
        }
        return await response.json()
    } catch (error) {
        alert(error)
        throw error
    }

}

async function get(url){
    return await requester(url,"GET")
}

async function post(url,data){
    return await requester(url,"POST",data)
}

async function put(url,data){
    await requester(url,"PUT",data)
}

async function del(url){
    await requester(url,"DELETE")
}

export{
    get,
    put,
    post,
    del
}