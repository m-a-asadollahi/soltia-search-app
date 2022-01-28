import { useRef, useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ScaleLoader from "react-spinners/ScaleLoader";

import "./voiceSearch.css";

const SearchVoiceBox = ({ onSearchTerm }) => {
  //* use useRef hook for set a ref for microphone icon
  const microphoneRef = useRef(null);

  //* State and Setter for isListening
  //* isListening : use for figuring out a user click on microphone and say something
  const [isListening, setIsListening] = useState(false);

  //* State and Setter for voiceLoading
  //* voiceLoading : use for activing or disactiving loading
  const [voiceLoading, setVoiceLoading] = useState(false);

  //* State and Setter for transcript
  //* transcript :  after converting speech to text, the text is stored in the transcript
  const { transcript, resetTranscript } = useSpeechRecognition();

  //* Each time transcript is changed, its value is sent for search
  useEffect(() => {
    onSearchTerm(transcript);
  }, [transcript]);

  //* Handle actions after user click on microphone icon
  const handleListing = () => {
    let voiceLoaderHandelr;
    if (!isListening) {
      microphoneRef.current.classList.remove("closing");
      setIsListening(true);
      onSearchTerm("");
      microphoneRef.current.classList.add("listening");
      SpeechRecognition.startListening({
        continuous: true,
      });
      voiceLoaderHandelr = setTimeout(() => {
        setVoiceLoading(true);
      }, 1000);
    } else {
      microphoneRef.current.classList.remove("listening");
      microphoneRef.current.classList.add("closing");
      setIsListening(false);
      onSearchTerm("");
      SpeechRecognition.stopListening();
      resetTranscript();
      setVoiceLoading(false);
      clearTimeout(voiceLoaderHandelr);
    }
  };

  return (
    <div className="voice-box" ref={microphoneRef}>
      <span className="mic-container" onClick={handleListing}>
        <i className="fa fa-microphone mic-icon" aria-hidden="true" />
      </span>
      <div className="voice-panel">
        <ScaleLoader
          loading={voiceLoading}
          height={18}
          radius={1}
          color={"#fff"}
          width={2}
          margin={1}
          css="top:10px"
        />
      </div>
    </div>
  );
};

export default SearchVoiceBox;
