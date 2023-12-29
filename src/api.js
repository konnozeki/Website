const HOST = "http://localhost:8000/";

export const backendUrl = function (url) {
    return HOST + url; 
} 

export const ADMIN_GET_LIST_FILM_API = HOST + "api/admin/film/";
export const ADMIN_GET_FILM_API = function (id) {
    return HOST + "admin/film/" + id + "/";
}