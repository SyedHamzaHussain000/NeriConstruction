import { Alert } from "react-native";
import { CLOCK_IN, GET_EMPLOYEE_PERSONAL_LOADING_STATE, GET_EMPLOYEE_PERSONAL_DATA, GET_TIMEIN_TIMEOUT, GET_WEEKLY_TIMEIN_TIMEOUT, LOADING_STATE, TAKE_BREAK_LOADING_STATE, TIMEIN_TIMEOUT_LOADING_STATE, WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE, GET_ALL_TASK, GET_ALL_TASK_LOADING_STATE, GET_SINGLE_TASK, GET_SINGLE_TASK_LOADING_STATE, GET_WEEKLY_AGENDA_LOADING_STATE, GET_WEEKLY_AGENDA_DATA, GET_MONTHLY_AGENDA_LOADING_STATE, GET_MONTHLY_AGENDA_DATA, GET_YEARLY_AGENDA_LOADING_STATE, GET_YEARLY_AGENDA_DATA, GET_DAYLY_AGENDA_LOADING_STATE, GET_DAYLY_AGENDA_DATA } from "../actionsTypes/MainActionsTypes";
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
            formData.append('longitude', timeValues.lat);
            formData.append('latitude', timeValues.long);
            formData.append('notes', timeValues?.clockInNotes);

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
            const res = await axios.get(`${baseUrl}${endPoints.attendance}?employeeId=${employeeId}`);

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

                dispatch({ type: GET_EMPLOYEE_PERSONAL_DATA, payload: res.data?.data });
                dispatch({ type: GET_EMPLOYEE_PERSONAL_LOADING_STATE, payload: false });
        } catch (error) {
            console.log(error)
            dispatch({ type: GET_EMPLOYEE_PERSONAL_LOADING_STATE, payload: false });
        }
    }
}

export const getAllTasksByEmployeeAction = (employeeId) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_TASK_LOADING_STATE, payload: true });
        try {

            const res = await axios.get(`${baseUrl}${endPoints.allTask}?employeeId=${employeeId}`);

                dispatch({ type: GET_ALL_TASK, payload: res.data?.data });
                dispatch({ type: GET_ALL_TASK_LOADING_STATE, payload: false });
        } catch (error) {
            console.log(error)
            dispatch({ type: GET_ALL_TASK_LOADING_STATE, payload: false });
        }
    }
}

export const getSingleTaskAction = (taskId, navigation) => {
    return async (dispatch) => {
        dispatch({ type: GET_SINGLE_TASK_LOADING_STATE, payload: true });
        try {

            const res = await axios.get(`${baseUrl}${endPoints.singleTask}?id=${taskId}`);

                dispatch({ type: GET_SINGLE_TASK, payload: res.data?.data });
                dispatch({ type: GET_SINGLE_TASK_LOADING_STATE, payload: false });
                navigation.navigate('TaskMenuDetails')
        } catch (error) {
            console.log(error)
            dispatch({ type: GET_SINGLE_TASK_LOADING_STATE, payload: false });
        }
    }
}

export const getDaylyAgendaAction = (employeeId) => {
    return async (dispatch) => {
        dispatch({ type: GET_DAYLY_AGENDA_LOADING_STATE, payload: true });
        try {

            const res = await axios.get(`${baseUrl}${endPoints.daylyAgenda}?employeeId=${employeeId}`);

                dispatch({ type: GET_DAYLY_AGENDA_DATA, payload: res.data?.data });
                dispatch({ type: GET_DAYLY_AGENDA_LOADING_STATE, payload: false });
        } catch (error) {
            console.log(error)
            dispatch({ type: GET_DAYLY_AGENDA_LOADING_STATE, payload: false });
        }
    }
}

export const getWeeklyAgendaAction = (employeeId) => {
    return async (dispatch) => {
        dispatch({ type: GET_WEEKLY_AGENDA_LOADING_STATE, payload: true });
        try {

            const res = await axios.get(`${baseUrl}${endPoints.weeklyAgenda}?employeeId=${employeeId}`);

                dispatch({ type: GET_WEEKLY_AGENDA_DATA, payload: res.data?.data });
                dispatch({ type: GET_WEEKLY_AGENDA_LOADING_STATE, payload: false });
        } catch (error) {
            console.log(error)
            dispatch({ type: GET_WEEKLY_AGENDA_LOADING_STATE, payload: false });
        }
    }
}

export const getMonthlyAgendaAction = (employeeId, month, year, day) => {
    return async (dispatch) => {
        dispatch({ type: GET_MONTHLY_AGENDA_LOADING_STATE, payload: true });
        try {

            const res = await axios.get(`${baseUrl}${endPoints.monthlyAgenda}?employeeId=${employeeId}&year=${year}&month=${month}&day=${day}`);

                dispatch({ type: GET_MONTHLY_AGENDA_DATA, payload: res.data?.data });
                dispatch({ type: GET_MONTHLY_AGENDA_LOADING_STATE, payload: false });
        } catch (error) {
            console.log(error)
            dispatch({ type: GET_MONTHLY_AGENDA_LOADING_STATE, payload: false });
        }
    }
}

export const getYearlyAgendaAction = (employeeId, year) => {
    return async (dispatch) => {
        dispatch({ type: GET_YEARLY_AGENDA_LOADING_STATE, payload: true });
        try {

            const res = await axios.get(`${baseUrl}${endPoints.yearlyAgenda}?employeeId=${employeeId}&year=${year}`);

                dispatch({ type: GET_YEARLY_AGENDA_DATA, payload: res.data?.data });
                dispatch({ type: GET_YEARLY_AGENDA_LOADING_STATE, payload: false });
        } catch (error) {
            console.log(error)
            dispatch({ type: GET_YEARLY_AGENDA_LOADING_STATE, payload: false });
        }
    }
}

let timerId = null; // scoped outside so it's shared between actions

export const startTimerAction = () => {
  return (dispatch) => {
    let seconds = 0;

    dispatch({ type: 'TIMER_RESET' });

    timerId = setInterval(() => {
      seconds += 1;
      dispatch({ type: 'TIMER_TICK', payload: seconds });
    }, 1000);
  };
};

export const stopTimerAction = () => {
  return (dispatch) => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      dispatch({ type: 'TIMER_STOP' });
    }
  };
};
