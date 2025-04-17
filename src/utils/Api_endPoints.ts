import { Message } from './Alert';

// export const baseUrl = 'https://l9zx2vrf-5020.inc1.devtunnels.ms';
export const baseUrl = 'https://appsdemo.pro/NeriConstructionBackend';
// export const baseUrl = 'http://localhost:3000/api/';

export const endPoints = {
    signUp: '/api/employee/signup',
    signIn: '/api/employee/login',
    timeIn: '/api/attendance/timeIn',
    timeOut: '/api/attendance/timeOut',
    attendance: '/api/attendance',
    changeStatus: '/api/task/updateTaskStatus',
    allAttendaceByTaskId: '/api/attendance/getAllAttendenceByTaskId',
    todayAttendance: '/api/attendance',
    emailVerification: '/api/otp/verifyOtp',
    resendOTPForEmailVerification: '/api/otp/resendOtp',
    takeBreak: '/api/attendance/break',
    workProfile: '/api/employee/editEmployee',
    employeePersonalData: '/api/employee/getEmployee',
    allTask: '/api/task/getAllTaskByEmployee',
    singleTask: '/api/task/getTask',
    forgotPassword: '/api/otp/verify',
    resetPassword: '/api/employee/resetPassword',
    addComments: '/api/task/addComments',
    daylyAgenda: '/api/task/getTodayTask',
    weeklyAgenda: '/api/task/getWeeklyTask',
    monthlyAgenda: '/api/task/getMonthlyTask',
    yearlyAgenda: '/api/task/getYearlyTask',
    attendanceTotal: '/api/attendance/getAttendanceByAttendanceId',
    downloadPDF: '/api/attendance/pdf',
};

export const errHandler = async (err: any,) => {
    const status = err?.response?.status;
    if (status === 417 || status === 500 || status === 406 || status === 502 || status === 401 || status === 403) {
        Message(
            err.response.data?.title,
            err.response.data?.data?.error ? (typeof (err.response.data?.data?.error) === 'string' ? err.response.data?.data?.error : err.response.data?.data?.error[0]) : err.response.data?.message
        );
    } else
        if (status === 404) // NOT FOUND
        {
            const calledAPI = err?.response?.config?.url;
            Message(
                'Unknown API Called',
                'Please make sure that the API (' + calledAPI + ") you're calling is already exists!",
            );
        }else {
            Message(
                err?.message
            );
        }
    // else
    //     if (status === 511) // MALFORMED TOKEN
    //     {
    //         Toast.show('Your session has been ended!!', Toast.SHORT);
    //         RNRestart.restart();
    //     } else {
    //         if (callBack) {
    //             callBack();
    //             Toast.show('Detecting Slow Internet, Retrying...', Toast.SHORT);
    //         } else {
    //             Toast.show('Detecting Slow Internet...', Toast.SHORT);
    //         }
    //     }
};
