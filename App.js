import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Button,
  TextInput,
  ImageBackground,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

export default function App(){
  const [inputTransPlaceholder, setInputTransPlaceholder] = useState('한국어를 입력해주세요.');
  const [inputTargetPlaceholder, setInputTargetPlaceholder] = useState('영어를 입력해주세요.');
  const [inputTrans, setInputTrans] = useState('');
  const [inputTarget, setInputTarget] = useState('');
  const [isKorean, setIsKorean] = useState(true);

  const TransStart = async () => {
    try{
      transLan = "";
      targetLan = "";
      target = inputTrans

      if(isKorean){
        transLan = "ko"
        targetLan = "en"
      }
      else{
        transLan = "en"
        targetLan = "ko"
      }

      const result = await axios.post(
        'https://openapi.naver.com/v1/papago/n2mt',
        {
          source: transLan,
          target: targetLan,
          text: target
        },
        {
          headers: {
            'X-Naver-Client-Id' : '_K0QgxDgUqSocDnTL7zt',
            'X-Naver-Client-Secret': 'DVQgskweQL',
          },
        })

        setInputTarget(result.data.message.result.translatedText)
    } catch(error){
      console.error(error.response)
    }
  };

  return(
    <View style={{flex: 1}}>
        <TextInput
          onChangeText={(text) => setInputTrans(text)}
          placeholder={inputTransPlaceholder}
          style={{backgroundColor: 'green', flex: 1}}
        ></TextInput>
        <TextInput
          value={inputTarget}
          placeholder={inputTargetPlaceholder}
          style={{backgroundColor: 'green', flex: 1}}
        ></TextInput>
        <Button 
          title='번역'
          onPress={() => TransStart()}
          style={{flex: 1}}
        ></Button>
        <Button 
          title='언어 바꾸기'
          onPress={() => {
            if(isKorean){
              setIsKorean(false);
              setInputTransPlaceholder("영어를 입력해주세요.");
              setInputTargetPlaceholder("한국어를 입력해주세요.");
              setInputTarget('')
            }
            else{
              setIsKorean(true);
              setInputTransPlaceholder("한국어를 입력해주세요.");
              setInputTargetPlaceholder("영어를 입력해주세요.");
              setInputTarget('')
            }
          }}
          style={{flex: 1}}
        ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  
});