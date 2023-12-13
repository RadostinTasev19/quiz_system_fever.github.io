import { userData } from "./userHelper.js"
import page from "/node_modules/page/page.mjs"
import {render} from "../node_modules/lit-html/lit-html.js"
import { welcomeView } from "../views/welcomeView.js"
import { browseView } from "../views/browseView.js"
import { createView } from "../views/createView.js"
import { profileView } from "../views/profileView.js"
import { onLogout } from "../views/logout.js"
import { loginView } from "../views/loginView.js"
import { registerView } from "../views/registerView.js"

const root = document.querySelector("main#content")

page(decoratorContext)
page("/",welcomeView)
page("/browse",browseView)
page("/create",createView)
page("/profile",profileView)
page("/login",loginView)
page("/logout",onLogout)
page("/register",registerView)
page.start()

function renderer(template){
    render(template,root)
}
function goTo(path){
    page.redirect(path)
}
function decoratorContext(ctx,next){
    ctx.render = renderer
    ctx.goTo = goTo
    ctx.updateNav = updateNav
    ctx.userData = userData

    next()
}

const userDiv = document.querySelector("div#user-nav")
const guestDiv = document.querySelector("div#guest-nav")
function updateNav(){
const user = userData.getUserData()
if (user) {
    userDiv.style.display = "block"
    guestDiv.style.display = "none"
}else{
    userDiv.style.display = "none"
    guestDiv.style.display = "block"
}
}

updateNav()