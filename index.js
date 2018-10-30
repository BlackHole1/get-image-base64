function validValue (url, callback, type, quality) {
  if (typeof url !== 'string') {
    throw TypeError('[get-image-base64 package]: The url address must be a string type');
  }

  if (typeof callback !== 'function') {
    throw TypeError('[get-image-base64 package]: The callback must be a function type');
  }

  if (callback.length !== 1) {
    console.warn('[get-image-base64 package]: The callback function preferably has a parameter that accepts a base64 string');
  }

  if (!['png', 'jpeg', 'webp'].includes(type)) {
    throw Error('[get-image-base64 package]: The type must be one of png/jpeg/webp');
  }

  if (type !== 'webp' && (typeof quality !== 'number' || quality !== quality)) {
    throw Error('[get-image-base64 package]: The quality must be a number type and cannot be NaN');
  }

  if (quality < 0 || quality > 1) {
    throw Error('[get-image-base64 package]: The range of quality must be between 0 and 1');
  }
}

/**
 * get image base64
 * @param url { String | Array } image url address
 * @param callback { function } callback function
 * @param type { string } images type
 * @param quality { number } image quality
 * @return void
 */
function getImageBase64(url, callback = (base64Str) => {}, type = 'png', quality = 0.92) {
  validValue(url, callback, type, quality);

  const imgTag = new Image();
  let base64Str = '';

  imgTag.setAttribute('crossOrigin', 'anonymous');
  imgTag.src = url;
  imgTag.onload = () => {
    const canvas = document.createElement('canvas');
    const { width, height } = imgTag;
    canvas.width = width;
    canvas.height = height;

    canvas.getContext('2d').drawImage(imgTag, 0, 0, width, height);
    base64Str = canvas.toDataURL(`image/${type}`, quality);
    callback(base64Str);
  }
}

export default getImageBase64;
