import axios from 'axios';
import { baseUrl, endPoints, errHandler } from '../../utils/Api_endPoints';
import { AUTH_DATA, EMAIL_VERIFY_LOADING_STATE, FORGOT_PASSWORD_LOADING_STATE, LOADING_STATE, NEW_PASSWORD_LOADING_STATE, RESEND_EMAIL_VERIFY_LOADING_STATE, WORK_PROFILE_LOADING_STATE } from '../actionsTypes/AuthActionsTypes';
import { Alert } from 'react-native';
import { GET_WEEKLY_TIMEIN_TIMEOUT, IS_UPDATED_EMPLOYEE_PERSONAL_DATA } from '../actionsTypes/MainActionsTypes';
import { getEmployeePersonalDataAction } from './MainActions';

export const handleSignUpAction = (formValues, navigation) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.signUp}`, {
                'email': formValues.email,
                'password': formValues?.password,
                'phNumber': formValues?.phoneNumber,
                'companyId': formValues?.companyId,
            });

            if(res.data?.success){
                dispatch({ type: LOADING_STATE, payload: false });
                navigation.navigate('EnterOtp', {accessToken: res?.data?.accessToken, email: formValues.email});
            }else {
                dispatch({ type: LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
            }
            
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};

export const handleSignInAction = (formValues, navigation, setVisible, setFormValues) => {
    return async (dispatch) => {
        dispatch({ type: LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.signIn}`, {
                'email': formValues?.email,
                'password': formValues?.password,
            });

            if(res.data?.success){
                if(res.data?.data?.isVerified){
                    dispatch({ type: AUTH_DATA, payload: res.data });
                    dispatch({ type: LOADING_STATE, payload: false });
                    Alert.alert(res.data?.message);
                    setVisible(false);
                    setFormValues({
                        email: '',
                        password: '',
                    });
                    dispatch(getEmployeePersonalDataAction(res?.data?.data?._id))
                    navigation.navigate('Main');
                }else{
                    dispatch({ type: AUTH_DATA, payload: res.data });
                    dispatch({ type: LOADING_STATE, payload: false });
                    setVisible(false);
                    setFormValues({
                        email: '',
                        password: '',
                    });
                    navigation.navigate('WorkProfile');
                }
            }else {
                dispatch({ type: LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
            }
            
        } catch (error) {
            errHandler(error);
            dispatch({ type: LOADING_STATE, payload: false });
        }
    };
};

export const emailVerificationAction = (formValues, navigation, setVisible) => {
    return async (dispatch) => {
        dispatch({ type: EMAIL_VERIFY_LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.emailVerification}`, {
                'email': formValues?.email,
                'Otp': formValues?.otp,
                'addEmployeeToken': formValues?.token,
            });

            if(res.data?.success){
                dispatch({ type: EMAIL_VERIFY_LOADING_STATE, payload: false });
                navigation.navigate('Login');
                Alert.alert(res.data?.message);
                setVisible(false);
            }else {
                dispatch({ type: EMAIL_VERIFY_LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
            }
        } catch (error) {
            errHandler(error);
            dispatch({ type: EMAIL_VERIFY_LOADING_STATE, payload: false });
        }
    };
};

export const resendOTPAction = (formValues, isNavToEnterOtp,navigation) => {
    return async (dispatch) => {
        dispatch({ type: RESEND_EMAIL_VERIFY_LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.resendOTPForEmailVerification}`, {
                'email': formValues?.email,
            });

            if(res.data?.success){
                dispatch({ type: RESEND_EMAIL_VERIFY_LOADING_STATE, payload: false });
                if(isNavToEnterOtp){
                    navigation.navigate("EnterOtp", {email: formValues?.email})
                }
            }else {
                dispatch({ type: RESEND_EMAIL_VERIFY_LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
            }
        } catch (error) {
            errHandler(error);
            dispatch({ type: RESEND_EMAIL_VERIFY_LOADING_STATE, payload: false });
        }
    };
};

export const workProfileAction = (formValues, navigation, noNav) => {
    return async (dispatch) => {
        dispatch({ type: WORK_PROFILE_LOADING_STATE, payload: true });
        try {
            dispatch({ type: IS_UPDATED_EMPLOYEE_PERSONAL_DATA, payload: false });

            const formData = new FormData();
            formData.append('employeeId', formValues.id)
            if(formValues.image?.uri){
                formData.append('profileImage', formValues.image)
            }
            formData.append('firstName', formValues.firstName)
            formData.append('lastName', formValues.lastName)
            formData.append('DOB', formValues.dateOfBirth)
            formData.append('designation', formValues.position)
            formData.append('country', formValues.country)
            formData.append('state', formValues.state)
            formData.append('city', formValues.city)
            formData.append('fullAddress', formValues.fullAddress)

            const res = await axios.post(`${baseUrl}${endPoints.workProfile}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if(res.data?.success){
                dispatch({ type: WORK_PROFILE_LOADING_STATE, payload: false });
                dispatch({ type: IS_UPDATED_EMPLOYEE_PERSONAL_DATA, payload: true });
                if(!noNav){
                    dispatch(getEmployeePersonalDataAction(res?.data?.data?._id))
                    navigation.navigate("Main")
                }
            }else {
                dispatch({ type: WORK_PROFILE_LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
            }
        } catch (error) {
            errHandler(error);
            console.log(error)
            dispatch({ type: WORK_PROFILE_LOADING_STATE, payload: false });
        }
    };
};

export const LogoutAction = (navigation) => {
    return async (dispatch) => {
        dispatch({ type: AUTH_DATA, payload: null });
        dispatch({ type: GET_WEEKLY_TIMEIN_TIMEOUT, payload: null });
        navigation.navigate("Auth");
    }
}

export const isUpdatedFalseAction = () => {
    return async (dispatch) => {
        dispatch({ type: IS_UPDATED_EMPLOYEE_PERSONAL_DATA, payload: false });
    }
}

export const forgotPasswordAction = (formValues, navigation, setVisible) => {
    return async (dispatch) => {
        dispatch({ type: FORGOT_PASSWORD_LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.forgotPassword}`, {
                'email': formValues?.email,
                'Otp': formValues?.otp,
            });

            if(res.data?.success){
                dispatch({ type: FORGOT_PASSWORD_LOADING_STATE, payload: false });
                navigation.navigate('EnterNewPassword', {email: formValues?.email});
                setVisible(false);
            }else {
                dispatch({ type: FORGOT_PASSWORD_LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
            }
        } catch (error) {
            errHandler(error);
            dispatch({ type: FORGOT_PASSWORD_LOADING_STATE, payload: false });
        }
    };
};

export const resetPasswordAction = (formValues, navigation, setVisible) => {
    return async (dispatch) => {
        dispatch({ type: NEW_PASSWORD_LOADING_STATE, payload: true });
        try {
            console.log(formValues)
            const res = await axios.post(`${baseUrl}${endPoints.resetPassword}`, {
                'email': formValues?.email,
                'newPassword': formValues?.password,
            });

            if(res.data?.success){
                dispatch({ type: NEW_PASSWORD_LOADING_STATE, payload: false });
                navigation.navigate('PasswordCreated');
                setVisible(false);
            }else {
                dispatch({ type: NEW_PASSWORD_LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
            }
        } catch (error) {
            errHandler(error);
            console.log(error)
            dispatch({ type: NEW_PASSWORD_LOADING_STATE, payload: false });
        }
    };
};