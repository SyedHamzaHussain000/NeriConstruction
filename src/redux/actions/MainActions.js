import { Alert } from "react-native";
import { CLOCK_IN, GET_EMPLOYEE_PERSONAL_LOADING_STATE, GET_EMPLOYEE_PERSONAL_DATA, GET_TIMEIN_TIMEOUT, GET_WEEKLY_TIMEIN_TIMEOUT, LOADING_STATE, TAKE_BREAK_LOADING_STATE, TIMEIN_TIMEOUT_LOADING_STATE, WEEKLY_TIMEIN_TIMEOUT_LOADING_STATE, GET_ALL_TASK, GET_ALL_TASK_LOADING_STATE, GET_SINGLE_TASK, GET_SINGLE_TASK_LOADING_STATE, GET_WEEKLY_AGENDA_LOADING_STATE, GET_WEEKLY_AGENDA_DATA, GET_MONTHLY_AGENDA_LOADING_STATE, GET_MONTHLY_AGENDA_DATA, GET_YEARLY_AGENDA_LOADING_STATE, GET_YEARLY_AGENDA_DATA, GET_DAYLY_AGENDA_LOADING_STATE, GET_DAYLY_AGENDA_DATA, CLOCK_OUT_LOADING_STATE, CLOCK_OUT_DATA, SAVING_LANGUAGE } from "../actionsTypes/MainActionsTypes";
import { baseUrl, endPoints, errHandler } from "../../utils/Api_endPoints";
import axios from "axios";

export const ClockInNowAction = (timeValues, setModalVisible) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        console.log(timeValues)
        try {
            const formData = new FormData();
            formData.append('employeeId', timeValues?.id);
            formData.append('taskId', timeValues?.taskId);
            formData.append('date', timeValues?.date);
            formData.append('timeIn', timeValues?.timeIn);
            formData.append('image', timeValues?.image);
            formData.append('longitude', timeValues.long);
            formData.append('latitude', timeValues.lat);
            formData.append('notes', timeValues?.clockInNotes);
            formData.append('locationName', timeValues?.locationName);

            const res = await axios.post(`${baseUrl}${endPoints.timeIn}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });

            console.log(res.data)

            if(res.data?.success){
                // dispatch({ type: CLOCK_IN, payload: res.data });
                dispatch({ type: LOADING_STATE, payload: false });
                setModalVisible(true);
            }else {
                dispatch({ type: LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
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
            const res = await axios.get(`${baseUrl}${endPoints.todayAttendance}/today?employeeId=${employeeId}`);

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

export const takeABreakAction = (id, navigation) => {
    return async (dispatch) => {
        dispatch({ type: TAKE_BREAK_LOADING_STATE, payload: true });
        try {

            console.log(id)
            const now = new Date();
            const getFormattedTime = (date) => {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
            };

            const startTime = getFormattedTime(now);

            const res = await axios.post(`${baseUrl}${endPoints.takeBreak}`, {
                'id': id,
                'startTime': startTime,
            });

            if(res.data?.success){
                // dispatch({ type: CLOCK_IN, payload: res.data });
                dispatch({ type: TAKE_BREAK_LOADING_STATE, payload: false });
                navigation.navigate('SelfieToClockIn')
                Alert.alert('Set to break succcessfully');
            }else {
                dispatch({ type: TAKE_BREAK_LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
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

export const clockOutAction = (id, setIsConfirmationModalVisible, setIsSuccessModalVisible) => {
    return async (dispatch) => {
        dispatch({ type: CLOCK_OUT_LOADING_STATE, payload: true });
        try {

            const date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
           
            const timeOut =  `"${hours}:${minutes} ${ampm}"`;

            const res = await axios.post(`${baseUrl}${endPoints.timeOut}`, {
                'attendanceId': id,
                'timeOut': timeOut,
                'shiftHours': '00:00',
                'overTime': '00:00',
            });

            if(res.data?.success){
                dispatch({ type: CLOCK_OUT_DATA, payload: res.data?.data });
                dispatch({ type: CLOCK_OUT_LOADING_STATE, payload: false });
                setIsConfirmationModalVisible(false);
        setIsSuccessModalVisible(true);
            }else {
                dispatch({ type: CLOCK_OUT_LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
                setIsConfirmationModalVisible(false);
        setIsSuccessModalVisible(true);
            }
        } catch (error) {
            errHandler(error);
            console.log(error)
            dispatch({ type: CLOCK_OUT_LOADING_STATE, payload: false });
        }
    }
}

export const savingLanguageAction = (language) => {
    return async (dispatch) => {
    dispatch({type: SAVING_LANGUAGE, payload: language});
}};