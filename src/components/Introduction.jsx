import React from "react";

function Introduction() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-medium md:text-3xl xl:text-4xl min-[1750px]:text-[2.5rem]">Text to Speech Using Custom-Trained AI Model</h1>
      <p className="text-xl font-light md:text-2xl min-[1750px]:text-3xl">
        Experience lifelike speech from a custom-trained AI voice created with
        Coqui TTS. Built with React and a Flask API, this platform offers
        real-time synthesis and high-quality audio for improved accessibility.
      </p>
    </div>
  );
}

export default Introduction;
