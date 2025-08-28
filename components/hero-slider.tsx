"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

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
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          navigation
          pagination={{ 
            clickable: true,
            type: 'bullets'
          }}
          loop={true}
          speed={800}
          className="[&_.swiper-slide]:w-full [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:opacity-70 [&_.swiper-button-prev]:opacity-70 [&_.swiper-button-next]:hover:opacity-100 [&_.swiper-button-prev]:hover:opacity-100 [&_.swiper-pagination]:bottom-6 [&_.swiper-pagination-bullet]:w-3 [&_.swiper-pagination-bullet]:h-3 [&_.swiper-pagination-bullet]:bg-white/70 [&_.swiper-pagination-bullet-active]:bg-white"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[800px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-48">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90">
                      {slide.description}
                    </p>
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
