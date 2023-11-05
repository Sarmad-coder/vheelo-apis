export function calculatePrice({ distance, rateKm, hours, rateHour }: { distance: any, rateKm: any, hours: any, rateHour: any }): number {
    try {
        console.log(distance, rateKm, hours, rateHour, "pppppppp");

        distance = parseInt(distance) || 0
        rateKm = parseInt(rateKm) || 0
        hours = parseInt(hours) || 0
        rateHour = parseInt(rateHour) || 0
        let price = rateHour * hours;
        let more = 0;
        if (distance > hours * 20) {
            more = (distance - hours * 20) * (rateKm * hours);
        }
        console.log(price, "jjjjjjjjj");

        return price + more;
    } catch (error) {
        console.log(0, "iiiiiiiii");

        return 0;
    }
}
