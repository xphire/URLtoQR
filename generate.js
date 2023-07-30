const qrCode = require('qrcode');

// Function to generate the QR code and return the base64 string
async function generateQrCodeBase64(url) {
  try {
    const qrCodeOptions = {
      errorCorrectionLevel: 'M', // Error correction level (L, M, Q, H)
      type: 'png', // QR code image type (png, svg, jpg, etc.)
      rendererOpts: {
        quality: 1.0, // Image quality (0.0 to 1.0)
      },
    };

    const qrCodeBuffer = await qrCode.toBuffer(url, qrCodeOptions);
    const qrCodeBase64 = 'data:image/png;base64,' +  qrCodeBuffer.toString('base64');

    return qrCodeBase64;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

module.exports = generateQrCodeBase64;
