import React, { useState, useRef, FormEvent } from "react";
import QRCode from "qrcode.react";
import icon from "../../static/assets/images/code-icon.png";

export default function QrCode() {
  const qrRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState<string>("");

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
      setUrl("");
    }
  };

  const qrCode = (
    <QRCode
      id="qrCodeElToRender"
      size={500}
      value={url}
      bgColor="white"
      fgColor="#141926"
      level="H"
    />
  );

  return (
    <div className="qr-container">
      <form onSubmit={downloadQRCode} className="qr-container__form">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <button type="submit">Download QR Code</button>
      </form>

      <div className="qr-container__qr-code" ref={qrRef}>
        {qrCode}
      </div>
    </div>
  );
}
