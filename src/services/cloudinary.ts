export const CLOUDINARY_CLOUD_NAME = 'dxeuzdwkz';
export const CLOUDINARY_UPLOAD_PRESET = 'Glass fabricator';
export const CLOUDINARY_UPLOAD_ENDPOINT = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export interface CloudinaryUploadResult {
  url: string;
  publicId?: string;
  source: 'cloudinary' | 'local-fallback';
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to read local file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image file directly to Cloudinary using unsigned FormData upload
 * with Cloud Name: "dxeuzdwkz" and Upload Preset: "Glass fabricator".
 * Reports real-time progress (0-100) via onProgress callback.
 */
export async function uploadImageToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<CloudinaryUploadResult> {
  if (onProgress) onProgress(5);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', CLOUDINARY_UPLOAD_ENDPOINT, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.min(98, Math.round((event.loaded / event.total) * 100));
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.secure_url || response.url) {
              if (onProgress) onProgress(100);
              resolve({
                url: response.secure_url || response.url,
                publicId: response.public_id,
                source: 'cloudinary',
              });
              return;
            }
          } catch {
            // Fall through to error handler
          }
        }
        reject(new Error(`Cloudinary HTTP ${xhr.status}: ${xhr.responseText}`));
      };

      xhr.onerror = () => {
        reject(new Error('Network error reaching Cloudinary upload endpoint'));
      };

      xhr.send(formData);
    });

    return result;
  } catch {
    // Fallback to DataURL if offline or sandbox blocks external upload
    const dataUrl = await readFileAsDataUrl(file);
    if (onProgress) onProgress(100);
    return {
      url: dataUrl,
      source: 'local-fallback',
    };
  }
}
