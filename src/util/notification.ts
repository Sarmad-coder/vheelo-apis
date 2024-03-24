import { sendNotification } from "./fcm";

export const notify = async (registrationToken, title, body,navigate) => {
    try {
        const payload = {
            notification: {
                title,
                body
            },
            
            data: {
                screen:navigate
            }
        };
        await sendNotification(registrationToken, payload);
        console.log("notification sent");
    } catch (error) {
        console.log("no notification sent");
    }
}
