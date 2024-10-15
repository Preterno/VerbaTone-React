# VerbaTone

VerbaTone is a web application that converts text to speech using a custom-trained Coqui TTS model. This repository contains the frontend code for the VerbaTone project, built with React and Tailwind CSS.

## Features

- Text-to-speech conversion for input up to 1000 characters
- File upload support for .txt, .doc, .docx, and .pdf files
- Elegant UI with responsive design
- Real-time audio playback of generated speech
- Option to download the generated audio file

## Demo

Check out the live demo: [https://verbatone.netlify.app/](https://verbatone.netlify.app/)

## Technologies Used

- React
- Tailwind CSS
- Framer Motion for animations
- Mammoth.js for .doc and .docx file parsing
- react-pdftotext for PDF text extraction

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/Preterno/VerbaTone-React.git
   ```

2. Install dependencies:
   ```
   cd VerbaTone-React
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```
   VITE_APP_API_URL=your_backend_api_url
   VITE_API_KEY=your_api_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## API Integration

The frontend communicates with a Flask backend API hosted on Railway. The API handles the actual text-to-speech conversion using a custom-trained Coqui TTS model.

- Backend Repository: [VerbaToneAPI](https://github.com/Preterno/VerbaToneAPI)

The custom-trained model is stored in the backend repository. For information about the model training process, please refer to the Colab notebook in the backend repository.

## Predecessor Project

VerbaTone is an evolution of a previous project that used HTML, CSS, JavaScript, and jQuery, utilizing the Web Speech API for audio synthesis:

- Repository: [Verbatone](https://github.com/Preterno/Verbatone)
- Live Demo: [https://preterno.github.io/Verbatone/](https://preterno.github.io/Verbatone/)

## Limitations

- Maximum text length: 1000 characters
- Maximum file size for uploads: 10MB
- File upload types: `.doc`, `.docx`, `.pdf`, `.txt`

## Connect with Me

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/).