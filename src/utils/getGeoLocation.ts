import axios from "axios";

export const getGeolocation = async (ipAddress: string) => {
    try {
        const response: any = await axios.get(`http://ip-api.com/json/${cleanIpAddress(ipAddress)}`);
        if (response.data?.status === "fail") {
            throw new Error("Error fetching geolocation");
        }
        return { status: true, country: response.data.country }
    }
    catch (error) {
        console.error('Error fetching geolocation:', error);
        return { status: false, error }
    }
}
function cleanIpAddress(ip: string): string {
    return ip.replace(/^::ffff:/, ''); 
}