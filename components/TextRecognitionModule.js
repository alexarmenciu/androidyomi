import { NativeModules } from 'react-native';

/**
 * imports text recognition module, whose function getText takes as input a uri of an image
 * and returns the Japanese text in the image
 */

const { TextRecognitionModule } = NativeModules;
export default TextRecognitionModule;