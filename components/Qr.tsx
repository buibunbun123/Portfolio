'use client'
import React, { useState, useRef, FormEvent } from 'react';
import QRCode from "qrcode.react";
import icon from "../../static/assets/images/code-icon.png";
const YourComponent: React.FC = () => {
  // Define refs and state
  const formRef = useRef<HTMLFormElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string>('');
  const [size, setSize] = useState<number>(0);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  const onGenerateSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearUI();
    const url = (formRef.current?.querySelector('#url') as HTMLInputElement)?.value;
    const size = (formRef.current?.querySelector('#size') as HTMLSelectElement)?.value;

    if (url === '') {
      alert('Please enter a URL');
    } else {
      showSpinner();
      setTimeout(() => {
        hideSpinner();
        setUrl(url);
        setSize(parseInt(size || '0', 10));
        setShowQRCode(true);
      }, 1000);
    }
  };

  // w-full h-20 relative bg-gradient-to-r from-blue-500 to-green-500
  const generateQRCode = () => {
    return (
      <div className={`mt-0 flex flex-col items-center justify-center`}>
        {showQRCode && <h1 className='text-white mb-8 border-2 rounded-lg  relative bg-gradient-to-r from-yellow-500 to-red-500 w-1/3 h-8 font-bold font-mono text-xl lg:h-12 lg:text-2xl '>Your QR is generated</h1>}
        {showQRCode && <div className="qr-container__qr-code" ref={qrRef}>
        {qrCode}
      </div>}
        {showQRCode && <button onClick={downloadQRCode} type="submit" className='text-red-500'>
          <div className="border-2 mt-10 p-4 bg-gradient-to-r from-blue-500 to-green-500 text-gray-800 text-xl font-mono font-bold rounded-xl">
          Download QR Code 
          </div>
          </button>}
      </div>
    );
  };

  const clearUI = () => {
    setShowQRCode(false);
  };

  const downloadQRCode = (evt: FormEvent) => {
    evt.preventDefault();

    if (qrRef.current) {
      let canvas = qrRef.current.querySelector("canvas") as HTMLCanvasElement;
      let image = canvas.toDataURL("image/png");

      let anchor = document.createElement("a");
      anchor.href = image;
      anchor.download = `qr-code.png`;

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  };

  const qrCode = (
    <QRCode
      id="qrCodeElToRender"
      size={size}
      value={url}
      bgColor="white"
      fgColor="#141926"
      level="H"
    />
  );
  // Helper function to show spinner
  const showSpinner = () => {
    const spinner = document.getElementById('spinner');
    if (spinner) {
      spinner.style.display = 'block';
    }
  };

  // Helper function to hide spinner
  const hideSpinner = () => {
    const spinner = document.getElementById('spinner');
    if (spinner) {
      spinner.style.display = 'none';
    }
  };

  // JSX structure for the component
  return (
    <main>
      <div className="flex flex-col-reverse align-center justify-center p-10 md-auto  md:flex-row">
        <div className='w-full md:w-2/3 mr-24'>
          <h1 className="text-3xl text-blue-700 font-mono font-bold mb-4 md:text-5xl md:mb-10">
            QR Code Generator
          </h1>
          <p className="mb-4 text-black font-semibold font-mono font-2xl md:mb-10 lg:font-3xl">
            QR codes for websites streamline access and marketing.
            Scan for instant website navigation,
            promotions, product details, and contactless interactions.
          </p>
          <p className='text-black font-mono font-xl'>
            Enter your URL below to generate a QR Code and download the image.
          </p>
          <form ref={formRef} id="generate-form" className="mt-4 text-black" onSubmit={onGenerateSubmit}>
            <input
              id="url"
              type="url"
              placeholder="Enter your URL"
              className="w-full border-2 border-gray-200 rounded p-3 text-gray-dark mr-2 focus:outline-none mb-5"
              required
            />
            <select
              className="w-full border-2 border-gray-200 rounded p-3 text-gray-700 focus:outline-none"
              name="size"
              id="size"
            >
              <option value="100">100x100</option>
              <option value="200">200x200</option>
              <option value="300" selected>
                300x300
              </option>
              <option value="400">400x400</option>
              <option value="500">500x500</option>
              <option value="600">600x600</option>
              <option value="700">700x700</option>
            </select>
            <button className='bg-gray-600 rounded w-full text-white py-3 px-4 mt-5 hover:bg-black' type='submit'>Generate QR Code</button>
          </form>
        </div>
        <div className='mt-10 w-full md:w-1/3 self-center'>
          <img src="/qr-img-1.png" alt="qr-generate people" className='w-1/2 m-auto mb-10 md:w-full' />
        </div>
      </div>
      <div id="generated" className="max-w-5xl m-auto flex flex-col text-center align-center justify-center mt-10">
        <div id="spinner" role="status" className='hidden'>
          <svg
            className="inline mr-2 w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div id='qrcode'>
          {generateQRCode()}
        </div>
        <div className="w-full h-60"></div>
      </div>
    </main>
  );
};

export default YourComponent;
