import React from 'react';

interface SlidingCarouselProps {
  images?: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const SlidingCarousel: React.FC<SlidingCarouselProps> = ({
  images: propImages = [],
  speed = 30,
  direction = 'left',
  className = '',
}) => {
  const defaultLogos = [
    'https://picsum.photos/200/100?random=101',
    'https://picsum.photos/200/100?random=102',
    'https://picsum.photos/200/100?random=103',
    'https://picsum.photos/200/100?random=104',
    'https://picsum.photos/200/100?random=105',
    'https://picsum.photos/200/100?random=106',
  ];

  const images = propImages.length > 0 ? propImages : defaultLogos;
  const duplicatedImages = [...images, ...images];

  return (
    <div className={`py-12 overflow-hidden bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Partners</h2>
        
        <div className="relative w-full overflow-hidden">
          <div 
            className="flex gap-8"
            style={{
              animation: `${direction === 'left' ? 'slideLeft' : 'slideRight'} ${speed}s linear infinite`,
            }}
          >
            {duplicatedImages.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center"
              >
                <img
                  src={img}
                  alt={`Logo ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SlidingCarousel;