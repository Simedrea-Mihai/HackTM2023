import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Speech from 'speak-tts';


@Injectable({
	providedIn: 'root'
})
export class SpeakService {

    public content: string = '';

    result = '';
  speech: any;
  speechData: any;
  constructor(private http: HttpClient){
    
  }

  start(){
    this.speech = new Speech() // will throw an exception if not browser supported
    if(this.speech .hasBrowserSupport()) { // returns a boolean
        console.log("speech synthesis supported")
        this.speech.init({
                'volume': 1,
                'lang': 'en-GB',
                'rate': 1,
                'pitch': 1,
                'voice':'Google UK English Male',
                'splitSentences': true,
                'listeners': {
                    'onvoiceschanged': (voices: any) => {
                        console.log("Event voiceschanged", voices)
                    }
                }
        }).then((data: any) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)
            this.speechData = data;
            data.voices.forEach((voice: any) => {
            console.log(voice.name + " "+ voice.lang)
            });
        }).catch((e: any) => {
            console.error("An error occured while initializing : ", e)
        })
    }
    console.log('a');
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = this.content;
    // Retrieve the text property of the element (cross-browser support)
    this.result = temporalDivElement.textContent || temporalDivElement.innerText || "";

      this.speech.speak({
          text: this.result,
      }).then(() => {
          console.log("Success !")
      }).catch((e: any) => {
          console.error("An error occurred :", e) 
      })
  }
  pause(){
    this.speech.pause();
  }
  resume(){
    this.speech.resume();
  }

  setLanguage(i: any){
    console.log(i);
    console.log(this.speechData.voices[i].lang + this.speechData.voices[i].name);
    this.speech.setLanguage(this.speechData.voices[i].lang);
    this.speech.setVoice(this.speechData.voices[i].name);
  }
}
