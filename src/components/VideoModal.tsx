import React from 'react';
import { VideoItem, Language } from '../types';
import { X, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  video: VideoItem | null;
  language: Language;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  language,
  onClose,
}) => {
  if (!video) return null;

  const title = language === 'bn' ? video.titleBn : video.title;
  const desc = language === 'bn' ? video.descBn : video.desc;

  return (
    <div 
      id="video-player-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
            <h3 className="text-xs sm:text-sm font-bold truncate max-w-lg text-slate-100">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Embed */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Description & Details */}
        <div className="p-5 bg-slate-900 text-slate-300 text-xs sm:text-sm border-t border-slate-800">
          <p className="leading-relaxed">
            {desc}
          </p>
        </div>

      </div>
    </div>
  );
};
