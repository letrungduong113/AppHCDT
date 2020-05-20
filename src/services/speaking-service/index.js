import React from 'react';
import {Platform } from 'react-native';
import Tts from 'react-native-tts';
import NavigationService from '../navigation-service';
var Sound = require('react-native-sound');

class SpeakingService {
    static isRunning = false;
    constructor() {
      this.onStopped = null;
      this.htmlContent = "";
      this.sentences = [];
      this.speakingIndex = -1;
      this.iOSPlayer = null;
      Tts.addEventListener("tts-start", event =>
      //this.setState({ ttsStatus: "started" })
          {}
      );
      Tts.addEventListener("tts-finish", event =>
      //this.setState({ ttsStatus: "finished" })
        {
          if (this.speakingIndex >= 0 && this.speakingIndex < this.sentences.length - 1) {
            this.speakingIndex ++;
            Tts.speak(this.sentences[this.speakingIndex]);
          }
          else {
            this.speakingIndex = -1;
            if (this.onStopped) {
              this.onStopped();
            }
          }
        }
      );
      Tts.addEventListener("tts-cancel", event =>
      //this.setState({ ttsStatus: "cancelled" })
          {}
      );
      Tts.setDefaultLanguage('vi-VN');
      Tts.voices().then(voices => console.log('voice',voices));
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(1);
      Tts.getInitStatus().then(this.initTts);
      this.isRunning = true;

      navigation = NavigationService.getNavigation();
      if (navigation) {
        console.log('---navigation---', navigation);
        this.didBlur = navigation.addListener('didBlur', payload => {
          SpeakingService.stop();
        })
      }
    }

    initService() {
    }

    stopService() {
        Tts.stop();
        Tts.removeAllListeners("tts-start");
        Tts.removeAllListeners("tts-finish");
        Tts.removeAllListeners("tts-cancel");
        this.isRunning = false;
        this.didBlur.remove();
    }
    
    RNSoundPlay() {
    //   console.log("RNSoundPlay", this.sentences[this.speakingIndex]);
      if (this.speakingIndex <0 || this.speakingIndex >= this.sentences.length) return;
      text = encodeURIComponent(this.sentences[this.speakingIndex]);
      console.log(`https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${text}`);
      var whoosh = new Sound(`https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${text}`, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        else {
          this.iOSPlayer = whoosh;
          whoosh.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
            if (this.speakingIndex >= 0 && this.speakingIndex < this.sentences.length - 1) {
              this.speakingIndex ++;
              this.RNSoundPlay();
            }
            else {
              this.speakingIndex = -1;
              if (this.onStopped) {
                this.onStopped();
              }
            }
          });
        }
      });
    }
    speak(content) {
      console.log("speak-------------------", content);
      if (content && content.length> 0) {
        this.sentences = content.split(/[.,;]/);
        if (Platform.OS == "android") {
          
          Tts.stop();
          if (this.sentences.length > 0) {
            this.speakingIndex = 0;
            Tts.speak(this.sentences[0]);
          }
        }
        else {
          console.log(this.sentences);
          if (this.sentences.length > 0) {
            this.speakingIndex = 0;
            this.RNSoundPlay();
          }
        }
       
      }
      else {
        if (this.onStopped) this.onStopped();
      }
    }

    stop() {
        Tts.stop();
        this.contents = [];
        this.speakingIndex = -1;
        if (Platform.OS == "ios" && this.iOSPlayer) {
          this.iOSPlayer.stop();
        }
    }
    initTts = async () => {
        console.log('---------INIT------------')
        const voices = await Tts.voices();
        const availableVoices = voices
          .filter(v => !v.networkConnectionRequired && !v.notInstalled)
          .map(v => {
            return { id: v.id, name: v.name, language: v.language };
          });
        console.log(availableVoices);
        vnLang = voices.find(item => item.language == "vi-VN");
        if (!vnLang) {
          vnLang = voices[0];
        }
        console.log('--------Default speaking language-------', vnLang.language);
        
        if (voices && voices.length > 0) {
          try {
            await Tts.setDefaultLanguage(vnLang.language);
          } catch (err) {
            // My Samsung S9 has always this error: "Language is not supported"
            console.log(`setDefaultLanguage error `, err);
          }
          await Tts.setDefaultVoice(vnLang.id);
        //   this.setState({
        //     voices: availableVoices,
        //   });
        } else {
         //this.setState({ ttsStatus: "initialized" });
        }
    };
}
export default new SpeakingService();