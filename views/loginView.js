import { html } from "../node_modules/lit-html/lit-html.js"
import { loginUser } from "../services/userService.js"
let context;
function loginView(ctx){
    context = ctx
    context.render(loginTemplate())
}
const loginTemplate = () => html`
<section id="login">
                <div class="pad-large">
                    <div class="glass narrow">
                        <header class="tab layout">
                            <h1 class="tab-item active">Login</h1>
                            <a class="tab-item" href="/register">Register</a>
                        </header>
                        <form class="pad-med centered" @submit=${onSubmitHandler}>
                            <label class="block centered">Email: <input class="auth-input input" type="text"
                                    name="email" /></label>
                            <label class="block centered">Password: <input class="auth-input input" type="password"
                                    name="password" /></label>
                            <input class="block action cta" type="submit" value="Sign In" />
                        </form>
                        <footer class="tab-footer">
                            Don't have an account? <a class="invert" href="#">Create one here</a>.
                        </footer>
                    </div>
                </div>
            </section>
`
async function onSubmitHandler(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get("email")
    const password = formData.get("password")

    const body = {
        email,
        password
    }
    if (email && password) {
       const response = await loginUser(body)
        event.target.reset()
        context.userData.setUserData(response)
        context.updateNav()
        context.goTo("/")
    }
}

export {
    loginView
}