// This is a fake server to subscribe an email address. The counter is used to reject the subscription when it is 2
let count = 0; 

export default function postEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (count <= 1) {
                resolve();
                count++; // Increase counter
            } else {
                reject(`Sever is down to subcribe email: ${email}`);
                count = 0; // Reset counter
            }
        }, Math.random()*1000 + 3000);
    });
}