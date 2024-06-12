// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const body = document.querySelector('body');
const speakBtn = document.querySelector('#speakBtn');
const cancel = document.querySelector('#cancel');
// const separate = document.querySelector('#separate');
const back1 = document.querySelector('#back1');
const run1 = document.querySelector('#run1');
const forw1 = document.querySelector('#forw1');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

// counter
let cnter = 0;
let segment = [];

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.filter((word) => word.name.includes("Daniel")).forEach(voice => {
    // voices.filter((word) => word.lang.includes("en-GB")).forEach(voice => {
      // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', "en-GB");
    option.setAttribute('data-name', "Daniel");
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if (textInput.value !== '') {
    // Add background animation
    body.style.background = '#141414 url(img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = e => {
      console.log('Done speaking...');
      body.style.background = '#141414';
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = 1;
    speakText.pitch = 1;
    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS

// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});
    
// Voice select change
// voiceSelect.addEventListener('change', e => speak());

//click Cancel
cancel.addEventListener('click', e => synth.cancel());

//click Separate
// separate.addEventListener('click', e => {
//     // alert(textInput.value);
//     let textArray = textInput.value.split(".");
//     textArray.forEach(tt => {
//         let speakText = new SpeechSynthesisUtterance(tt);
        
//         // Selected voice
//         const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
//             'data-name'
//         );
    
//         // Loop through voices
//         voices.forEach(voice => {
//             if (voice.name === selectedVoice) {
//             speakText.voice = voice;
//             }
//         });
          
//         speakText.rate = rate.value;;
//         speakText.pitch = pitch.value;
//         synth.speak( speakText)
//     })
// });

textInput.addEventListener('change', e => {
  segment = textInput.value.split(/[.:?]/);
  cnter = 0;
});

back1.addEventListener('click', e => {
    if (cnter > 0) {
        cnter--;
        let speakText = new SpeechSynthesisUtterance(segment[cnter]);
        
        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
            'data-name'
        );
    
        // Loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
            speakText.voice = voice;
            }
        });

        speakText.rate = 1;
        speakText.pitch = 1;
        synth.speak( speakText);
    }
});

run1.addEventListener('click', e => {
    // console.log(segment[cnter]);
    if (cnter >= 0) {
    // if (segment.length >= 0)
      let speakText = new SpeechSynthesisUtterance(segment[cnter]);
        
        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
            'data-name'
        );
    
        // // Loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
            speakText.voice = voice;
            }
        });

        speakText.rate = 1;
        speakText.pitch = 1;
        synth.speak( speakText);
    }
});

forw1.addEventListener('click', e => {
    if (cnter < segment.length - 1) {
        cnter++;
        let speakText = new SpeechSynthesisUtterance(segment[cnter]);
        
        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
            'data-name'
        );
    
        // Loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
            speakText.voice = voice;
            }
        });
            
        speakText.rate = 1;
        speakText.pitch = 1;
        synth.speak( speakText);
    }
});

