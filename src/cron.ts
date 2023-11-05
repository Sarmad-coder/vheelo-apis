import cron from 'node-cron';
export default function main() {

    cron.schedule('* * * * *', () => {
        // Your task to be executed every minute goes here
        console.log('Running task...');
    });

}
