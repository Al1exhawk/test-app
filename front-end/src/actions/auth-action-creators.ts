import axios, {AxiosResponse} from "axios";
import { ActionTemplate, LoginPayload } from "../constants/types";
import { LOG_IN, LOG_OUT, AUTH_ERROR } from "../constants/action-types";
import { Dispatch } from "redux";
import { AuthState } from '../constants/types'




export const logIn = (loginPayload: LoginPayload) =>
 async (dispatch: Dispatch<ActionTemplate>) => {
  let serverResponse;
  try {
    serverResponse = await axios.post<LoginPayload, AxiosResponse<AuthState>>("http://localhost:8080/login", loginPayload);
  } catch(e){
    return dispatch({
        type: AUTH_ERROR,
        payload: 'Ivalid password or userName'
    })
  }
    console.log('serverResponse', serverResponse)
    const data = serverResponse.data;
     return dispatch({
          type: LOG_IN,
          payload: data
     })
};
export const logout = () => (dispatch: Dispatch<ActionTemplate>) => {
  dispatch({
    type: LOG_OUT
  });
};
