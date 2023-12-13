import {logoutUser } from "../services/userService.js"
async function onLogout(ctx){
    await logoutUser()
    ctx.userData.removeUserData()
    ctx.updateNav()
    ctx.goTo("/")
}

export {
    onLogout
}