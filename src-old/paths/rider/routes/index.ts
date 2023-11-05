import { Application } from "express"

import auth from "./auth"
import city from "./city"
import RC_quick from "./RC_quick"
import rider from "./rider"
import support from "./support"
import vehicleBrand from "./vehicleBrand"
import vehicleColor from "./vehicleColor"
import vehicleModel from "./vehicleModel"

export default function Router(app, route = "/rider") {
    app.use(route + "/auth", auth)
    app.use(route + "/city", city)
    app.use(route + "/rideCatQuick", RC_quick)
    app.use(route + "/rider", rider)
    app.use(route + "/support", support)
    app.use(route + "/vehicleBrand", vehicleBrand)
    app.use(route + "/vehicleColor", vehicleColor)
    app.use(route + "/vehicleModel", vehicleModel)
}
