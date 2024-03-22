namespace NetworkUtils {
  // Function to serialize a message for safe URL transport
  export const encrypt = (message: string) => {
    // Convert the message to a base64 encoded string
    const buffer = Buffer.from(message, 'utf8');
    const base64Encoded = buffer.toString('base64');
    // Replace characters to make the base64 string URL-safe
    return base64Encoded
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  // Function to deserialize a message from a URL-safe base64 string
  export const decrypt = (message: string) => {
    // Replace URL-safe characters back to their base64 equivalents
    let base64String = message.replace(/-/g, '+').replace(/_/g, '/');
    // Pad the string with "=" to make its length a multiple of 4 if necessary
    while (base64String.length % 4) {
      base64String += '=';
    }
    // Decode the base64 string
    const buffer = Buffer.from(base64String, 'base64');
    return buffer.toString('utf8');
  };

  export const downloadImage = async (
    imageUrl: string,
    filename: string
  ): Promise<File> => {
    // Step 1: Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    // Step 2: Read the image as a Blob
    const imageBlob = await response.blob();

    // Determine the extension based on the MIME type
    let extension = '';
    switch (imageBlob.type) {
      case 'image/jpeg':
        extension = '.jpg';
        break;
      case 'image/png':
        extension = '.png';
        break;
      case 'image/gif':
        extension = '.gif';
        break;
      // Add more cases as needed
      default:
        console.warn('Unknown image type:', imageBlob.type);
    }

    // If the filename doesn't already end with the determined extension, append it
    if (!filename.endsWith(extension)) {
      filename += extension;
    }

    // Step 3: Create a File from the Blob with the updated filename
    const file = new File([imageBlob], filename, { type: imageBlob.type });

    return file;
  };

  export const fileName = (from: string): string => {
    // List of disallowed characters on Windows, which covers most cases
    const disallowedChars = /[\\/:*?"<>|]/g;
    // Replace disallowed characters with a hyphen
    let sanitized = from.toLowerCase().replace(disallowedChars, '-');
    // Replace spaces with hyphens (optional, based on preference)
    sanitized = sanitized.replace(/\s+/g, '-');
    // Trim leading and trailing hyphens (optional, based on preference)
    sanitized = sanitized.replace(/^-+|-+$/g, '');
    // Ensure the filename is not too long
    const maxLength = 255; // Max length for a filename in most file systems
    if (sanitized.length > maxLength) {
      sanitized = sanitized.substring(0, maxLength);
    }

    return sanitized;
  };
}

export default NetworkUtils;
