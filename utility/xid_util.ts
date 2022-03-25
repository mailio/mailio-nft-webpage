/**
 * Conversion util for xid globally unique ID generator
 * Original source: https://github.com/rs/xid
 * Adapted from: https://github.com/0xShamil/java-xid
 */
const BASE32_HEX_CHARS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v',
];

const BASE32_LOOKUP_TABLE = [
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, // '0', '1', '2', '3', '4', '5', '6', '7'
    0x08, 0x09, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, // '8', '9', ':', ';', '<', '=', '>', '?'
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, // '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G'
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, // 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, // 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W'
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, // 'X', 'Y', 'Z', '[', '\', ']', '^', '_'
    0xFF, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, // '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g'
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, // 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'
    0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0xFF, // 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'
    0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF  // 'x', 'y', 'z', '{', '|', '}', '~', 'DEL'
];

// 
export const base32HexToString = (xid: Uint8Array): string => {
    let i: number = 0;
    let index: number = 0;
    let digit: number = 0;
    let currByte: number;
    let nextByte: number;

    let base32: string = "";
    while (i < xid.length) {
        currByte = xid[i] >= 0 ? xid[i] : xid[i] + 256; // unsigned

        if (index > 3) {
            // Current digit spanning a byte boundary?
            if (i + 1 < xid.length) {
                nextByte = xid[i + 1] >= 0 ? xid[i + 1] : xid[i + 1] + 256;
            } else {
                nextByte = 0;
            }

            digit = currByte & (0xff >> index);
            index = (index + 5) % 8;
            digit <<= index;
            digit |= nextByte >> (8 - index);
            i++;
        } else {
            digit = (currByte >> (8 - (index + 5))) & 0x1f;
            index = (index + 5) % 8;
            if (index === 0) {
                i++;
            }
        }
        base32 += BASE32_HEX_CHARS[digit];
    }
    return base32;
};

export const base32HexToBytes = (xid: String): Uint8Array => {
    let i: number = 0;
    let index: number = 0;
    let digit: number = 0;
    let lookup: number = 0;
    let offset: number = 0;

    const bytes: Uint8Array = new Uint8Array(xid.length * 5 / 8); // 5 bits per char

    for (i = 0, index = 0, offset = 0; i < xid.length; i++) {
        lookup = xid.charCodeAt(i) - 48; // 0-based index (ASCII value for '0' is 48)

        // Skip chars outside the lookup table. */
        if (lookup < 0 || lookup >= BASE32_LOOKUP_TABLE.length) {
            continue;
        }

        digit = BASE32_LOOKUP_TABLE[lookup];

        /* If this digit is not in the table, ignore it. */
        if (digit === 0xFF) {
            continue;
        }

        if (index <= 3) {
            index = (index + 5) % 8;
            if (index === 0) {
                bytes[offset] |= digit;
                offset++;
                if (offset >= bytes.length) {
                    break;
                }
            } else {
                bytes[offset] |= digit << (8 - index);
            }
        } else {
            index = (index + 5) % 8;
            bytes[offset] |= (digit >>> index);
            offset++;

            if (offset >= bytes.length) {
                break;
            }
            bytes[offset] |= digit << (8 - index);
        }
    }
    return bytes;
};