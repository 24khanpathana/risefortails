import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    FaHeartbeat, FaHandHoldingHeart, FaUsers, FaPaw, 
    FaPhoneAlt, FaSyringe, FaShieldAlt, FaHome, 
    FaStethoscope, FaUtensils, FaUserMd, FaTree, FaCheckCircle
} from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [contactData, setContactData] = useState({ name: '', email: '', phone: '', subject: 'General', message: '' });
    const [contactMsg, setContactMsg] = useState('');

    // Fetch animals for the "Meet Our Pets" section
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/animals`)
            .then(res => setPets(res.data.slice(0, 4))) // Get max 4 pets for home page
            .catch(err => console.log(err));
    },[]);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            // Reusing the feedback endpoint to trigger the admin email
            await axios.post(`${process.env.REACT_APP_API_URL}/api/feedback`, {
                name: contactData.name,
                email: contactData.email,
                feedback: `Subject: ${contactData.subject} | Phone: ${contactData.phone} | Message: ${contactData.message}`
            });
            setContactMsg('Thank You! We have received your message and will get back to you soon.');
            setContactData({ name: '', email: '', phone: '', subject: 'General', message: '' });
        } catch (error) {
            setContactMsg('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-full font-sans text-gray-800 bg-white">
            
            {/* 1. HERO SECTION (Video Background remains unchanged, layout adapted to left) */}
            <div className="relative h-[90vh] flex items-center justify-start overflow-hidden">
                <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
                    <source src="/BG.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                
                <div className="relative z-20 px-6 md:px-16 lg:px-24 max-w-4xl text-white pt-20">
                    <p className="text-orange-400 font-semibold tracking-widest text-sm md:text-base uppercase mb-4">
                        Compassion. Care. Coexistence.
                    </p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                        Care They Need, <br/><span className="text-orange-400">Love They Deserve</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed max-w-2xl">
                        Rise for Tails is a dedicated animal rescue, treatment, and rehabilitation initiative working to ensure dignity, medical care, and humane population management for community animals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <button onClick={() => navigate('/book-a-slot')} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-full transition shadow-lg">
                            ♡ Book-slot
                        </button>
                        <button onClick={() => navigate('/volunteer')} className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/50 text-white font-semibold py-4 px-8 rounded-full transition shadow-lg">
                            <FaUsers className="inline mr-2"/> Volunteer With Us
                        </button>
                    </div>

                    {/* Animal Emergency Banner */}
                    <div className="inline-flex items-center bg-emerald-800/90 backdrop-blur-sm rounded-xl p-4 border border-emerald-700/50 shadow-xl cursor-pointer hover:bg-emerald-700 transition" onClick={() => navigate('/contact')}>
                        <div className="bg-green-500 p-3 rounded-full mr-4">
                            <FaPhoneAlt className="text-white"/>
                        </div>
                        <div>
                            <p className="text-xs text-emerald-200 uppercase font-bold">Animal Emergency?</p>
                            <p className="font-semibold">Report Now - We're Here to Help</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. WHY ADOPT FROM OUR SHELTER */}
            <section className="bg-emerald-800 text-white py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-serif font-bold mb-4">Why Adopt From Our Shelter</h2>
                    <p className="text-emerald-200 mb-16 text-lg">We rescue cats, dogs, and large animals and help them find safe, loving homes.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[{icon: FaShieldAlt, t: 'Fully Vaccinated', d: 'All our animals receive complete vaccination'},
                          {icon: FaStethoscope, t: 'Medical Care', d: 'Expert veterinary care and treatment'},
                          {icon: FaHandHoldingHeart, t: 'Ongoing Support', d: 'We support you through the adoption journey'},
                          {icon: FaHome, t: 'Meaningful Impact', d: 'Every adoption changes two lives forever'}].map((item, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <item.icon className="text-5xl text-emerald-400 mb-6" />
                                <h3 className="text-xl font-bold mb-3">{item.t}</h3>
                                <p className="text-emerald-100 text-center leading-relaxed">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. OUR STORY OF COMPASSION */}
            <section className="py-20 px-6 bg-emerald-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000" alt="Rescued Dog" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-serif font-bold text-emerald-900 mb-6">Our Story of Compassion</h2>
                        <div className="text-gray-700 space-y-4 text-lg leading-relaxed mb-8">
                            <p>Rise for Tails is a dedicated animal welfare initiative committed to rescuing, treating, and rehabilitating sick, abused, injured, and abandoned animals.</p>
                            <p>The project emerged during the COVID-19 lockdown when volunteers began feeding stray animals who suddenly lost their food sources. As calls for help increased, incidents like accidents, injuries, and abuse cases made it evident that the city lacked adequate infrastructure for emergency animal care.</p>
                            <p>To address this gap, Rise for Tails established a rescue and rehabilitation centre equipped with a veterinary team, medical care, surgical facilities, and recovery spaces for animals in need.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-emerald-800 p-6 rounded-xl text-white shadow-lg">
                                <h4 className="font-bold text-xl mb-2 text-orange-400">Our Mission</h4>
                                <p className="text-sm">We stand as a voice for the voiceless, working towards peaceful coexistence through rescue, advocacy, education, and unwavering compassion.</p>
                            </div>
                            <div className="bg-emerald-800 p-6 rounded-xl text-white shadow-lg">
                                <h4 className="font-bold text-xl mb-2 text-orange-400">Our Vision</h4>
                                <p className="text-sm">Fostering a world where the silent cries of animals are met with empathy, and compassion guides our every action.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FOUNDER QUOTE */}
            <section className="bg-emerald-700 py-16 px-6 text-center text-white">
                <div className="max-w-3xl mx-auto">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200" alt="Founder" className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-emerald-400 object-cover" />
                    <h3 className="text-3xl font-serif italic mb-6">"Compassion without action is just sentiment"</h3>
                    <p className="font-bold text-lg">Gargi Vairagare, <span className="font-normal text-emerald-200">Founder</span></p>
                    <p className="text-sm text-emerald-100 mt-2">A social entrepreneur and animal welfare advocate who founded RISE at the age of 17.</p>
                </div>
            </section>

            {/* 5. WHAT WE DO */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">Our Services</p>
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">What We Do</h2>
                    <p className="text-gray-600 mb-16 max-w-2xl mx-auto">From rescue to rehabilitation, we provide comprehensive care for animals in need.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        {[{icon: FaHeartbeat, t: 'Rescue & Rehabilitation', d: 'Our rescue team responds to calls involving injured, sick, and abandoned animals.'},
                          {icon: FaPaw, t: 'Large Animal Care', d: 'Care for injured and abandoned large animals such as cows and other livestock.'},
                          {icon: FaSyringe, t: 'Animal Birth Control (ABC)', d: 'Sterilisation is the most humane and effective way to control stray populations.'},
                          {icon: FaUtensils, t: 'Vaccination & Feeding', d: 'Regular vaccination drives help protect animals and communities from rabies.'},
                          {icon: FaHome, t: 'Adoptions', d: 'Animals that recover fully from treatment are made available for adoption into loving homes.'},
                          {icon: FaUsers, t: 'Sahajeevan Awareness', d: 'Our school awareness initiative promotes responsible animal care and rabies awareness.'}].map((item, i) => (
                            <div key={i} className="border border-gray-100 hover:border-emerald-200 rounded-2xl p-8 bg-white shadow-sm hover:shadow-xl transition duration-300">
                                <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                                    <item.icon className="text-2xl text-orange-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.t}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. HOW ADOPTION WORKS */}
            <section className="bg-orange-50 py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">How Adoption Works</h2>
                    <p className="text-gray-600 mb-16">A simple process to find your new best friend</p>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-10 left-[10%] w-[80%] h-1 bg-orange-200 -z-10"></div>
                        
                        {[{num: 1, t: 'Choose a Pet', d: 'Browse profiles of cats and dogs looking for a home'},
                          {num: 2, t: 'Meet Your Match', d: 'Schedule a visit or online meeting with the animal'},
                          {num: 3, t: 'Adoption Application', d: 'Fill out a short form so we can find the best match'},
                          {num: 4, t: 'Take Your Friend Home', d: 'Welcome your new family member and start your journey together'}].map((step) => (
                            <div key={step.num} className="flex flex-col items-center flex-1 mb-8 md:mb-0 px-4">
                                <div className="w-20 h-20 rounded-full bg-orange-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-orange-600/30">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.t}</h3>
                                <p className="text-gray-600 text-sm">{step.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. MEET OUR PETS (Dynamic from DB) */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">Find Your Companion</p>
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Meet Our Pets</h2>
                    <p className="text-gray-600 mb-12">Every pet here is ready to be loved. Give them a chance at a happy life.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-left">
                        {pets.map(pet => (
                            <div key={pet._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col">
                                <img src={pet.imageUrl} alt={pet.name} className="w-full h-64 object-cover" />
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-2xl font-bold text-gray-900">{pet.name}</h3>
                                        <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold">{pet.breed}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">📅 Age: {pet.age}</p>
                                    <p className="text-gray-600 text-sm mb-6 flex-grow">{pet.description.substring(0,80)}...</p>
                                    <button onClick={() => navigate('/adoption')} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition">
                                        Adopt Me
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => navigate('/adoption')} className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-4 px-10 rounded-full transition shadow-lg">
                        View All Available Pets
                    </button>
                </div>
            </section>

            {/* 8. STATS BANNER */}
            <section className="bg-orange-600 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                    <div><h3 className="text-5xl font-bold mb-2">12,000+</h3><p className="text-orange-100">Animals Rescued</p></div>
                    <div><h3 className="text-5xl font-bold mb-2">95%</h3><p className="text-orange-100">Recovery Rate</p></div>
                    <div><h3 className="text-5xl font-bold mb-2">100%</h3><p className="text-orange-100">Commitment</p></div>
                    <div><h3 className="text-5xl font-bold mb-2">300+</h3><p className="text-orange-100">Active Volunteers</p></div>
                </div>
            </section>

            {/* 9. RESCUE STORIES */}
            <section className="py-24 px-6 bg-orange-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-serif font-bold text-center text-gray-900 mb-4">Rescue Stories</h2>
                    <p className="text-center text-gray-600 mb-16">Stories of resilience, hope, and second chances</p>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Story 1 */}
                        <div className="bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80" alt="Milky" className="w-full sm:w-2/5 object-cover" />
                            <div className="p-8 sm:w-3/5">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Milky</h3>
                                <div className="flex gap-2 mb-4">
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Indie Dog</span>
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">7 Months</span>
                                </div>
                                <p className="font-semibold text-emerald-800 mb-2">Survived: Accident & Tick Fever</p>
                                <p className="text-gray-600 text-sm leading-relaxed">Rescued as a month-old puppy with crushed forelimbs, Milky refused to give up. After amputation, she rebounded faster than anyone expected.</p>
                            </div>
                        </div>
                        {/* Story 2 */}
                        <div className="bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80" alt="Sanju" className="w-full sm:w-2/5 object-cover" />
                            <div className="p-8 sm:w-3/5">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sanju</h3>
                                <div className="flex gap-2 mb-4">
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Bull</span>
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">7 Years</span>
                                </div>
                                <p className="font-semibold text-emerald-800 mb-2">Survived: Severe Leg Wound</p>
                                <p className="text-gray-600 text-sm leading-relaxed">An abandoned bull rescued with a severe leg wound. Despite amputation being necessary, we fitted him with a custom prosthetic limb.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. YOU CAN HELP (Split Background Section) */}
            <section className="bg-emerald-900 text-white">
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 relative min-h-[400px]">
                        <img src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=1000&q=80" alt="Help Animals" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-emerald-900/80 p-12 md:p-20 flex flex-col justify-center">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">You Can Help</h2>
                            <p className="text-emerald-100 text-lg leading-relaxed max-w-md">
                                Not ready to adopt? You can still make a difference. Your support helps us provide food, shelter, and medical care for animals in need.
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 bg-white text-gray-900 p-12 md:p-20 flex flex-col justify-center">
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Your contribution directly supports medical care, food, shelter, and rehabilitation for animals who have nowhere else to go. Every rupee makes a difference in an animal's life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button onClick={() => navigate('/donate')} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition text-center">
                                ♡ Donate Now
                            </button>
                            <button onClick={() => navigate('/volunteer')} className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold py-4 px-8 rounded-xl transition text-center">
                                <FaUsers className="inline mr-2"/> Become a Volunteer
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-center divide-x divide-gray-200">
                            <div><h4 className="text-3xl font-bold text-emerald-800 mb-1">3,000</h4><p className="text-xs text-gray-500 uppercase">Daily meals served</p></div>
                            <div><h4 className="text-3xl font-bold text-emerald-800 mb-1">70%</h4><p className="text-xs text-gray-500 uppercase">Regional rescues</p></div>
                            <div><h4 className="text-3xl font-bold text-emerald-800 mb-1">24/7</h4><p className="text-xs text-gray-500 uppercase">Emergency care</p></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. WAYS TO SUPPORT */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-serif font-bold text-center text-gray-900 mb-4">Ways to Support</h2>
                    <p className="text-center text-gray-600 mb-16">Choose how you'd like to make an impact</p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[{icon: FaUtensils, t: "Sponsor a Day's Meal", amt: "₹4,100", d: "Support the feeding of animals at our rescue centre for an entire day."},
                          {icon: FaHeartbeat, t: "Become a Virtual Parent", amt: "Monthly", d: "Virtually adopt a rescued animal by sponsoring their monthly care expenses."},
                          {icon: FaHome, t: "Monthly Expenses", amt: "Any Amount", d: "Help sustain daily operations including food, water, electricity, and medicines."},
                          {icon: FaStethoscope, t: "Medical Treatment", amt: "Any Amount", d: "Contribute towards surgery, medicines, diagnostics, and rehabilitation care."},
                          {icon: FaSyringe, t: "ABC Surgery", amt: "Per Surgery", d: "Support sterilisation surgery, vaccination, and post-operative care."},
                          {icon: FaTree, t: "Seasonal Care", amt: "Seasonal", d: "Help animals stay safe during extreme weather with coolers, heaters, etc."}].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-orange-50 text-orange-600 p-4 rounded-xl"><item.icon size={24}/></div>
                                    <span className="text-emerald-700 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">{item.amt}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.t}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. CSR PARTNERSHIPS */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto bg-emerald-50 rounded-3xl p-12 text-center border border-emerald-100">
                    <FaHandHoldingHeart className="text-5xl text-emerald-700 mx-auto mb-6" />
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">CSR Partnerships</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Corporates can partner with Rise for Tails through CSR initiatives to support rescue operations, infrastructure development, medical facilities, and long-term animal welfare programmes.
                    </p>
                    <button onClick={() => navigate('/contact')} className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-8 rounded-full transition">
                        Partner With Us
                    </button>
                </div>
            </section>

            {/* 13. GET IN TOUCH (Contact Form) */}
            <section className="py-24 px-6 bg-orange-50/50 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">Reach Out</p>
                        <h2 className="text-4xl font-serif font-bold text-gray-900">Get in Touch</h2>
                        <p className="text-gray-600 mt-4">Have questions about adoption, volunteering, or donations? We're happy to help.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                            {contactMsg ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <FaCheckCircle className="text-6xl text-emerald-500 mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                    <p className="text-gray-600">{contactMsg}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input type="text" required value={contactData.name} onChange={e=>setContactData({...contactData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input type="email" required value={contactData.email} onChange={e=>setContactData({...contactData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input type="tel" required value={contactData.phone} onChange={e=>setContactData({...contactData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" placeholder="+91 98765 43210" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                            <select value={contactData.subject} onChange={e=>setContactData({...contactData, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50 text-gray-700">
                                                <option>General Inquiry</option>
                                                <option>Adoption</option>
                                                <option>Donation</option>
                                                <option>Volunteer</option>
                                                <option>Report Emergency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea required rows="4" value={contactData.message} onChange={e=>setContactData({...contactData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none bg-gray-50" placeholder="Tell us how we can help you..."></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition shadow-lg">
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Contact Info & Volunteer Box */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="bg-emerald-50 p-4 rounded-full text-emerald-700"><FaHome size={24}/></div>
                                <div><p className="font-bold text-gray-900 mb-1">Our Location</p><p className="text-gray-600 text-sm leading-relaxed">Rise for Tails Rescue Centre<br/>Nagpur, Maharashtra, India</p></div>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-4">
                                <div className="bg-emerald-50 p-4 rounded-full text-emerald-700"><FaPhoneAlt size={24}/></div>
                                <div><p className="font-bold text-gray-900 mb-1">Phone</p><p className="text-gray-600 text-sm leading-relaxed">Emergency: +91 XXXXX XXXXX<br/>General: +91 XXXXX XXXXX</p></div>
                            </div>
                            
                            <div className="bg-emerald-800 p-8 rounded-3xl shadow-lg text-white mt-8">
                                <h3 className="text-xl font-bold mb-3">Want to Volunteer?</h3>
                                <p className="text-emerald-100 text-sm mb-6 leading-relaxed">Join our team of dedicated volunteers. Help with feeding, rescue operations, adoption drives, social media, and more!</p>
                                <button onClick={() => navigate('/volunteer')} className="w-full bg-white text-emerald-900 font-bold py-3 rounded-xl hover:bg-emerald-50 transition">
                                    Apply to Volunteer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;