import { ShieldCheck, BadgeDollarSign, Timer, Headset } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-red-500" />,
    title: 'Trusted & Secure',
    desc: 'We ensure your data is protected and your experience is safe and reliable.',
  },
  {
    icon: <BadgeDollarSign className="w-10 h-10 text-red-500" />,
    title: 'Best Price Guarantee',
    desc: 'We offer the most competitive prices on all destinations and services.',
  },
  {
    icon: <Timer className="w-10 h-10 text-red-500" />,
    title: 'Easy & Quick Booking',
    desc: 'Book your travel or stay within minutes with our streamlined platform.',
  },
  {
    icon: <Headset className="w-10 h-10 text-red-500" />,
    title: '24/7 Support',
    desc: 'Our dedicated support team is available anytime, day or night.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 pt-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
          <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-3 font-serif'>Why Choose Us?</h2>
       <hr className='text-red-500 w-[100px] bg-yellow-500 mx-auto h-1 mb-10' />
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">We offer unmatched service, unbeatable prices, and top-tier customer support to make your experience seamless.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
