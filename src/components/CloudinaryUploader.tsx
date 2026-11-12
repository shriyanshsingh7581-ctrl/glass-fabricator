import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  uploadImageToCloudinary,
} from '../services/cloudinary';
import { ResilientImage } from './ResilientImage';

interface CloudinaryUploaderProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
}

export const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({
  label,
  value,
  onChange,
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(5);
    setStatusMessage(null);

    try {
      const res = await uploadImageToCloudinary(file, (pct) => setProgress(pct));
      onChange(res.url);
      setStatusMessage(
        res.source === 'cloudinary'
          ? `Uploaded to Cloudinary (${CLOUDINARY_CLOUD_NAME})`
          : 'Loaded image ready for save'
      );
    } catch (err) {
      setStatusMessage(
        err instanceof Error ? err.message : 'Upload failed, try pasting URL'
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-3 rounded-xl bg-slate-950 border border-slate-800 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-200">{label}</span>
        <span className="font-mono text-[11px] text-slate-400">
          Cloudinary: {CLOUDINARY_CLOUD_NAME} · Preset: {CLOUDINARY_UPLOAD_PRESET}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Live Preview */}
        <div className="w-24 h-20 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
          <ResilientImage
            src={value}
            alt={label}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Upload Button + Direct URL Input */}
        <div className="flex-1 w-full space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id={`cloudinary-file-${label.replace(/\s+/g, '-')}`}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#16A6A1] hover:bg-[#128A86] disabled:opacity-60 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>
                {uploading
                  ? `Uploading (${progress}%)...`
                  : 'Upload Photo (Cloudinary)'}
              </span>
            </button>

            {statusMessage && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{statusMessage}</span>
              </span>
            )}
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Secondary Direct URL Input */}
          <div className="relative">
            <LinkIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or paste direct image URL / asset path..."
              aria-label={`${label} Direct URL`}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
