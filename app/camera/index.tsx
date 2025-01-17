import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { useCameraStore } from '@/presentation/store/useCameraStore';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setselectedImage] = useState<string | undefined>()
  const {addSelectedImage} = useCameraStore()

  const cameraRef = useRef<CameraView>(null)



  const onRequestPermissions = async () => {
    try {
      const {status: cameraPermissionStatus} = await requestCameraPermission();
      if(cameraPermissionStatus !== 'granted') {
        Alert.alert("Lo Siento", "No se puede usar la camara sin permisos")
        return
      }
      const {status: mediaLibraryPermissionStatus} = await requestMediaLibraryPermission();
      if(mediaLibraryPermissionStatus !== 'granted') {
        Alert.alert("Lo Siento", "No se puede usar la galeria sin permisos")
        return
      }
    } catch (error) { 
      console.error(error)
      Alert.alert("Error", "No se pudo obtener los permisos necesarios")
    }
  }



  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  const onShutterButtonPress = async () => {
    if(!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({quality: 0.7, base64: true})

    console.log(picture)

    if(!picture?.uri) return

    setselectedImage(picture.uri)

    // TODO: Save picture to gallery
  }

  const onReturnCancel = () => {
    router.dismiss()
  }

  const onPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      aspect: [4, 3],
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });

    if(result.canceled) return
    result.assets.forEach(asset => {
      addSelectedImage(asset.uri)
    })
    router.dismiss()
  }

  const onPictureSAccepted = async() => {
    // TODO: Save picture to gallery
    if(!selectedImage) return
    await MediaLibrary.createAssetAsync(selectedImage)
    addSelectedImage(selectedImage)
    router.dismiss()
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  if(selectedImage){
    return (
        <View style={styles.container}>
          <Image source={{uri: selectedImage}} style={styles.camera}></Image>
          <ConfirmImageButton onPress={onPictureSAccepted}/>
          <RetakeImageButton onPress={() => setselectedImage(undefined)}/>
          <ReturnCancelButton onPress={onReturnCancel}/>
      </View>  
    )
  }


  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{...styles.container, marginHorizontal: 30, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.message}>Necesitamos permiso para usar la camara y la galeria</Text>

        <TouchableOpacity onPress={onRequestPermissions}>
          <ThemedText type='subtitle'>Solicitar Permiso</ThemedText>
        </TouchableOpacity >
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <ShutterButton onPress={onShutterButtonPress} />
          <FlipCameraButton onPress={toggleCameraFacing} />
          <GalleryButton  onPress={onPickImage}/>
          <ReturnCancelButton onPress={onReturnCancel}/>
          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> */}
      </CameraView>
    </View>
  );
}

// custom components

const ShutterButton = ({onPress = () => {}}) => {

  const dimension = useWindowDimensions();
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <TouchableOpacity style={{...styles.shutterButton, position: 'absolute', bottom: 30, left: dimension.width / 2 - 32, borderColor: primaryColor}} onPress={onPress}>
    </TouchableOpacity>
  )
}


const FlipCameraButton = ({onPress = () => {}}) => {
  return (
    <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
      <Ionicons name='camera-reverse-outline' size={30} color='white'/>
    </TouchableOpacity>
  )
}

const GalleryButton = ({onPress = () => {}}) => {
  return (
    <TouchableOpacity style={styles.galleryButton} onPress={onPress}>
      <Ionicons name='images-outline' size={30} color='white'/>
    </TouchableOpacity>
  )
}

const RetakeImageButton = ({onPress = () => {}}) => {
  return (
    <TouchableOpacity style={styles.flipCameraButton} onPress={onPress}>
      <Ionicons name='close-outline' size={30} color='white'/>
    </TouchableOpacity>
  )
}

const ReturnCancelButton = ({onPress = () => {}}) => {
  return (
    <TouchableOpacity style={styles.returnCancelButton} onPress={onPress}>
      <Ionicons name='arrow-back-outline' size={30} color='white'/>
    </TouchableOpacity>
  )
}

const ConfirmImageButton = ({onPress = () => {}}) => {

  const dimension = useWindowDimensions();
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <TouchableOpacity style={{...styles.shutterButton, position: 'absolute', bottom: 30, left: dimension.width / 2 - 32, borderColor: primaryColor}} onPress={onPress}>
      <Ionicons name='checkmark-outline' size={30} color={primaryColor}></Ionicons>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    bottom: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#17202A',
    position: 'absolute',
    top: 40,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});