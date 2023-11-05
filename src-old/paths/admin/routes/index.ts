import { Application } from "express"
import city from "./city"
import RC_quick from "./RC_quick"
import vehicleBrand from "./vehicleBrand"
import vehicleColor from "./vehicleColor"
import vehicleModel from "./vehicleModel"
import support from "./support"

export default function Router(app, route = "/admin") {
    app.use(route + "/city", city)
    app.use(route + "/rideCatQuick", RC_quick)
    app.use(route + "/vehicleBrand", vehicleBrand)
    app.use(route + "/vehicleColor", vehicleColor)
    app.use(route + "/vehicleModel", vehicleModel)
    app.use(route + "/support", support)
}
