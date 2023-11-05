import { Socket } from "socket.io";
import { Op } from "sequelize"
import { Server, } from "socket.io";
import R_quickService from "../services/R_quick";
import RC_quickService from "../services/RC_quick";
import UserService from "../services/user";
import RiderService from "../services/rider";
import BidQuickService from "../services/bidQuick"

import R_quick from "./R_quick"
import { notify } from '../util/notification';
import { findById } from '../paths/common/controllers/city';

export default async function socket(io: Server) {

    let userNSP = io.of('/user');
    let riderNSP = io.of('/rider');
    // R_quick(io);
    // let socketUser = {};
    // io.on("connection", async (socket: Socket) => {
    // });

    function sendRideStatus({ status, message }) {
        userNSP.emit("rideStatus", { status, message });
    }

    userNSP.on("connection", async (socket: Socket) => {

        const bids = await BidQuickService.findAll();
        const final: any[] = [];
        for (const bid of bids) {
            const riderData = (await UserService.findById(bid.dataValues.rider))?.dataValues;
            const rideData = (await R_quickService.findById(bid.dataValues.ride))?.dataValues;
            const categoryData = (await RC_quickService.findById(rideData.category))?.dataValues;
            final.push({ bid: bid.dataValues, riderData, categoryData });
        }
        console.log(final, "final, dataValues");

        userNSP.emit("allBids", final);

        console.log("user connected");
        socket.on("cancelRideQuick", async ({ id, reason, userId }, cb) => {
            try {
                // console.log(id);
                let result = await R_quickService.updateById(id, { status: "cancelled", });
                console.log(result);
                const finalResult = await R_quickService.findById(id);
                cb({ status: "success", data: finalResult });
                riderNSP.emit("cancelRideQuick", finalResult);
                // console.log("cancelRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }

        });

        socket.on("newRideQuick", async (data, cb) => {
            try {
                // console.log(data);

                const riders = await RiderService.findAll();
                for (const rider of riders) {
                    // riderNSP.emit("newRideQuick", rider);
                    notify(rider.dataValues.fcmToken, "New Ride", `New Ride request of price ${data.bidPrice} has been made`)
                }
                const fifteenMinutesAgo = new Date(new Date().getTime() - 15 * 60 * 1000);
                const oldRide = await R_quickService.findByQuery({
                    createdAt: {
                        [Op.gte]: fifteenMinutesAgo,
                    },
                    user: data.user,
                });
                if (oldRide.length > 0) {
                    for (const ride of oldRide) {
                        await R_quickService.updateById(ride.dataValues.id, { status: "cancelled", });
                    }
                }

                let result = await R_quickService.create(data);
                console.log(result);
                cb({ status: "success", data: result });
                riderNSP.emit("newRideQuic", result);
                console.log("newRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }
        });

        socket.on("acceptRideQuick", async (bid, cb) => {
            try {
                // console.log(bid);
                const bidData = (await BidQuickService.findById(bid))?.dataValues;
                let result = await R_quickService.updateById(bidData?.ride, { status: "accepted", rider: bidData?.rider });
                // console.log(result);
                const finalData = (await R_quickService.findById(bidData?.ride))?.dataValues;
                cb({ status: "success", data: finalData });
                riderNSP.emit("acceptRideQuick", finalData);
                console.log("acceptRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }
        })

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });

    });
    riderNSP.on("connection", async (socket: Socket) => {
        const riders = await RiderService.findAll();
        for (const rider of riders) {
            // riderNSP.emit("newRideQuick", rider);
            notify(rider.dataValues.fcmToken, "Test", `Test notifications`)
        }
        notify((await RiderService.findById(1))?.dataValues.fcmToken, "Test", `Test notifications`)
        console.log("rider connected");
        const rides = await R_quickService.findAll();
        const final: any[] = [];
        for (const ride of rides) {
            // console.log(ride);
            const userData = await UserService.findById(ride.dataValues.user);
            const categoryData = await RC_quickService.findById(ride.dataValues.category);
            final.push({ doc: ride?.dataValues, userData: userData?.dataValues, categoryData: categoryData?.dataValues });
        }
        // console.log(final);
        socket.on("sendBidQuick", async (data, cb) => {
            const bid = await BidQuickService.create(data);
            const rideData = (await R_quickService.findById(bid.dataValues.ride))?.dataValues;
            const riderData = (await RiderService.findById(bid.dataValues.rider))?.dataValues;
            const bids = await BidQuickService.findByQuery({ ride: data.ride });
            const final: any[] = [];
            for (const bid of bids) {
                const riderData = (await UserService.findById(bid.dataValues.rider))?.dataValues;
                final.push({ bid: bid.dataValues, riderData });
            }
            // console.log(final, "final, dataValues");

            userNSP.emit("allBids", final);
        })

        riderNSP.emit("newRideQuick", { data: final });
        socket.on("join", (data) => {
            console.log(data);
        });
        riderNSP.emit("join", "hello");
        socket.on("disconnect", () => {
            console.log("rider disconnected");
        });
    });
    // console.log("woowowowowow");

}



