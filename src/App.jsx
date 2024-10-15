import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import { ErrorProvider } from "./components/ErrorContext";
import Message from "./components/message";

function App() {
  return (
    <ErrorProvider>
      <Message />
      <div className="text-text min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow text-text bg-secondary lg:flex lg:items-center lg:justify-center">
          <Content />
        </div>
      </div>
    </ErrorProvider>
  );
}

export default App;
