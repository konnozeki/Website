const HOST = "http://localhost:8000/";

export const backendUrl = function (url) {
    return HOST + url; 
} 

export const ADMIN_LIST_CREATE_FILM_API = HOST + "api/admin/film/";
export const ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API = function (id) {
  return HOST + "api/admin/film/" + id + "/";
};