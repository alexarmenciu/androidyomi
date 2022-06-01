/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Button,
} from 'react-native';
import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognitionModule from './components/TextRecognitionModule';
import Tokenizer from 'react-native-japanese-tokenizer';
import GetLinkedText from './components/LinkedTextGenerator';
import TranslationModule from './components/TranslationModule';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [text, setText] = useState('');
  const [words, setWords] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [transsent, setTranssent] = useState(null);

  const backgroundStyle = {
    backgroundColor: Colors.black,
  };

  const getTextFromCamera = async (options = {
    cropping: false,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    useFrontCamera: false,
  }) => {
    try {
      // get the image from imagepicker
      image = await ImagePicker.openCamera(options);

      // get text from the image
      txt = await TextRecognitionModule.getText(image.path);

      // load text into  state
      setText(txt);

      getSentenceMeaning(txt);

      // segment the text into words
      segmentText(txt);
    }
    catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  }

  const segmentText = async (text) => {
    console.log(text);
    // segment text into words
    const tokens = await Tokenizer.tokenize(text)

    // store words into a var
    setWords(tokens);
  }

  const getMeaning = async (word) => {
    console.log(word);
    var translation = await TranslationModule.getTranslation(word);

    setTranslation(translation);
  }

  const getSentenceMeaning = async (sentence) => {
    var sentenceTranslation = await TranslationModule.getTranslation(sentence);
    setTranssent(sentenceTranslation);
  }

  return (
    <SafeAreaView style={backgroundStyle}>

      <StatusBar barStyle={'dark-content'} />

      <ScrollView style={backgroundStyle}
        height={Dimensions.get("window").height * .7}>

        <View
          style={{
            backgroundColor: Colors.black,
          }}>

          <Text style={{ fontSize: 50 }}>
            日本語アプリ
          </Text>

          <Button
            title="Use Camera"
            onPress={() => { getTextFromCamera() }}>
          </Button>

        </View>

        <Text style={{ color: 'white', fontSize: 20 }}>{text}</Text>

        {words && <GetLinkedText wordlist={words} func={getMeaning} />}
      </ScrollView>

      <View
        style={{
          height: Dimensions.get("window").height * .3,
          backgroundColor: "white"
        }}>
        <Text style={{ color: 'black', fontSize: 20 }}>
          {translation}
        </Text>

        <Text style={{ color: 'black', fontSize: 20 }}>
          {transsent}
        </Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
