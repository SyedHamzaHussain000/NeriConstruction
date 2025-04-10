import axios from 'axios';
import { baseUrl, endPoints, errHandler } from '../../utils/Api_endPoints';
import { AUTH_DATA, EMAIL_VERIFY_LOADING_STATE, LOADING_STATE, RESEND_EMAIL_VERIFY_LOADING_STATE, WORK_PROFILE_LOADING_STATE } from '../actionsTypes/AuthActionsTypes';
import { Alert } from 'react-native';

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
                Alert.alert(res.data?.msg);
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
                dispatch({ type: AUTH_DATA, payload: res.data });
                dispatch({ type: LOADING_STATE, payload: false });
                navigation.navigate('WorkProfile');
                Alert.alert(res.data?.msg);
                setVisible(false);
                setFormValues({
                    email: '',
                    password: '',
                });
            }else {
                dispatch({ type: LOADING_STATE, payload: false });
                Alert.alert(res.data?.msg);
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

export const resendOTPAction = (formValues) => {
    return async (dispatch) => {
        dispatch({ type: RESEND_EMAIL_VERIFY_LOADING_STATE, payload: true });
        try {
            const res = await axios.post(`${baseUrl}${endPoints.resendOTPForEmailVerification}`, {
                'email': formValues?.email,
            });

            if(res.data?.success){
                dispatch({ type: RESEND_EMAIL_VERIFY_LOADING_STATE, payload: false });
                Alert.alert(res.data?.message);
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

export const workProfileAction = (formValues, navigation) => {
    return async (dispatch) => {
        dispatch({ type: WORK_PROFILE_LOADING_STATE, payload: true });
        try {

            const formData = new FormData();
            formData.append('employeeId', formValues.id)
            formData.append('profileImage', formValues.image)
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
                Alert.alert(res.data?.message);
                navigation.navigate("Main")
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
        navigation.navigate("Auth");
    }
}