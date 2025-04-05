import axios from 'axios';
import { baseUrl, endPoints, errHandler } from '../../utils/Api_endPoints';
import { AUTH_DATA, LOADING_STATE } from '../actionsTypes/AuthActionsTypes';
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
                navigation.navigate('Login');
                Alert.alert(res.data?.msg);
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
                navigation.navigate('Main');
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

export const LogoutAction = (navigation) => {
    return async (dispatch) => {
        dispatch({ type: AUTH_DATA, payload: null });
        navigation.navigate("Auth");
    }
}