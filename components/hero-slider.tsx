"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    image: "/GOAL_SITE.jpg",
    title: "Chegou o novo GOAL!",
    description: "Venha já tentar se tornar o Rei dos Piratas!"
  },
  {
    image: "/LICH.jpg",
    title: "Novo pacote Lich chegou!",
    description: "Desafie as leis da vida e da morte, se tornando um Lich! "
  },
  {
    image: "/POKEARKUS.jpg",
    title: "Bem vindos ao Poke Arkus!",
    description: "Venha você também explorar o Nosso Mundo!"
  },
];

export function HeroSlider() {
  return (
    <div className="w-full relative mb-20">
      <div className="max-w-[1920px] mx-auto overflow-hidden rounded-lg">
        <Swiper
          modules={[Navigation, Pagination]}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          navigation
          pagination={{ 
            clickable: true,
            type: 'bullets'
          }}
          loop={true}
          speed={600}
          className="[&_.swiper-slide]:w-full [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:opacity-70 [&_.swiper-button-prev]:opacity-70 [&_.swiper-button-next]:hover:opacity-100 [&_.swiper-button-prev]:hover:opacity-100 [&_.swiper-pagination]:bottom-6 [&_.swiper-pagination-bullet]:w-3 [&_.swiper-pagination-bullet]:h-3 [&_.swiper-pagination-bullet]:bg-white/70 [&_.swiper-pagination-bullet-active]:bg-white"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[60vh] sm:h-[65vh] lg:h-[70vh] max-h-[600px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                {/* Minimal bottom-left text overlay without heavy gradients */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-white max-w-xs sm:max-w-sm">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                      {slide.title}
                    </h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
