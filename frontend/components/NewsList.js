"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/news");
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);

    return (
        <section className="py-10 px-6 bg-white">
            <h2 className="text-4xl font-bold text-center mb-8 text-blue-900">AI News in the World</h2>
            
            <div className="relative max-w-6xl mx-auto pb-12"> 
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {news.map((article) => (
                        <SwiperSlide key={article._id}>
                            <a href={article.link} className="block bg-white rounded-lg shadow-lg overflow-hidden h-[400px] w-[350px] flex flex-col cursor-pointer p-4">
                                <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover rounded-md" />
                                <div className="mt-3 flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold text-black line-clamp-2 leading-tight mb-2">{article.title}</h3>
                                    <p className="text-gray-500 text-sm">Date: {article.date}</p>
                                    <p className="mt-2 text-gray-700 text-sm flex-grow line-clamp-3">{article.description}</p>
                                    <p className="text-gray-400 text-sm italic mt-2 line-clamp-2">{article.summary}</p>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Pagination đặt riêng bên ngoài Swiper */}
            <div className="flex justify-center mt-6 pb-6">
                <div className="flex gap-2">
                    {Array(Math.ceil(news.length / 3))
                        .fill()
                        .map((_, index) => (
                            <button
                                key={index}
                                onClick={() => swiperRef.current?.slideTo(index * 3)}
                                className={`w-3 h-3 rounded-full focus:outline-none transition ${activeIndex >= index * 3 && activeIndex < (index + 1) * 3 ? 'bg-blue-600 scale-125' : 'bg-gray-400 hover:bg-blue-500'}`}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

export default NewsList;
