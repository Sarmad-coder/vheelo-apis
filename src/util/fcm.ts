import admin, {ServiceAccount} from 'firebase-admin';
import serviceAccount from '../config/vheelo-543c6-firebase-adminsdk-9mwnm-a0d3f4f364.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    // databaseURL: '<your-database-url>'
});

export const sendNotification = async (registrationToken, payload) => {
    try {
        const response = await admin.messaging().send({
            token: registrationToken,
            notification: payload.notification,
            data: payload.data
        });
        console.log(`FCM notification sent: ${response}`);
    } catch (error) {
        console.error(`Error sending FCM notification: ${error}`);
    }
};
