const BYTE_LENGTH = 8;

const bufferToBinaryArray = buffer => {
  var bits = [];
  var byte;
  for (byte of buffer) {
    for (var i = BYTE_LENGTH - 1; i >= 0; i--) {
      bits.push(byte >> i & 1 ? true : false);
    }
  }
  return bits;
}

const base64toBuffer = base64 => bufferToBinaryArray(Buffer.from(base64, 'base64'));

export default base64toBuffer;
