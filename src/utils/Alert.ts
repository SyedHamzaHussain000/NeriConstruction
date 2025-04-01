import { Alert } from "react-native";

export const Message = (title?: any, message?: any, buttons?: any) => {
    return Alert.alert(title, message, buttons);
}