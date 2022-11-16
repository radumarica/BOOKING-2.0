declare global {
    type TypeUser = {
        walletAddress: string;
        registeredEmail: string;
        bookings: Array<Document>;
        isVerified: boolean;
        latestOTP: String;
    };
}

export {};
