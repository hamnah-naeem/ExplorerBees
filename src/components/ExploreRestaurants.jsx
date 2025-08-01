import React from 'react'
import Slider from "react-slick"
import { Clock, Star } from 'lucide-react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import next from '../assets/next.png'
import back from '../assets/back.png'
import haveli from '../assets/restaurants/haveli-lahore.jpg'
import chalet from '../assets/restaurants/chalet-istanbul.jpg'
import bbqtonight from '../assets/restaurants/bbqtonight-karachi.jpg'
import isbdrest from '../assets/restaurants/isbdrest.jpg'
import zeytin from '../assets/restaurants/zeytin-antalya.png'
const SlickArrowLeft = ({ ...props }) => (
    <img src={back} alt="prevArrow" {...props} />
)

const SlickArrowRight = ({ ...props }) => (
    <img src={next} alt="nextArrow" {...props} />
)

const ExploreRestaurants = () => {
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
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

    const restaurantList = [
        { name: 'Haveli Restaurant', city: 'Lahore', img: haveli, duration: 'Open 5pm - 11pm', rating: '4.6 (1.1k reviews)', price: '1500 Avg' },
        { name: 'Chalet Restaurant', city: 'Istanbul', img: chalet, duration: 'Open 1pm - 1am', rating: '4.8 (2.1k reviews)', price: '4500 Avg' },
        { name: 'BBQ Tonight', city: 'Karachi', img: bbqtonight, duration: 'Open 12pm - 1am', rating: '4.5 (3.4k reviews)', price: '1000 Avg' },
        { name: '1969 Restaurant', city: 'Islamabad', img: isbdrest, duration: 'Open 11am - 11pm', rating: '4.4 (780 reviews)', price: '2000 Avg' },
        { name: 'Zeytin Restaurant', city: 'Antalya', img: zeytin, duration: 'Open 10am - 10pm', rating: '4.3 (550 reviews)', price: '1800 Avg' },
    ]

    return (
        <section className='w-full py-12 md:py-24 lg:pt-5 px-6 md:px-0'>
            <div className='max-w-7xl mx-auto px-4 md:px-6'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif'>Explore Restaurants</h2>
                <hr className='text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10' />
                <Slider {...settings}>
                    {restaurantList.map((restaurant, index) => (
                        <div key={index}>
                            <div className='overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-5 mr-5'>
                                <img
                                    src={restaurant.img}
                                    alt={restaurant.name}
                                    className='object-cover w-full h-48 hover:scale-110 transition-all'
                                />
                                <div className='p-4'>
                                    <p className='text-gray-500 flex items-center gap-1 text-sm mb-1'>
                                        <Clock width={15} /> {restaurant.duration}
                                    </p>
                                    <h3 className='text-xl font-bold mb-1'>{restaurant.name}</h3>
                                    <p className='text-gray-600 mb-1'>Located in {restaurant.city}</p>
                                    <p className='flex gap-1 items-center'>
                                        <Star width={20} fill='yellow' /> {restaurant.rating}
                                    </p>
                                    <div className='flex gap-4 justify-center mt-3'>
                                        <button className='px-3 py-2 bg-yellow-600 rounded-md text-white'>
                                            Rs {restaurant.price}
                                        </button>
                                        <button className='px-3 py-2 bg-black rounded-md text-white'>
                                            Reserve Now
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

export default ExploreRestaurants
