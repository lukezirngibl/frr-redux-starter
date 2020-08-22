import { configureTypeReduxApiCreator } from 'frr-redux/lib/frr/api.helpers'
import { PostRequest, GetRequest, RestMethod } from 'frr-redux/lib/frr/api.types'

export enum Endpoints {
  Login = '/login',
  Logout = '/logout',
}

export type API = {
  [Endpoints.Logout]: GetRequest<{
    response: {}
  }>
  [Endpoints.Login]: PostRequest<{
    json: { username: string; password: string }
    response: {
      score: number
    }
  }>
}

export const mapEndpointToMethod: {
  [k in Endpoints]: API[k]['method']
} = {
  [Endpoints.Logout]: RestMethod.GET,
  [Endpoints.Login]: RestMethod.POST,
}

const { createEndpoint } = configureTypeReduxApiCreator<
  API,
  Endpoints,
  typeof mapEndpointToMethod
>(mapEndpointToMethod)

export { createEndpoint }
