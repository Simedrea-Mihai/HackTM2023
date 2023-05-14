import { Component, Input } from '@angular/core';
import Speech from 'speak-tts';


@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: [ './speech.component.scss' ]
})
export class SpeechComponent  {
  @Input() html = '';
  result = '';
  speech: any;
  speechData: any;
  constructor(){

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
  }

  ngOnInit(): void {
    this.start();
  }

  start(){
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = this.html;
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