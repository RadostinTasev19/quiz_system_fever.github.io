import { html } from "../node_modules/lit-html/lit-html.js"
import { signInUser } from "../services/userService.js"
let context;
function registerView(ctx){
    context = ctx
    context.render(registerTemplate())
}
const registerTemplate = () => html`
 <section id="register">
                <div class="pad-large">
                    <div class="glass narrow">
                        <header class="tab layout">
                        <a class="tab-item" href="/login">Login</a>
                            <h1 class="tab-item active">Register</h1>            
                        </header>
                        <form class="pad-med centered" @submit=${onSubmitHandler}>
                            <label class="block centered">Username: <input class="auth-input input" type="text"
                                    name="username" /></label>
                            <label class="block centered">Email: <input class="auth-input input" type="text"
                                    name="email" /></label>
                            <label class="block centered">Password: <input class="auth-input input" type="password"
                                    name="password" /></label>
                            <label class="block centered">Repeat: <input class="auth-input input" type="password"
                                    name="repass" /></label>
                            <input class="block action cta" type="submit" value="Create Account" />
                        </form>
                        <footer class="tab-footer">
                            Already have an account? <a class="invert" href="/login">Sign in here</a>.
                        </footer>
                    </div>
                </div>
            </section>
`
async function onSubmitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    const repass = formData.get("repass")

    const body = {
        username,
        email,
        password
    }
    if (username && email && password && password === repass) {
        const response = await signInUser(body)
        event.target.reset()
        context.userData.setUserData(response)
        context.updateNav()
        context.goTo("/")
    }else{
        window.alert("all input fields required!")
    }
}
export {
    registerView
}