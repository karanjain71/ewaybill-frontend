import * as url from './url_helper'
// import axiosApi from "./api_helper"
// import store from '@/store'
import axiosApi from './api_helper'
import store from './../store/index'

export const postLogin = async (email, password) => {
  const payload = {
    "email": email,
    "password": password
  }
  console.log(payload, url.POST_LOGIN, " payload")
  return axiosApi.post(url.POST_LOGIN, payload, {addToken: false})
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      store.dispatch('notifications/setNotificationsList', {text: 'LoggedIn successfully',color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Error while login, please check credentials',color: 'red'})
    console.log(err)
  })
}

export const postRegister = async (payload) => {

  return axiosApi.post(url.POST_REGISTER, payload,{addToken: false})
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      store.dispatch('notifications/setNotificationsList', {text: 'User registered successfully',color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Error while registering user. Please retry',color: 'red'})
    console.log(err)
  })
}

export const postForgotPassword = async (payload) => {

  return axiosApi.post(url.POST_FORGOT_PASSWORD, payload, {addToken: false})
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    console.log(err)
  })
}

export const postCreateEwaybill = async (payload) => {

  return axiosApi.post(url.POST_CREATE_EWAYBILL, payload, {addToken: false})
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      store.dispatch('notifications/setNotificationsList', {text: 'Ewaybill Added Successfully',color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Error while adding ewaybill. Please retry',color: 'red'})
    console.log(err)
  })
}


export const postCreateEwaybillPdf = async (payload) => {
  console.log(payload, "coming ehre with paylaod")
  return axiosApi.post(url.POST_CREATE_EWAYBILL_PDF, {
    "file": payload
  },{headers: {
    "Content-Type": "multipart/form-data"
}, addToken: true})
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      store.dispatch('notifications/setNotificationsList', {text: 'Ewaybill Added Successfully',color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Error while uploading ewaybill. Please retry',color: 'red'})
    console.log(err)
  })
}

export const getAllEwaybills = async () => {

  return axiosApi.get(url.GET_ALL_EWAYBILLS, {addToken: true})
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Error while fetching ewaybills',color: 'red'})
    console.log(err)
  })
}


export const getArchivedEwaybills = async () => {

  return axiosApi.get(url.GET_ARCHIVED_EWAYBILLS, {addToken: true})
  .then(response => {
    if (response.status >= 200 || response.status <= 299) {
      return response.data
    }
    throw response.data
  })
  .catch(err=> {
    store.dispatch('notifications/setNotificationsList', {text: 'Error while fetching ewaybills',color: 'red'})
    console.log(err)
  })
}

export const updateEwaybill = async (payload) => {
  console.log(JSON.stringify(payload) + " is coming here")
  return axiosApi.put(url.UPDATE_EWAYBILL + `/${payload.id}`, payload, {addToken: true})
  .then(response => {
    console.log(response + " is the respone")
    if(response.status>=200 && response.status<=299){
      store.dispatch('notifications/setNotificationsList', {text: 'Ewaybill Updated Successfully',color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err => {
    store.dispatch('notifications/setNotificationsList', {text: 'Error in updating ewaybill. Please retry',color: 'red'})
    console.log(err)
  })
}


export const deleteEwaybillItem = async (id) => {

  return axiosApi.delete(url.DELETE_EWAYBILL + `/${id}`, {addToken: true})
  .then(response => {
    console.log(JSON.stringify(response) + "printing here")
    console.log(response.status + "printing here 2")
    if(response.status>=200 && response.status<=299){
      console.log(response.status + " here ")
      store.dispatch('notifications/setNotificationsList', {text: 'Ewaybill Deleted Successfully',color: 'green'})
      return response.data
    }
    throw response.data
  })
  .catch(err => {
    store.dispatch('notifications/setNotificationsList', {text: 'Unable to delete ewaybill',color: 'red'})
    console.log(err)
  })
}


export const getUserDetails = async () => {

  return axiosApi.get(url.GET_USER, {addToken: true})
  .then(response => {
    console.log(JSON.stringify(response) + "printing here")
    console.log(response.status + "printing here 2")
    if(response.status>=200 && response.status<=299){
      console.log(response.status + " here ")
      return response.data
    }
    throw response.data
  })
  .catch(err => {
    store.dispatch('notifications/setNotificationsList', {text: 'Unable to fetch user profile',color: 'red'})
    console.log(err)
  })
}
export const updateUserDetails = async (payload) => {

  return axiosApi.put(url.UPDATE_USER, payload, {addToken: true})
  .then(response => {
    console.log(JSON.stringify(response) + "printing here")
    console.log(response.status + "printing here 2")
    if(response.status>=200 && response.status<=299){
      console.log(response.status + " here ")
      return response.data
    }
    throw response.data
  })
  .catch(err => {
    store.dispatch('notifications/setNotificationsList', {text: 'Unable to update user profile',color: 'red'})
    console.log(err)
  })
}
