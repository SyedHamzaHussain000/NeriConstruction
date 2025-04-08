import { Alert } from "react-native";
import { CLOCK_IN, GET_TIMEIN_TIMEOUT, LOADING_STATE, TIMEIN_TIMEOUT_LOADING_STATE } from "../actionsTypes/MainActionsTypes";
import { baseUrl, endPoints, errHandler } from "../../utils/Api_endPoints";
import axios from "axios";

export const ClockInNowAction = (timeValues, navigation) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const formData = new FormData();
            formData.append('employeeId', timeValues?.id);
            formData.append('date', timeValues?.date);
            formData.append('timeIn', timeValues?.timeIn);
            formData.append('image', timeValues?.image);
            formData.append('longitude', '24.8607');
            formData.append('latitude', '67.0011');

            const res = await axios.post(`${baseUrl}${endPoints.timeIn}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });

            if(res.data?.success){
                console.log(res)
                dispatch({ type: CLOCK_IN, payload: res.data });
                dispatch({ type: LOADING_STATE, payload: false });
                navigation.navigate('SelfieToClockIn');
            }else {
                dispatch({ type: LOADING_STATE, payload: false });
                Alert.alert(res.data?.msg);
            }
        } catch (error) {
            errHandler(error);
            console.log(error)
            dispatch({ type: LOADING_STATE, payload: false });
        }
    }
}

export const getTimeInAndTimeOutAction = (employeeId) => {
    return async (dispatch) => {
        dispatch({ type: TIMEIN_TIMEOUT_LOADING_STATE, payload: true });
        try {
            const res = await axios.get(`${baseUrl}${endPoints.attendance}/today?employeeId=${employeeId}`);

                dispatch({ type: GET_TIMEIN_TIMEOUT, payload: res.data });
                // dispatch({ type: TIMEIN_TIMEOUT_LOADING_STATE, payload: false });
        } catch (error) {
            console.log(error)
            errHandler(error);
            dispatch({ type: TIMEIN_TIMEOUT_LOADING_STATE, payload: false });
        }
    }
}