import React from 'react'
import lahore from '../assets/images/cities/lahore.jpg'
import isbd from '../assets/images/cities/isbd.jpg'
import karachi from '../assets/images/cities/karachi.jpg'
import Peshawar from '../assets/images/cities/peshawar.jpg'
import istanbul from '../assets/images/cities/istanbul.jpg'    
import Antalya from '../assets/images/cities/antalya.jpg'
import next from '../assets/images/home/next.png'
import back from '../assets/images/home/back.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Clock, Star } from 'lucide-react'
// import '../Components/Css/reactSlick.css'


const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={next} alt='prevArrow' {...props} />
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={back} alt='prevArrow' {...props} />
);

const ExploreCities = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        nextArrow: <SlickArrowLeft />,
        prevArrow: <SlickArrowRight />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
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
    };
    const destinationJson = [
        { name: 'Lahore', img: lahore, time: '2 Days - 4 Nights', star: '3 (12 reviews)', price: '10,000' },
        { name: 'Istanbul', img: istanbul, time: '5 Days - 3 Nights', star: '3 (12 reviews)', price: '10,000' },
        { name: 'Karachi', img: karachi, time: '8 Days - 4 Nights', star: '3 (12 reviews)', price: '10,000' },
        { name: 'Antalya', img: Antalya, time: '5 Days - 4 Nights', star: '3 (12 reviews)', price: '10,000' },
        { name: 'Islamabad', img: isbd, time: '5 Days - 3 Nights', star: '3 (12 reviews)', price: '10,000' },
        { name: 'Peshawar', img: Peshawar, time: '5 Days - 4 Nights', star: '3 (12 reviews)', price: '10,000' },
    ]
    return (
        <>
            <section id="explore-cities" className='w-full py-12 md:py-24 lg:pt-16 px-6 md:px-0'>
                <div className='max-w-7xl mx-auto px-4 md:px-6'>
                    <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif'>Explore Cities</h2>
                    <hr className='text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10' />
                    <div className="slider-container">
                        <Slider {...settings}>
                            {destinationJson.map((destination)=> (
                                <div>
                                    <div className='overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-5 mr-5'>
                                
                                        <div className=''>
                                            <img 
                                            src={destination.img} 
                                            alt={destination.name} 
                                            width={600} 
                                            height={400}
                                            className='object-cover w-full h-48 hover:scale-110 transition-all'
                                            />
                                            <div className='p-4'>
                                                <p className='text-gray-500 flex items-center gap-1 text-sm mb-1'><Clock width={15}/>{destination.time}</p>
                                                <h3 className='text-xl font-bold mb-2'>{destination.name}</h3>
                                                <p className='flex gap-1 items-center'><Star width={20} fill='yellow'/>{destination.star}</p>
                                                <p className='text-gray-600 mb-4 mt-2'>Experience the beauty and culture of {destination.name}</p>
                                                <div className='flex gap-4 justify-center'>
                                                    <button className='px-3 py-2 bg-yellow-600 rounded-md text-white'>${destination.price}</button>
                                                    <button className='px-3 py-2 bg-black rounded-md text-white'>Learn More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ExploreCities
