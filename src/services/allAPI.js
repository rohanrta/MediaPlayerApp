// saveVideoAPI - post http request ,add component

import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"


export const saveVideoAPI = async (videoDetails) => {
    return await commonAPI(`POST`,`${SERVERURL}/uploadVideos`,videoDetails)
     
}

// getAllVideosAPI - GET http request ,View component when component displayes in browser inside its useEffect Hook
export const getAllVideosAPI = async () =>{
    return await commonAPI(`GET`,`${SERVERURL}/uploadVideos`,"")
}


// saveHistoryAPI - POST http Method to http://localhost:3000/history called by videocard when we click on video
export const saveHistoryAPI = async (historyDetails) =>{
    return await commonAPI(`POST`,`${SERVERURL}/history`,historyDetails)
}

// getHistoryAPI - GET http method http://localhost:3000/history, history components displayes in browser inside its useEffect Hook
export const getAllHistoryAPI = async () =>{
    return await commonAPI(`GET`,`${SERVERURL}/history`,"")
}

// deleteHistoryAPI - delete method to http:??localhost:3000/history/id called by history when clicked on delete button
export const deleteHistoryAPI = async(id) =>{
    return await commonAPI('DELETE',`${SERVERURL}/history/${id}`,{})
}

// removeVideoAPI -delete method to http:localhost:3000/history/id called by videoCard whrn delete button is clicked
export const removeVideoAPI = async(id) =>{
    return await commonAPI('DELETE',`${SERVERURL}/uploadVideos/${id}`,{})
}

// saveCategoryAPI - post method to http:localhost:3000/categories called by category component when user click on add btn
export const saveCategoryAPI = async (categoryDetails) =>{
    return await commonAPI(`POST`,`${SERVERURL}/categories`,categoryDetails)
}
// getAllCategoryAPI - GET http request ,http://locakhost:3000/categories called category when component is loaded in browser
export const getAllCategoryAPI = async () =>{
    return await commonAPI(`GET`,`${SERVERURL}/categories`,"")
}

// deleteCategoryAPI - delete method to http://localhost:3000/categories/id called by category when delete button is clicked

export const deleteCategoryAPI =async (id)=>{
    return await commonAPI(`DELETE`,`${SERVERURL}/categories/${id}`,{})
}

// updateCategoryAPI - put method to http://localhost:3000/categories/id called by category when videocard is drop over the category

export const updateCategoryAPI =async (categoryDetails)=>{
    return await commonAPI(`PUT`,`${SERVERURL}/categories/${categoryDetails.id}`,categoryDetails)
}

