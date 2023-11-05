import { Application } from "express";
import UserRouter from "./paths/user/routes/";
import AdminRouter from "./paths/admin/routes/";
import RiderRouter from "./paths/rider/routes/";


export default function ROUTER(app) {
    UserRouter(app);
    AdminRouter(app);
    RiderRouter(app);
}
