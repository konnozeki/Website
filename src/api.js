const HOST = "http://localhost:8000";
const API = '/api/'
export const backendUrl = function (url) {
    return HOST + url; 
} 

export const ADMIN_LIST_CREATE_FILM_API = HOST + "/api/admin/film/";
export const ADMIN_RETRIEVGER_UPDATE_DELETE_FILM_API = function (id) {
  return HOST + "/api/admin/film/" + id + "/";
};

export const ADMIN_LIST_USER_GENERIC_API = HOST + '/api/generic/user/'

export const LIST_COUNTRY_API = HOST + '/api/country/'

export const LIST_ACTOR_IN_COUNTRY_API = function(slug) {
  return HOST + '/api/country/' + slug + '/actors/'
}

export const REGISTER_API = HOST + '/api/register/'

export const LOG_OUT_API = HOST + '/api/api/logoutall/'
export const LOGIN_API = HOST + '/api/login/'


export const CHANGE_PASSWORD_API = HOST + '/api/changepassword/'

export const ADMIN_LIST_USER_API = HOST + '/api/admin/user_list/'

export const ADMIN_UPDATE_DELETE_USER_API = function(id) {
  return HOST + '/api/admin/user_list/' + id + '/'
}

export const UPDATE_DELETE_USER_API = function(id) {
  return HOST + '/api/user/' + id + '/'
}

export const ADMIN_LIST_CREATE_ACTOR_API = HOST + API + 'admin/actor/'

export const ADMIN_UPDATE_DELETE_ACTOR_API = function(id) {
  return HOST + API + 'admin/actor/' + id + '/'
} 

export const LIST_ACTOR_API = HOST + API + 'actor/'

export const ACTOR_INFO_API = function(slug) {
  return HOST + API + 'actor/' + slug + '/'
} 

export const ADMIN_LIST_CREATE_CATEGORY_API = HOST + API + 'admin/category/'




export const LIST_CATEGORY_API = HOST + API + 'category/'

export const CATEGORY_INFO_API = function(slug) {
  return HOST + API + 'category/' + slug + '/'
} 


export const LIST_FILM_API = HOST + API + 'film/'

export const FILM_INFO_API = function(slug) {
  return HOST + API + 'film/' + slug + '/'
} 

export const ADMIN_LIST_CREATE_FILM_EPISODE_API = function(pk) {
  return HOST + API + 'admin/film/' + pk + '/episode/'
} 

export const ADMIN_UPDATE_DELETE_FILM_EPISODE_API = function(film_pk, pk) {
  return HOST + API + 'admin/film/' + film_pk + '/episode/' + pk + '/'
} 

export const FILM_EPISODE_INFO_API = function(film_slug, film_episode_slug) {
  return HOST + API + 'film/' + film_slug + '/episode/' + film_episode_slug + '/'
} 

export const CREATE_RATE_FILM_API = function(slug) {
  return HOST + API + 'film/' + slug + '/rate/'
} 

export const LIST_COMMENT_FOR_FILM_API = function(slug) {
  return HOST + API + 'film/' + slug + '/comments/'
} 

export const CREATE_COMMENT_FOR_FILM_API = function(slug) {
  return HOST + API + 'film/' + slug + '/comments/create/'
} 

export const UPDATE_DELETE_COMMENT_FOR_FILM_API = function(film_pk, pk) {
  return HOST + API + 'film/' + film_pk + '/comments/' + pk + '/'
} 

export const HISTORY_API = HOST + API + 'history/'

export const DELETE_HISTORY_API = function(slug) {
  return HOST + API + 'history/' + slug + '/'
} 

export const LIST_CREATE_PLAYLIST_API = HOST+API+'playlist/'
export const SEARCH_API = HOST+API+'search/'


export const CREATE_PLAYLIST_EPISODE_API = function(slug) {
  return HOST + API + 'playlist/' + slug + '/create/'
} 

export const UPDATE_DELETE_PLAYLIST_EPISODE_API = function(slug, pk) {
  return HOST + API + 'playlist/' + slug + '/episode/' + pk + '/'
} 

export const RETRIEVE_UPDATE_DELETE_PLAYLIST_API = function(slug) {
  return HOST + API + 'playlist/' + slug + '/'
} 

