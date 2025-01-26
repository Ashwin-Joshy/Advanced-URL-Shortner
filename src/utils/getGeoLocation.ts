import axios from "axios";
import { count } from "console";

export const getGeolocation = async (ipAddress: string) => {
    try {
        const ip = "103.182.166.50"
        const response: any = await axios.get(`http://ip-api.com/json/${ip}`);
        if (response.data?.status === "fail") {
            throw new Error("Error fetching geolocation");
        }
        console.log("Location from another endpoint", response.data, "Ip", ipAddress);

        return { status: true, country:response.data.country }
    } catch (error) {
        console.error('Error fetching geolocation:', error);
        return { status: false, error }
    }
}