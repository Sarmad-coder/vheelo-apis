import { sendNotification } from "./fcm";

export const notify = async (registrationToken, title, body) => {
    try {
        const payload = {
            notification: {
                title,
                body
            },
            data: {
                // optional data payload
            }
        };
        await sendNotification(registrationToken, payload);
        console.log("notification sent");
    } catch (error) {
        console.log("no notification sent");
    }
}
