"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const R_quick_1 = __importDefault(require("../services/R_quick"));
const user_1 = __importDefault(require("../services/user"));
const rider_1 = __importDefault(require("../services/rider"));
const bidQuick_1 = __importDefault(require("../services/bidQuick"));
const notification_1 = require("../util/notification");
function socket(io) {
    return __awaiter(this, void 0, void 0, function* () {
        let userNSP = io.of('/user');
        let riderNSP = io.of('/rider');
        // R_quick(io);
        // let socketUser = {};
        // io.on("connection", async (socket: Socket) => {
        // });
        function sendRideStatus({ status, message }) {
            userNSP.emit("rideStatus", { status, message });
        }
        userNSP.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
            // const bids = await BidQuickService.findAll();
            // const final: any[] = [];
            // for (const bid of bids) {
            //     const riderData = (await UserService.findById(bid.dataValues.rider))?.dataValues;
            //     const rideData = (await R_quickService.findById(bid.dataValues.ride))?.dataValues;
            //     const categoryData = (await RC_quickService.findById(rideData.category))?.dataValues;
            //     final.push({ bid: bid.dataValues, riderData, categoryData });
            // }
            // // console.log(final, "final, dataValues");
            // userNSP.emit("allBids", final);
            console.log("user connected");
            socket.on("cancelRideQuick", ({ id, reason }, cb) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // console.log(id);
                    let result = yield R_quick_1.default.updateById(id, { status: "cancelled", });
                    // console.log(result);
                    const finalResult = yield R_quick_1.default.findById(id);
                    cb({ status: "success", data: finalResult });
                    riderNSP.emit("cancelRideQuick", finalResult);
                    // console.log("cancelRideQuick", "success");
                }
                catch (error) {
                    cb({ status: "error", message: error.message });
                }
            }));
            socket.on("newRideQuick", (data, cb) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // console.log(data);
                    const riders = yield rider_1.default.findAll();
                    for (const rider of riders) {
                        // riderNSP.emit("newRideQuick", rider);
                        (0, notification_1.notify)(rider.dataValues.fcmToken, "New Ride", `New Ride request of price ${data.bidPrice} has been made`);
                    }
                    const fifteenMinutesAgo = new Date(new Date().getTime() - 15 * 60 * 1000);
                    const oldRide = yield R_quick_1.default.findByQuery({
                        createdAt: {
                            [sequelize_1.Op.gte]: fifteenMinutesAgo,
                        },
                        user: data.user,
                    });
                    if (oldRide.length > 0) {
                        for (const ride of oldRide) {
                            yield R_quick_1.default.updateById(ride.dataValues.id, { status: "cancelled", });
                        }
                    }
                    let result = (yield R_quick_1.default.create(data)).dataValues;
                    // console.log(result);
                    cb({ status: "success", data: result });
                    console.log(result, ";;;;;;;;;;;;;;");
                    riderNSP.emit("newRideQuick", result);
                    console.log("newRideQuick", "success");
                }
                catch (error) {
                    cb({ status: "error", message: error.message });
                }
            }));
            socket.on("acceptRideQuick", ({ bid }, cb) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                try {
                    // console.log(bid);
                    const bidData = (_a = (yield bidQuick_1.default.findById(bid))) === null || _a === void 0 ? void 0 : _a.dataValues;
                    let result = yield R_quick_1.default.updateById(bidData === null || bidData === void 0 ? void 0 : bidData.ride, { status: "accepted", rider: bidData === null || bidData === void 0 ? void 0 : bidData.rider });
                    yield bidQuick_1.default.updateById(bid, { status: "accepted" });
                    // // console.log(result);
                    // console.log(bidData, "/////////////////");
                    const finalData = { rideData: (_b = (yield R_quick_1.default.findById(bidData === null || bidData === void 0 ? void 0 : bidData.ride))) === null || _b === void 0 ? void 0 : _b.dataValues, riderData: (_c = (yield rider_1.default.findById(bidData === null || bidData === void 0 ? void 0 : bidData.rider))) === null || _c === void 0 ? void 0 : _c.dataValues };
                    cb({ status: "success", data: finalData });
                    riderNSP.emit("acceptRideQuick", finalData);
                    console.log("acceptRideQuick", "success");
                }
                catch (error) {
                    cb({ status: "error", message: error.message });
                }
            }));
            socket.on("disconnect", () => {
                console.log("user disconnected");
            });
        }));
        riderNSP.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
            socket.on("sendBidQuick", (data, cb) => __awaiter(this, void 0, void 0, function* () {
                var _d, _e, _f;
                try {
                    const bid = yield bidQuick_1.default.create(Object.assign(Object.assign({}, data), { status: "pending" }));
                    const rideData = (_d = (yield R_quick_1.default.findById(bid.dataValues.ride))) === null || _d === void 0 ? void 0 : _d.dataValues;
                    const riderData = (_e = (yield rider_1.default.findById(bid.dataValues.rider))) === null || _e === void 0 ? void 0 : _e.dataValues;
                    const bids = yield bidQuick_1.default.findByQuery({ ride: data.ride });
                    const final = [];
                    for (const bid of bids) {
                        const riderData = (_f = (yield user_1.default.findById(bid.dataValues.rider))) === null || _f === void 0 ? void 0 : _f.dataValues;
                        final.push({ bid: bid.dataValues, riderData });
                    }
                    // console.log(final, "final, dataValues");
                    userNSP.emit("allBids", final);
                    cb({ status: "success" });
                }
                catch (error) {
                    cb({ status: "success", error });
                }
            }));
            socket.on("arrivedRideQuick", ({ status, bidId }, cb) => __awaiter(this, void 0, void 0, function* () {
                var _g, _h, _j;
                try {
                    const bidData = (_g = (yield bidQuick_1.default.findById(bidId))) === null || _g === void 0 ? void 0 : _g.dataValues;
                    let rideData = (yield R_quick_1.default.updateById(bidData === null || bidData === void 0 ? void 0 : bidData.ride, { status: "arrived", rider: bidData === null || bidData === void 0 ? void 0 : bidData.rider }));
                    const dataUpdated = (_h = (yield R_quick_1.default.findById(bidData === null || bidData === void 0 ? void 0 : bidData.ride))) === null || _h === void 0 ? void 0 : _h.dataValues;
                    const data = (_j = (yield user_1.default.findById(dataUpdated.user))) === null || _j === void 0 ? void 0 : _j.dataValues;
                    (0, notification_1.notify)(data.fcmToken, "Info", "Your rider has arrived");
                    userNSP.emit("arrivedRideQuick", { status: "success", data: rideData });
                    cb({ status: "success", message: "arrived successfully", data: rideData });
                }
                catch (error) {
                    cb({ status: "error", error });
                }
            }));
            socket.on("startedRideQuick", ({ status, bidId }, cb) => __awaiter(this, void 0, void 0, function* () {
                var _k, _l, _m;
                try {
                    const bidData = (_k = (yield bidQuick_1.default.findById(bidId))) === null || _k === void 0 ? void 0 : _k.dataValues;
                    let rideData = (yield R_quick_1.default.updateById(bidData === null || bidData === void 0 ? void 0 : bidData.ride, { status: "started", rider: bidData === null || bidData === void 0 ? void 0 : bidData.rider }));
                    const dataUpdated = (_l = (yield R_quick_1.default.findById(bidData === null || bidData === void 0 ? void 0 : bidData.ride))) === null || _l === void 0 ? void 0 : _l.dataValues;
                    const data = (_m = (yield user_1.default.findById(dataUpdated.user))) === null || _m === void 0 ? void 0 : _m.dataValues;
                    (0, notification_1.notify)(data.fcmToken, "Info", "Your rider has started");
                    userNSP.emit("startedRideQuick", { status: "success", data: rideData });
                    cb({ status: "success", message: "started successfully", data: rideData });
                }
                catch (error) {
                    cb({ status: "error", error });
                }
            }));
            socket.on("arriveRideQuick", ({ status, bidId }, cb) => __awaiter(this, void 0, void 0, function* () {
                var _o, _p, _q;
                try {
                    const bidData = (_o = (yield bidQuick_1.default.findById(bidId))) === null || _o === void 0 ? void 0 : _o.dataValues;
                    let rideData = (yield R_quick_1.default.updateById(bidData === null || bidData === void 0 ? void 0 : bidData.ride, { status: "arrived", rider: bidData === null || bidData === void 0 ? void 0 : bidData.rider }));
                    const dataUpdated = (_p = (yield R_quick_1.default.findById(bidData === null || bidData === void 0 ? void 0 : bidData.ride))) === null || _p === void 0 ? void 0 : _p.dataValues;
                    const data = (_q = (yield user_1.default.findById(dataUpdated.user))) === null || _q === void 0 ? void 0 : _q.dataValues;
                    (0, notification_1.notify)(data.fcmToken, "Info", "Your rider has arrived");
                    userNSP.emit("arrivedRideQuick", { status: "success", data: rideData });
                    cb({ status: "success", message: "arrived successfully", data: rideData });
                }
                catch (error) {
                    cb({ status: "error", error });
                }
            }));
            socket.on("cancelRideQuick", ({ id }, cb) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // console.log(id);
                    let result = yield R_quick_1.default.updateById(id, { status: "cancelled", });
                    // console.log(result);
                    const finalResult = yield R_quick_1.default.findById(id);
                    cb({ status: "success", data: finalResult });
                    riderNSP.emit("cancelRideQuick", finalResult);
                    // console.log("cancelRideQuick", "success");
                }
                catch (error) {
                    cb({ status: "error", message: error.message });
                }
            }));
            // riderNSP.emit("newRideQuick", { data: final });
            socket.on("join", (data) => {
                console.log(data);
            });
            riderNSP.emit("join", "hello");
            socket.on("disconnect", () => {
                console.log("rider disconnected");
            });
        }));
        // console.log("woowowowowow");
    });
}
exports.default = socket;
