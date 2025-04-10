import { Alert } from "react-native";
import { CLOCK_IN, GET_EMPLOYEE_PERSONAL_LOADING_STATE, GET_EMPLOYEE_PERSONAL_DATA, GET_TIMEIN_TIMEOUT, GET_WEEKLY_TIMEIN_TIMEOUT, LOADING_STATE, TAKE_BREAK_LOADING_STATE, TIMEIN_TIMEOUT_LOADING_STATE, WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE } from "../actionsTypes/MainActionsTypes";
import { baseUrl, endPoints, errHandler } from "../../utils/Api_endPoints";
import axios from "axios";

export const ClockInNowAction = (timeValues, setModalVisible) => {
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
            formData.append('notes', timeValues?.clockInNotes);
            
            // return console.log(formData)

            const res = await axios.post(`${baseUrl}${endPoints.timeIn}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });


            if(res.data?.success){
                // dispatch({ type: CLOCK_IN, payload: res.data });
                dispatch({ type: LOADING_STATE, payload: false });
                setModalVisible(true);
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

export const savedDataForClockIn = (timeValues, navTo) => {
    return async (dispatch) => {
            console.log(timeValues)
                dispatch({ type: CLOCK_IN, payload: timeValues });
                if(navTo()){
                    navTo()
                }
    }
}

export const getTimeInAndTimeOutAction = (employeeId) => {
    return async (dispatch) => {
        dispatch({ type: TIMEIN_TIMEOUT_LOADING_STATE, payload: true });
        try {
            const res = await axios.get(`${baseUrl}${endPoints.attendance}/today?employeeId=${employeeId}`);

                dispatch({ type: GET_TIMEIN_TIMEOUT, payload: res.data });
                dispatch({ type: TIMEIN_TIMEOUT_LOADING_STATE, payload: false });
        } catch (error) {
            // errHandler(error);
            dispatch({ type: TIMEIN_TIMEOUT_LOADING_STATE, payload: false });
        }
    }
}

export const getWeeklyTimeInAndTimeOutAction = (employeeId) => {
    return async (dispatch) => {
        dispatch({ type: WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE, payload: true });
        try {
            const res = await axios.get(`${baseUrl}${endPoints.attendance}/weekly?employeeId=${employeeId}`);

                dispatch({ type: GET_WEEKLY_TIMEIN_TIMEOUT, payload: res.data?.data });
                dispatch({ type: WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE, payload: false });
        } catch (error) {
            // errHandler(error);
            dispatch({ type: WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE, payload: false });
        }
    }
}

export const takeABreakAction = (timeValues, setModalVisible) => {
    return async (dispatch) => {
        dispatch({ type: TAKE_BREAK_LOADING_STATE, payload: true });
        try {

            const res = await axios.post(`${baseUrl}${endPoints.takeBreak}`, {
                'id': '',
                'startTime': '',
            });


            if(res.data?.success){
                // dispatch({ type: CLOCK_IN, payload: res.data });
                dispatch({ type: TAKE_BREAK_LOADING_STATE, payload: false });
            }else {
                dispatch({ type: TAKE_BREAK_LOADING_STATE, payload: false });
                Alert.alert(res.data?.msg);
            }
        } catch (error) {
            errHandler(error);
            console.log(error)
            dispatch({ type: TAKE_BREAK_LOADING_STATE, payload: false });
        }
    }
}

export const getEmployeePersonalDataAction = (employeeId) => {
    return async (dispatch) => {
        dispatch({ type: GET_EMPLOYEE_PERSONAL_LOADING_STATE, payload: true });
        try {

            const res = await axios.get(`${baseUrl}${endPoints.employeePersonalData}?employeeId=${employeeId}`);

            if(res.data?.success){
                dispatch({ type: GET_EMPLOYEE_PERSONAL_DATA, payload: res.data?.data });
                dispatch({ type: GET_EMPLOYEE_PERSONAL_LOADING_STATE, payload: false });
            }else {
                dispatch({ type: GET_EMPLOYEE_PERSONAL_LOADING_STATE, payload: false });
                Alert.alert(res.data?.msg);
            }
        } catch (error) {
            console.log(error)
            dispatch({ type: GET_EMPLOYEE_PERSONAL_LOADING_STATE, payload: false });
        }
    }
}