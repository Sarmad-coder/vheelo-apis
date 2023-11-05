import { Application } from "express"

import auth from "./auth"
import city from "./city"
import RC_quick from "./RC_quick"
import rider from "./rider"
import support from "./support"
import vehicleBrand from "./vehicleBrand"
import vehicleColor from "./vehicleColor"
import vehicleModel from "./vehicleModel"
import RC_daily from "./RC_daily"
import R_quick from "./R_quick"
import R_city from "./R_City"
import riderDocuments from "./riderDocument"
import vehicleInfo from "./vehicleInfo"

export default function Router(app, route = "/rider") {
    app.use(route + "/auth", auth)
    app.use(route + "/city", city)
    app.use(route + "/rideCity", R_city)
    app.use(route + "/riderDocuments", riderDocuments)
    app.use(route + "/rideCatQuick", RC_quick)
    app.use(route + "/vehicleInfo", vehicleInfo)
    app.use(route + "/rider", rider)
    app.use(route + "/support", support)
    app.use(route + "/vehicleBrand", vehicleBrand)
    app.use(route + "/vehicleColor", vehicleColor)
    app.use(route + "/vehicleModel", vehicleModel)
    app.use(route + "/rideCatdaily", RC_daily)
    app.use(route + "/rideQuick", R_quick)
}
