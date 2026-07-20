import { serverMutation } from "../core/server"

export const addDestination = async (data) => {
    return serverMutation('/api/destinations', data, 'POST')
}


export const getAIRecommendations = async (data) => {
    return serverMutation('/api/ai/recommend', data, 'POST');
};


export const getChatBot= async(data) =>{
    return serverMutation('/api/ai/chat', data , 'POST');
}



export const deleteDestination = async (data) => {
    return serverMutation(`/api/delete-destinations/${data.id}`, {}, 'DELETE')
}