import React, { useState } from "react";
import Introduction from "./Introduction";
import InputType from "./InputType";
import InputBox from "./InputBox";
import Generate from "./Generate";
import FileUpload from "./FileUpload";
import AnimationWrapper from "./AnimationWrapper";
import { AnimatePresence, motion } from "framer-motion";

function Content() {
  const [inputMethod, setInputMethod] = useState(0);

  const updateInputMethod = (method) => {
    setInputMethod(method);
  };

  const [uploadedFile, setUploadedFile] = useState(null);

  const updateUploadedFile = (file) => {
    setUploadedFile(file);
  };

  const [inputText, setInputText] = useState("");

  const updateInputText = (text) => {
    setInputText(text);
  };

  return (
    <div className="flex flex-col py-10 px-5 gap-10 sm:px-10 md:py-14 md:gap-14 lg:flex-row lg:items-center lg:gap-[4%] lg:px-[3%] lg:justify-center min-[1750px]:px-[5%]">
      <div className="flex flex-col gap-8 md:gap-10 lg:w-[40%]">
        <AnimationWrapper>
          <div className="flex flex-col gap-8 md:gap-10">
            <Introduction />
            <InputType onMethodUpdate={updateInputMethod} />
          </div>
        </AnimationWrapper>
      </div>
      <div className="flex flex-col gap-8 pb-2 md:gap-10 lg:w-[50%] justify-center lg:pb-0 lg:self-stretch lg:gap-8">
        {inputMethod ? (
          <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="lg:h-[90%]" 
          >
            <FileUpload updateUploadedFile={updateUploadedFile} />
          </motion.div>
        </AnimatePresence>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="lg:h-[90%]"
            >
              <InputBox updateInputText={updateInputText} />
            </motion.div>
          </AnimatePresence>
        )}
        <AnimationWrapper>
          <Generate
            inputMethod={inputMethod}
            inputText={inputMethod === 0 && inputText ? inputText : null}
            uploadedFile={
              inputMethod === 1 && uploadedFile ? uploadedFile : null
            }
          />
        </AnimationWrapper>
      </div>
    </div>
  );
}

export default Content;
