import { Application } from "express"
import user from "./user"
import auth from "./auth"
import RC_quick from "./RC_quick"

export default function Router(app, route = "/user") {
    app.use(route + "/user", user)
    app.use(route + "/auth", auth)
    app.use(route + "/rideCatQuick", RC_quick)
}
