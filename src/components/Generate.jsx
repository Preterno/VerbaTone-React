import React, { useState, useRef, useContext, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import mammoth from "mammoth";
import pdfToText from "react-pdftotext";
import { ErrorContext } from "./ErrorContext";
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "./SvgIcons";

function Generate({ inputMethod, inputText, uploadedFile }) {
  const [textForSynthesis, setTextForSynthesis] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const scrollRef = useRef(null);

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const { setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    if (inputMethod === 0) {
      setTextForSynthesis(inputText || "");
    } else {
      setTextForSynthesis("");
    }
  }, [inputMethod, inputText]);

  const extractText = async (file) => {
    setErrorMessage("");

    try {
      let text = "";
      const fileType = file.name.split(".").pop().toLowerCase();

      switch (fileType) {
        case "doc":
        case "docx":
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          text = result.value;
          break;

        case "pdf":
          text = await pdfToText(file);
          break;

        case "txt":
          text = await file.text();
          break;

        default:
          throw new Error(
            "Unsupported file type. Please upload a valid document in one of the following formats: .docx, .doc, .pdf, or .txt"
          );
      }

      if (text.length > 1000) {
        throw new Error("Error: File contains more than 1000 characters");
      }

      return text;
    } catch (error) {
      throw new Error("Error extracting text: " + error.message);
    }
  };

  const maxSize = 10 * 1024 * 1024;

  async function fetchAudio() {
    if (!textForSynthesis) {
      throw new Error("No text provided for synthesis");
    }

    const formData = new FormData();
    formData.append("text", textForSynthesis);

    const response = await fetch(`${apiUrl}/synthesize`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "X-API-KEY": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  }

  async function handleFetchAudio() {
    setErrorMessage("");
    setIsLoading(true);
    setShow(false);
    try {
      if (inputMethod === 0) {
        if (!textForSynthesis || textForSynthesis.length > 1000) {
          throw new Error(
            textForSynthesis
              ? "Text contains more than 1000 characters"
              : "No text provided"
          );
        }
      } else {
        if (
          !uploadedFile ||
          uploadedFile.size === 0 ||
          uploadedFile.size > maxSize
        ) {
          throw new Error(
            uploadedFile
              ? "File size exceeds the limit of 10MB"
              : "No file provided or empty file"
          );
        }
        const extractedText = await extractText(uploadedFile);
        setTextForSynthesis(extractedText);
      }
      const audioUrl = await fetchAudio();
      setAudioUrl(audioUrl);
      setShow(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:w-full">
      <div className="flex justify-between items-center">
        <div
          className="bg-primary rounded-xl w-full items-center text-center cursor-pointer hover:bg-primary-dark shadow-custom-sm hover:shadow-custom-md transition-all md:rounded-2xl sm:w-36 md:w-44"
          onClick={handleFetchAudio}
        >
          {!isLoading && (
            <h1 className="text-2xl px-6 py-3 font-medium md:text-3xl md:px-8 md:py-4 min-[1750px]:text-[2.125rem]">
              Generate
            </h1>
          )}
          {isLoading && <div className="px-6 py-3 md:px-8 md:py-4"><Loading /></div>}
        </div>
      </div>
      {show && (
        <div className="flex-grow">
          <AnimatePresence>
            <motion.div
              ref={scrollRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <AudioPlayer audioURL={audioUrl} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Generate;
