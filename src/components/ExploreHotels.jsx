import React from 'react'
import lahoreHotel from '../assets/images/hotels/pc-lahore.jpeg'
import isbdHotel from '../assets/images/hotels/serena-isbd.jpeg'
import karachiHotel from '../assets/images/hotels/movenpickl-karachi.jpg'
import peshawarHotel from '../assets/images/hotels/fortcont-peshawar.jpg'
import istanbulHotel from '../assets/images/hotels/swissotel-istanbul.jpg'
import antalyaHotel from '../assets/images/hotels/akra-antalya.jpeg'
import ankaraHotel from '../assets/images/hotels/ankara-ankara.jpeg'
import next from '../assets/images/home/next.png'
import back from '../assets/images/home/back.png'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Clock, Star } from 'lucide-react'

const SlickArrowLeft = ({ ...props }) => (
    <img src={back} alt='prevArrow' {...props} />
)
const SlickArrowRight = ({ ...props }) => (
    <img src={next} alt='nextArrow' {...props} />
)

const ExploreHotels = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        nextArrow: <SlickArrowRight />,
        prevArrow: <SlickArrowLeft />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    }

    const hotelList = [
        { name: 'Pearl Continental Lahore', city: 'Lahore', img: lahoreHotel, duration: '2 Nights', rating: '4.5 (230 reviews)', price: '15000' },
        { name: 'Serena Hotel Islamabad', city: 'Islamabad', img: isbdHotel, duration: '3 Nights', rating: '4.8 (310 reviews)', price: '18000' },
        { name: 'Swissotel Istanbul', city: 'Istanbul', img: istanbulHotel, duration: '3 Nights', rating: '4.7 (540 reviews)', price: '21000' },
        { name: 'Ankara HiltonSA', city: 'Ankara', img: ankaraHotel, duration: '2 Nights', rating: '4.4 (250 reviews)', price: '17000' },
        { name: 'Mövenpick Karachi', city: 'Karachi', img: karachiHotel, duration: '2 Nights', rating: '4.2 (190 reviews)', price: '12000' },
        { name: 'Fort Continental Peshawar', city: 'Peshawar', img: peshawarHotel, duration: '1 Night', rating: '4.0 (80 reviews)', price: '9500' },
        { name: 'Akra Hotel Antalya', city: 'Antalya', img: antalyaHotel, duration: '4 Nights', rating: '4.6 (430 reviews)', price: '19500' }
    ]

    return (
        <section className='w-full py-12 md:py-24 lg:pt-5 px-6 md:px-0'>
            <div className='max-w-7xl mx-auto px-4 md:px-6'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif'>Explore Hotels</h2>
                <hr className='text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10' />
                <Slider {...settings}>
                    {hotelList.map((hotel, index) => (
                        <div key={index}>
                            <div className='overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-5 mr-5'>
                                <img
                                    src={hotel.img}
                                    alt={hotel.name}
                                    className='object-cover w-full h-48 hover:scale-110 transition-all'
                                />
                                <div className='p-4'>
                                    <p className='text-gray-500 flex items-center gap-1 text-sm mb-1'>
                                        <Clock width={15} /> {hotel.duration}
                                    </p>
                                    <h3 className='text-xl font-bold mb-1'>{hotel.name}</h3>
                                    <p className='text-gray-600 mb-1'>Located in {hotel.city}</p>
                                    <p className='flex gap-1 items-center'>
                                        <Star width={20} fill='yellow' /> {hotel.rating}
                                    </p>
                                    <div className='flex gap-4 justify-center mt-3'>
                                        <button className='px-3 py-2 bg-yellow-600 rounded-md text-white'>
                                            ${hotel.price}
                                        </button>
                                        <button className='px-3 py-2 bg-black rounded-md text-white'>
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    )
}

export default ExploreHotels
