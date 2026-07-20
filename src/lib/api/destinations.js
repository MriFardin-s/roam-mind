import { protectedFetch, serverFetch } from "../core/server"


export const getDestinations = async (filters = {}) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            params.append(key, String(value));
        }
    });

    const queryString = params.toString();
    const url = queryString ? `/api/destinations?${queryString}` : `/api/destinations`;

    return serverFetch(url);
};

export const getDestinationsById = async (id) => {
    return serverFetch(`/api/destinations/${id}`)
}

export const getManageItems = async (email, role) => {
    return protectedFetch(`/api/manage-destinations?email=${email}&role=${role}`);
};


export const getLatestItems = async () => {
    return serverFetch(`/api/destinations-latest`)

}


export const getRegionStats = async () => {
    return serverFetch("/api/region-stats");
};


export const getPlatformStats = async () => {
    return serverFetch("/api/stats");
};

