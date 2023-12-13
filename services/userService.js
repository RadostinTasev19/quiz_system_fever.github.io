import { get,put,post,del} from "../src/requester.js"
const userEndpoints = {
    singIn: "/users",
    login:"/login",
    logout: "/logout"
}

async function signInUser(body){
return await post(userEndpoints.singIn,body)
}
async function loginUser(body){
  return  await post(userEndpoints.login,body)
}
async function logoutUser(){
    await post(userEndpoints.logout)
}

export {
    signInUser,
    loginUser,
    logoutUser
}