import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
export const selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            aspect: 1,
            allowsEditing: true,
        });
        if (!cancelled) {
            return uri
        }
        return ""


    };

export const takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
        });
     if (!cancelled) {
         return uri
     }
     return "";
    };
