import { Socket } from "socket.io";
import { Op } from "sequelize"
import { Server, } from "socket.io";
import R_quickService from "../services/R_quick";
import R_hourlyService from "../services/R_hourly";
import RC_quickService from "../services/RC_quick";
import RC_hourlyService from "../services/RC_hourly";
import RC_cityModel from "../models/RC_city"
import R_cityModel from "../models/R_city"
import R_dailyModel from "../models/R_daily"
import RC_scheduleModel from "../models/RC_schedule"
import R_scheduleModel from "../models/R_schedule"
import UserService from "../services/user";
import RiderService from "../services/rider";
import RiderDocumentService from "../services/riderDocument";
import BidQuickService from "../services/bidQuick"
import BidCityModel from "../models/bidCity"
import VehicleInfoService from "../services/vehicleInfo"
import { notify } from '../util/notification';
import { findById } from '../paths/common/controllers/city';
import { calculateDistance, getCoordinateRange } from "../util/distance";
import { calculatePrice } from "../util/hourlyPrice";
import { getHoursPassed } from "../util/time";
import SupportService from "../services/support"
import BidDailyModel from "../models/bidDaily"


export default async function socket(io: Server) {

    let userNSP = io.of('/user');
    let riderNSP = io.of('/rider');
    const messageNSP = io.of("/message")
    // R_quick(io);
    // let socketUser = {};
    // io.on("connection", async (socket: Socket) => {
    // });

    function sendRideStatus({ status, message }) {
        userNSP.emit("rideStatus", { status, message });
    }



    messageNSP.on("connection", async (socket: Socket) => {
        console.log("user connected");
        socket.on("send", async (data, cb) => {
            try {
                // console.log(id);
                const message = await SupportService.create(data);
                messageNSP.emit("sendMessage", { status: "success", data: message });
                console.log("messageSend", "success");
            } catch (error) {
                cb({ status: "error", message: error });
            }

        })
    });

    userNSP.on("connection", async (socket: Socket) => {
        console.log("user connected");
        socket.on("cancelRideQuick", async ({ id, reason }, cb) => {
            try {
                // console.log(id);
                let result = await R_quickService.updateById(id, { status: "cancelled", });
                // console.log(result);
                const finalResult = await R_quickService.findById(id);
                cb({ status: "success", data: finalResult });
                riderNSP.emit("cancelRideQuick", { status: "success", data: finalResult });
                // console.log("cancelRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }

        })

        socket.on("cancelRideHourlyUser", async ({ id, reason }, cb) => {
            try {
                // console.log(id);
                let result = await R_hourlyService.updateById(id, { status: "cancelled", });
                // console.log(result);
                const finalResult = (await R_hourlyService.findById(id)).dataValues;
                cb({ status: "success", data: finalResult });
                riderNSP.emit("cancelRideHourlyUser", { status: "success", data: finalResult });
                // console.log("cancelRidehourly", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }

        })

        socket.on("newRideQuick", async (data, cb) => {
            try {
                // console.log(data);
                const coordinateRange = getCoordinateRange(data.pickupLat, data.pickupLon);
                const riders2=await VehicleInfoService.findByQuery({
                    categoryId:data.category
                })
                // console.log(riders2);
                let idstoMatch=[]
                riders2.forEach(element => {
                    idstoMatch.push(element.dataValues.rider)
                });
                
                
                let riders = await RiderService.findByQuery({
                    currLat: {
                        [Op.between]: [coordinateRange.minLatitude, coordinateRange.maxLatitude],
                    },
                    currLon: {
                        [Op.between]: [coordinateRange.minLongitude, coordinateRange.maxLongitude],
                    },
                    id: {
                        [Op.in]: idstoMatch
                    }
                });

                // console.log(riders);
                
                
                // const riders = await RiderService.findAll();
                for (const rider of riders) {
                    // riderNSP.emit("newRideQuick", rider);
                    notify(rider.dataValues.fcmToken, "New Ride Quick", `New Ride request of price ${data.bidPrice} has been made`,"offer")
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
                const userData = (await UserService.findById(data.user)).dataValues;
                const categoryData = (await RC_quickService.findById(data.category)).dataValues;

                let result = (await R_quickService.create(data)).dataValues;
                // console.log(result);
                cb({ status: "success", data: result });
                // console.log(result, ";;;;;;;;;;;;;;");

                riderNSP.emit("newRideQuick", { doc: result, userData, categoryData });
                console.log("newRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");

            }
        });


        socket.on("newRideDaily", async (data, cb) => {
            try {
                // console.log(data);
                const coordinateRange = getCoordinateRange(data.pickupLat, data.pickupLng);
                const riders = await RiderService.findByQuery({
                    currLat: {
                        [Op.between]: [coordinateRange.minLatitude, coordinateRange.maxLatitude],
                    },
                    currLon: {
                        [Op.between]: [coordinateRange.minLongitude, coordinateRange.maxLongitude],
                    },
                },);
                // const riders = await RiderService.findAll();
                for (const rider of riders) {
                    // riderNSP.emit("newRideQuick", rider);
                    notify(rider.dataValues.fcmToken, "New Ride", `New Ride request of price ${data.bidPrice} has been made`,"")
                }
                // const fifteenMinutesAgo = new Date(new Date().getTime() - 15 * 60 * 1000);
                // const oldRide = await R_quickService.findByQuery({
                //     createdAt: {
                //         [Op.gte]: fifteenMinutesAgo,
                //     },
                //     user: data.user,
                // });
                // if (oldRide.length > 0) {
                //     for (const ride of oldRide) {
                //         await R_quickService.updateById(ride.dataValues.id, { status: "cancelled", });
                //     }
                // }
                const userData = (await UserService.findById(data.user)).dataValues;
            //    const id=data.category
            //     const categoryData = (await RC_cityModel.findOne({ where: { id } }));

                let result = (await R_dailyModel.create(data));
                console.log(result);
                cb({ status: "success", data: result });
                // console.log(result, ";;;;;;;;;;;;;;");

                riderNSP.emit("newRideDaily", { doc: result, userData });
                console.log("newRideDaily", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");

            }
        });

        socket.on("newRideCity", async (data, cb) => {
            try {
                // console.log(data);
                const coordinateRange = getCoordinateRange(data.pickupLat, data.pickupLng);
                const riders = await RiderService.findByQuery({
                    currLat: {
                        [Op.between]: [coordinateRange.minLatitude, coordinateRange.maxLatitude],
                    },
                    currLon: {
                        [Op.between]: [coordinateRange.minLongitude, coordinateRange.maxLongitude],
                    },
                },);
                // const riders = await RiderService.findAll();
                for (const rider of riders) {
                    // riderNSP.emit("newRideQuick", rider);
                    notify(rider.dataValues.fcmToken, "New Ride City", `New Ride request of price ${data.bidPrice} has been made`,"citytocity")
                }
                // const fifteenMinutesAgo = new Date(new Date().getTime() - 15 * 60 * 1000);
                // const oldRide = await R_quickService.findByQuery({
                //     createdAt: {
                //         [Op.gte]: fifteenMinutesAgo,
                //     },
                //     user: data.user,
                // });
                // if (oldRide.length > 0) {
                //     for (const ride of oldRide) {
                //         await R_quickService.updateById(ride.dataValues.id, { status: "cancelled", });
                //     }
                // }
                const userData = (await UserService.findById(data.user)).dataValues;
               const id=data.category
                const categoryData = (await RC_cityModel.findOne({ where: { id } }));

                let result = (await R_cityModel.create(data));
                // console.log(result);
                cb({ status: "success", data: result });
                // console.log(result, ";;;;;;;;;;;;;;");

                riderNSP.emit("newRideCity", { doc: result, userData, categoryData });
                console.log("newRideCity", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");

            }
        });
        socket.on("newRideSchedule", async (data, cb) => {
            try {
                // console.log(data);
                const coordinateRange = getCoordinateRange(data.pickupLat, data.pickupLon);
                const riders = await RiderService.findByQuery({
                    currLat: {
                        [Op.between]: [coordinateRange.minLatitude, coordinateRange.maxLatitude],
                    },
                    currLon: {
                        [Op.between]: [coordinateRange.minLongitude, coordinateRange.maxLongitude],
                    },
                },);
                // const riders = await RiderService.findAll();
                for (const rider of riders) {
                    // riderNSP.emit("newRideQuick", rider);
                    notify(rider.dataValues.fcmToken, "New Ride", `New Schedule Ride Request has been made.`,"");
                }
                // const fifteenMinutesAgo = new Date(new Date().getTime() - 15 * 60 * 1000);
                // const oldRide = await R_quickService.findByQuery({
                //     createdAt: {
                //         [Op.gte]: fifteenMinutesAgo,
                //     },
                //     user: data.user,
                // });
                // if (oldRide.length > 0) {
                //     for (const ride of oldRide) {
                //         await R_quickService.updateById(ride.dataValues.id, { status: "cancelled", });
                //     }
                // }
                const userData = (await UserService.findById(data.user)).dataValues;
               const id=data.category
                const categoryData = (await RC_scheduleModel.findOne({ where: { id } }));

                let result = (await R_scheduleModel.create(data));
                // console.log(result);
                cb({ status: "success", data: result });
                // console.log(result, ";;;;;;;;;;;;;;");

                riderNSP.emit("newRideSchedule", { doc: result, userData, categoryData });
                console.log("newRideSchedule", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
                // console.log(error, ";;;;;;;;;;;;;");

            }
        });

        

        socket.on("acceptRideCity", async (data, cb) => {
            try {
               console.log("accepted\\\\\\\\\\",data);

               let result= await R_cityModel.update({ rider: data.rider,status:"accepted",bidPrice:data.bidPrice},{
                   where:{
                       id: data.ride
                   }
               });
               let ride:any=await R_cityModel.findOne({where:{id:data.ride}})
               let rider:any=await RiderService.findById(data.rider)
               // await R_quickService.updateById(bidData.ride, { bidPrice: bidData.amount });
               // let result = await R_quickService.updateById(bidData?.ride, { status: "accepted", rider: bidData?.rider });
               
                   

               // await RiderService.updateByQuery({ id: data.rider }, { status: "busy" })

               let user = await UserService.findById(ride.user)
               cb({ status: "success",data:ride,rider});
            //    riderNSP.emit("acceptRideCity", { status: "success" });
            //    userNSP.emit("acceptRideCity", { data:ride });
               console.log("acceptRideCity", "success");
               notify(rider.fcmToken, "RideCity", "User has accepted your ride","")
           } catch (error) {
               cb({ status: "error", message: error.message });
               console.log(error, "fffffff");

           }
       })

       socket.on("acceptRideDaily", async (data, cb) => {
        try {
           console.log("accepted\\\\\\\\\\",data);

           let result= await R_dailyModel.update({ rider: data.rider,status:"accepted",bidPrice:data.bidPrice},{
               where:{
                   id: data.ride
               }
           });
           let ride:any=await R_dailyModel.findOne({where:{id:data.ride}})
           let rider:any=await RiderService.findById(data.rider)
           // await R_quickService.updateById(bidData.ride, { bidPrice: bidData.amount });
           // let result = await R_quickService.updateById(bidData?.ride, { status: "accepted", rider: bidData?.rider });
           
               

           // await RiderService.updateByQuery({ id: data.rider }, { status: "busy" })

           let user = await UserService.findById(ride.user)
           cb({ status: "success",data:ride,rider});
        //    riderNSP.emit("acceptRideCity", { status: "success" });
        //    userNSP.emit("acceptRideCity", { data:ride });
           console.log("acceptRideCity", "success");
           notify(rider.fcmToken, "RideDaily", "User has accepted your ride","")
       } catch (error) {
           cb({ status: "error", message: error.message });
           console.log(error, "fffffff");

       }
   })

        socket.on("acceptRideQuick", async ({ bid }, cb) => {
            try {
                console.log("accepted\\\\\\\\\\");
                const bidData = (await BidQuickService.findById(bid))?.dataValues;
                console.log(bidData, "llll");

                await R_quickService.updateById(bidData.ride, { bidPrice: bidData.amount });
                let result = await R_quickService.updateById(bidData?.ride, { status: "accepted", rider: bidData?.rider });
                await BidQuickService.updateById(bid, { status: "accepted" })
                const finalData = { rideData: (await R_quickService.findById(bidData?.ride))?.dataValues, riderData: (await RiderService.findById(bidData?.rider))?.dataValues };
                await RiderService.updateByQuery({ id: bidData?.rider }, { status: "busy" })
                cb({ status: "success", data: finalData });
                riderNSP.emit("acceptRideQuick", { data: finalData, status: "success" });
                console.log("acceptRideQuick", "success");
                notify(finalData.riderData.fcmToken, "Quick Ride Accepted", `Quick Ride has been accepted of price ${bidData.amount}`,"")

            } catch (error) {
                cb({ status: "error", message: error.message });
                console.log(error, "fffffff");

            }
        })

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });

    });
    riderNSP.on("connection", async (socket: Socket) => {
        console.log("rider connected");
        // socket.on("acceptRideDaily", async ({ riderId, rideId, userId }, cb) => {
        //     try {
        //         const rideData = (await R_hourlyService.findById(rideId))?.dataValues;
        //         const riderData = (await RiderService.findById(riderId))?.dataValues;
        //         const categoryData = (await RC_hourlyService.findById(rideData?.category))?.dataValues;
        //         console.log(rideData
        //             , "final, dataValues");
        //         userNSP.emit("acceptRideHourly", { ...riderData, status: "success" });
        //         cb({ status: "success", rideData, categoryData })
        //     } catch (error) {
        //         cb({ status: "error", error })
        //         console.log(error, "kkkkkkkkk");

        //     }
        // })

        socket.on("getDummyHourly", async (data, cb) => {
            try {
                const rides = await R_hourlyService.findAll();
                const final: any[] = []
                for (const ride of rides) {
                    const userData = (await UserService.findById(1))?.dataValues;
                    const categoryData = (await RC_hourlyService.findById(1))?.dataValues;
                    final.push({ ride, userData, categoryData });
                }
                cb({ status: "success", data: final });
            } catch (error) {
                cb({ status: "error", message: error.message });
            }
        })

        socket.on("sendBidQuick", async (data, cb) => {
            try {
                const bid:any = await BidQuickService.create({ ...data, status: "pending" });
                const rideData = (await R_quickService.findById(bid.dataValues.ride))?.dataValues;
                const riderData = (await RiderService.findById(bid.dataValues.rider))?.dataValues;
                const riderDocuments=(await RiderDocumentService.findByQuery({rider:bid.rider}))
                const vehicleInfo:any=(await VehicleInfoService.findByQuery({rider:bid.rider}))
                const categoryData = (await RC_quickService.findById(rideData?.category))?.dataValues;
                const bids:any = await BidQuickService.findByQuery({ ride: data.ride });
                const userData = (await UserService.findById(rideData.user))?.dataValues;
          
                const final: any[] = [];
                for (const bid of bids) {
                    const riderData = (await RiderService.findById(bid.dataValues.rider))?.dataValues;
                    // console.log(bid.dataValues, "kkkkk");

                    final.push({ bid: bid.dataValues, riderData, categoryData,vehicleInfo});
                    // console.log(riderData, "jjjjjj");
                    notify(userData.fcmToken, "New Bid", `New Bid request of price ${bid.amount} has been made`,"")
                }
                
                console.log(final, "final, dataValues");
                setTimeout(async () => {
                    await BidQuickService.updateById(bid.dataValues.id, { status: "expired" });
                    userNSP.emit("expiredBidQuick", bid.dataValues.id);
                }, 10000);
                userNSP.emit("allBids", { status: "success", data: final, userData});
                console.log({ data: final, userData }, "8888888888");

                cb({ status: "success", bidId: bid.dataValues.id })
            } catch (error) {
                cb({ status: "error", error })

            }
        })
        socket.on("sendBidCity", async (data, cb) => {
            try {
                const bid = await BidCityModel.create({ ...data, status: "pending" });
                const rideData:any = await R_cityModel.findOne({where:{id:data.ride}});
                // const rideData = (await R_quickService.findById(bid.dataValues.ride))?.dataValues;
                const riderData:any = await RiderService.findById(data.rider);
                const categoryData = await RC_cityModel.findOne({where:{id:rideData.category}});
                // const categoryData = (await RC_quickService.findById(rideData?.category))?.dataValues;
                const bids:any = await BidCityModel.findAll({where:{ride:data.ride}});
                // const bids = await BidQuickService.findByQuery({ ride: data.ride });
                 const userData = (await UserService.findById(rideData.user));
                // const userData = (await UserService.findById(rideData.user))?.dataValues;
                const final: any[] = [];
                for (const bid of bids) {
                    const riderData = (await RiderService.findById(bid.rider));
                    // console.log(bid.dataValues, "kkkkk");

                    final.push({ bid: bid, riderData,rideData });
                    // console.log(riderData, "jjjjjj");

                }
                console.log(final, "final, dataValues");
                // setTimeout(async () => {
                //     await BidQuickService.updateById(bid.id, { status: "expired" });
                //     userNSP.emit("expiredBidQuick", bid.id);
                // }, 10000);
                userNSP.emit("allBidsCity", { status: "success", data: final, userData});
                console.log({ data: final, userData }, "8888888888");

                cb({ status: "success", bidId: bid })
            } catch (error) {
                cb({ status: "error", error })

            }
        })

        socket.on("sendBidDaily", async (data, cb) => {
            try {
                const bid:any = await BidDailyModel.create({ ...data, status: "pending" });
                const rideData:any = await R_dailyModel.findOne({where:{id:data.ride}});
                // const rideData = (await R_quickService.findById(bid.dataValues.ride))?.dataValues;
                const riderData:any = await RiderService.findById(data.rider);
                // const categoryData = await RC_cityModel.findOne({where:{id:rideData.category}});
                const bids:any = await BidDailyModel.findAll({where:{ride:data.ride}});
                // const bids = await BidQuickService.findByQuery({ ride: data.ride });
                 const userData:any = (await UserService.findById(rideData.user));
                // const userData = (await UserService.findById(rideData.user))?.dataValues;
                const vehicleInfo:any=(await VehicleInfoService.findByQuery({rider:bid.rider}))
                const final: any[] = [];
                for (const bid of bids) {
                    const riderData = (await RiderService.findById(bid.rider));
                    // console.log(bid.dataValues, "kkkkk");

                    final.push({ bid: bid, riderData,rideData,vehicleInfo });
                    // console.log(riderData, "jjjjjj");

                }
                console.log(final, "final, dataValues");
                // setTimeout(async () => {
                //     await BidQuickService.updateById(bid.id, { status: "expired" });
                //     userNSP.emit("expiredBidQuick", bid.id);
                // }, 10000);
                userNSP.emit("allBidsDaily", { status: "success", data: final, userData});
                notify(userData.fcmToken, "New Bid", `New Bid request of price ${bid.amount} has been made`,"")
                console.log({ data: final, userData }, "8888888888");

                cb({ status: "success", bidId: bid })
            } catch (error) {
                cb({ status: "error", error })

            }
        })

        socket.on("arrivedRideQuick", async ({ status, bidId }, cb) => {
            try {
                // console.log(bidId);

                const bidData = (await BidQuickService.findById(bidId))?.dataValues;
                console.log(bidData, ",,,,,,,,,");

                let rideData = (await R_quickService.updateById(bidData?.ride, { status: "arrived", rider: bidData?.rider }));
                const dataUpdated = (await R_quickService.findById(bidData?.ride))?.dataValues;
                const data = (await UserService.findById(dataUpdated.user))?.dataValues;
                notify(data.fcmToken, "Info", "Your rider has arrived","")
                userNSP.emit("arrivedRideQuick", { status: "success", data: rideData,user:data });
                cb({ status: "success", message: "arrived successfully", data: rideData })
            } catch (error) {
                cb({ status: "error", error })
                console.log(error, ".....................");

            }
        });

        socket.on("arrivedRideHourly", async ({ rideId, riderId }, cb) => {
            try {
                let rideData = (await R_hourlyService.updateById(rideId, { status: "arrived", rider: riderId }));
                const dataUpdated = (await R_hourlyService.findById(rideData))?.dataValues;
                console.log(dataUpdated, "oooooooooooooo");

                const data = (await UserService.findById(dataUpdated.user))?.dataValues;
                notify(data.fcmToken, "Info", "Your rider has arrived","")
                userNSP.emit("arrivedRideHourly", { status: "success", data: rideData });
                cb({ status: "success", message: "arrived successfully", data: rideData })
            } catch (error) {
                cb({ status: "error", error })
                console.log(error, ".....................");
            }
        });

        socket.on("startedRideQuick", async ({ status, bidId }, cb) => {
            try {
                const bidData = (await BidQuickService.findById(bidId))?.dataValues;
                let rideData = (await R_quickService.updateById(bidData?.ride, { status: "started", rider: bidData?.rider }));
                const dataUpdated = (await R_quickService.findById(bidData?.ride))?.dataValues;
                const data = (await UserService.findById(dataUpdated.user))?.dataValues;
                notify(data.fcmToken, "Info", "Your rider has started","")
                userNSP.emit("startedRideQuick", { status: "success", data: rideData,user:data });
                cb({ status: "success", message: "started successfully", data: rideData })
            } catch (error) {
                cb({ status: "error", error })
            }
        })

        socket.on("startedRideHourly", async ({ riderId, rideId, userId }, cb) => {
            try {
                let rideData = (await R_hourlyService.updateById(rideId, { status: "started", rider: riderId }));
                const dataUpdated = (await R_hourlyService.findById(rideData))?.dataValues;
                const data = (await UserService.findById(dataUpdated.user))?.dataValues;
                notify(data.fcmToken, "Info", "Your rider has started","")
                userNSP.emit("startedRideHourly", { status: "success", data: rideData });
                cb({ status: "success", message: "started successfully", data: rideData })
            } catch (error) {
                cb({ status: "error", error })
                console.log(error, ".....................");
            }
        })

        socket.on("endedRideQuick", async ({ status, bidId }, cb) => {
            try {
                console.log("ended..............");

                const bidData = (await BidQuickService.findById(bidId))?.dataValues;
                // console.log(bidData, "/////////////");
                // console.log(bidData, ",,,,");

                (await R_quickService.updateById(bidData?.ride, { status: "ended", rider: bidData?.rider }));
                // console.log(rideData, "/////////////");
                let rideData = (await R_quickService.findById(bidData?.ride)).dataValues;
                const categoryData = (await RC_quickService.findById(rideData?.category))?.dataValues;
                const dataUpdated = (await R_quickService.findById(bidData?.ride))?.dataValues;
                const data = (await UserService.findById(dataUpdated.user))?.dataValues;
                notify(data.fcmToken, "Info", "Your rider has ended the ride","");
                await RiderService.updateByQuery({ id: bidData?.rider }, { status: "available" })

                userNSP.emit("endedRideQuick", { status: "success", data: rideData,user:data });
                cb({ status: "success", message: "ended successfully", data: { rideData, categoryData } })
            } catch (error) {
                cb({ status: "error", error })
                console.log(error);

            }
        });

        socket.on("endedRideHourly", async ({ riderId, rideId, userId, }, cb) => {
            try {
                let rideData = (await R_hourlyService.updateById(rideId, { status: "ended", rider: riderId }));
                const dataUpdated = (await R_hourlyService.findById(rideData))?.dataValues;
                const categoryData = (await RC_hourlyService.findById(dataUpdated.category))?.dataValues;
                const userData = (await UserService.findById(dataUpdated.user))?.dataValues;

                const timeTaken = getHoursPassed(dataUpdated.createdAt);
                const price = calculatePrice({ distance: dataUpdated.distance, rateKm: categoryData?.priceKm, hours: timeTaken, rateHour: categoryData?.priceHour });


                notify(userData.fcmToken, "Info", "Your rider has ended the ride","");

                userNSP.emit("endedRideHourly", { status: "success", data: dataUpdated });
                cb({ status: "success", message: "ended successfully", data: dataUpdated, price, categoryData, timeTaken, distance: dataUpdated.distance });
            } catch (error) {
                cb({ status: "error", error })
                console.log(error, ".....................");
            }
        });


        socket.on("cancelRideQuick", async ({ id }, cb) => {
            try {
                // console.log(id);
                let result = await R_quickService.updateById(id, { status: "cancelled", });
                // console.log(result);
                const finalResult = (await R_quickService.findById(id)).dataValues;
                cb({ status: "success", data: finalResult });
                riderNSP.emit("cancelRideQuick", { status: "success", data: finalResult });
                // console.log("cancelRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }

        });
        socket.on("endRideCity", async (data, cb) => {
            try {
                // console.log(id);
                let result = await R_cityModel.update({status:"completed"},{
                    where:{
                        id: data.ride
                    }
                });
                const userData:any = await UserService.findById(data.user)
                // console.log(result);
                cb("City Ride has completed successfully");
                notify(userData.fcmToken, "Info", "Your rider has ended the ride","");
                // console.log("cancelRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }

        });

        socket.on("endRideDaily", async (data, cb) => {
            try {
                // console.log(id);
                let result = await R_dailyModel.update({status:"completed"},{
                    where:{
                        id: data.ride
                    }
                });
                const userData:any = await UserService.findById(data.user)
                // console.log(result);
                cb("Daily Ride has completed successfully");
                notify(userData.fcmToken, "Info", "Your rider has ended the ride","");
                // console.log("cancelRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }

        });
        

        socket.on("updateDistanceHourly", async ({ rideId, lat1, lon1, lat2, lon2 }, cb) => {
            try {
                const old = ((await R_hourlyService.findById(rideId)).dataValues).distance;
                let distance = calculateDistance(lat1, lon1, lat2, lon2);
                distance += old;
                await R_hourlyService.updateById(rideId, { distance });
                cb({ status: "success", message: "updated successfully", distance, coordinates: { lat2, lon2 } });
            } catch (error) {
                cb({ status: "error", message: error });
            }
        });

        socket.on("updateCoordinatesRider", async ({ riderId, currLat, currLon }, cb) => {
            try {
                await RiderService.updateByQuery({ id: riderId }, { currLat, currLon });
                cb({ status: "success", message: "updated successfully" });
            } catch (error) {
                cb({ status: "error", message: error });
                console.log(error, "kkkkk");

            }
        })


        // riderNSP.emit("newRideQuick", { data: final });
        socket.on("join", (data) => {
            console.log(data);
        });
        socket.on("disconnect", () => {
            console.log("rider disconnected");
        });
    });
    // console.log("woowowowowow");

}



