import React, { useState } from 'react';
import { VideoItem, Language } from '../types';
import { videosData } from '../data/translations';
import { VideoModal } from './VideoModal';
import { 
  Play, 
  Video
} from 'lucide-react';

interface LearnExpertsProps {
  language: Language;
}

export const LearnExperts: React.FC<LearnExpertsProps> = ({ language }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section id="learn" className="py-14 sm:py-18 bg-white relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] text-xs sm:text-sm font-semibold mb-4">
            <Video className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>PRACTICAL LEGAL & TAX GUIDANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'আমাদের বিশেষজ্ঞদের কাছ থেকে শিখুন' : 'Learn From Our Experts'}
          </h2>
        </div>

        {/* 3 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {videosData.map((video) => {
            const title = language === 'bn' ? video.titleBn : video.title;

            return (
              <div
                key={video.id}
                id={`learn-video-card-${video.id}`}
                onClick={() => setActiveVideo(video)}
                className="group bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                {/* Video Thumbnail Area */}
                <div className="relative aspect-[16/9.5] bg-slate-950 rounded-2xl overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors" />

                  {/* Circular Red Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#FF0000] transition-transform duration-200">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Video Modal Player */}
      <VideoModal
        video={activeVideo}
        language={language}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
};

