import { Application } from "express"
import city from "./city"
import RC_city from "./RC_city"
import RC_quick from "./RC_quick"
import vehicleBrand from "./vehicleBrand"
import vehicleColor from "./vehicleColor"
import vehicleModel from "./vehicleModel"
import support from "./support"
import R_quick from "./R_quick"
import rider from "./rider"
import RC_daily from "./RC_daily"
import RC_schedule from "./RC_schedule"
import FAQ from "./FAQ"
import Notifications from "./notifications"
import walletRider from "./walletRider"
import R_City from "./R_city"

export default function Router(app, route = "/admin") {
    app.use(route + "/city", city)
    app.use(route + "/rideCity", R_City)
    app.use(route + "/FAQ", FAQ)
    app.use(route + "/walletRider", walletRider)
    app.use(route + "/notification", Notifications)
    app.use(route + "/rideCatCity", RC_city)
    app.use(route + "/rideCatSchedule", RC_schedule)
    app.use(route + "/rideCatQuick", RC_quick)
    app.use(route + "/rideQuick", R_quick)
    app.use(route + "/vehicleBrand", vehicleBrand)
    app.use(route + "/vehicleColor", vehicleColor)
    app.use(route + "/vehicleModel", vehicleModel)
    app.use(route + "/support", support)
    app.use(route + "/rider", rider)
    app.use(route + "/rideCatdaily", RC_daily)
}
