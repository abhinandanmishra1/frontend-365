import React, { useRef, useState } from 'react';

import QRCode from 'qrcode';

const QRCodeGenerator = () => {
    const [text, setText] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const canvasRef = useRef(null);

    const generateQRCode = async () => {
        if (!text) {
            alert('Please enter some text or URL');
            return;
        }

        try {
            await QRCode.toCanvas(canvasRef.current, text, {
                width: 300,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#FFFFFF"
                }
            });

            const dataUrl = await QRCode.toDataURL(text, {
                width: 300,
                margin: 2
            });
            setQrCodeUrl(dataUrl);
        } catch (err) {
            console.error('Error generating QR code:', err);
            alert('Failed to generate QR code');
        }
    };

    const downloadQRCode = () => {
        if (!qrCodeUrl) {
            alert('Generate a QR code first');
            return;
        }

        const link = document.createElement('a');
        link.href = qrCodeUrl;
        link.download = 'qr_code.png';
        link.click();
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">QR Code Generator</h2>
            
            <div className="mb-4">
                <input 
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text or URL"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div className="flex space-x-4 mb-4">
                <button 
                    onClick={generateQRCode}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Generate QR Code
                </button>
                
                {qrCodeUrl && (
                    <button 
                        onClick={downloadQRCode}
                        className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Download QR Code
                    </button>
                )}
            </div>
            
            <div className="flex justify-center">
                <canvas 
                    ref={canvasRef} 
                    className={`${qrCodeUrl ? 'block' : 'hidden'} border-2 border-gray-200`}
                />
            </div>
        </div>
    );
};

export default function Project28() {
    return (
        <div className="max-w-7xl mx-auto p-4 pt-6">
            <h1 className="text-3xl font-bold mb-6">QR Code Generator</h1>
            <QRCodeGenerator />
        </div>
    );
}