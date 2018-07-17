import { boolean as bufferToBoolMap, binary as boolMapToBuffer } from 'life-game/binary-life';

export const base64toMap = base64 => bufferToBoolMap(Buffer.from(base64, 'base64'));

export const mapToBase64 = boolMap => boolMapToBuffer(boolMap).toString('base64');
