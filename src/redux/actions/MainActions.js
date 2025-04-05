import { Alert } from "react-native";
import { LOADING_STATE } from "../actionsTypes/MainActionsTypes";
import { baseUrl, endPoints, errHandler } from "../../utils/Api_endPoints";
import axios from "axios";

export const ClockInNowAction = (timeValues, navigation) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.timeIn}`, {
                'employeeId': timeValues?.id,
                'date': timeValues?.date,
                'timeIn': timeValues?.timeIn,
            });

            if(res.data?.success){
                // dispatch({ type: AUTH_DATA, payload: res.data });
                dispatch({ type: LOADING_STATE, payload: false });
                navigation.navigate('Attendant');
            }else {
                dispatch({ type: LOADING_STATE, payload: false });
                Alert.alert(res.data?.msg);
            }
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    }
}