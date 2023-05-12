import {rest} from 'msw'
import * as url from './../helpers/url_helper'
import AllEwaybills from './../mocks/AllEwaybills.json'
import ArchivedEwaybills from './../mocks/ArchivedEwaybills.json'
import LoginUser from './../mocks/LoginUser.json'

export const handlers = [
    rest.get(process.env.VUE_APP_API_URL + url.GET_ALL_EWAYBILLS, (req, res, ctx) => {
        return res(
            ctx.json(AllEwaybills),
        )    
    }),
    rest.get(process.env.VUE_APP_API_URL + url.GET_ARCHIVED_EWAYBILLS, (req, res, ctx) => {
        return res(
            ctx.json(ArchivedEwaybills),
        )    
    }),
    rest.post(process.env.VUE_APP_API_URL + url.POST_LOGIN, (req, res, ctx) => {
        return res(
            ctx.json(LoginUser),
        )    
    }),
]