import {
    Brain,
    Heart,
    Zap,
    Users,
    Calendar,
    Award,
    ArrowRight,
    ShieldCheck,
    Smile,
    Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const HomeSections = () => {
    const pillars = [
        {
            icon: Brain,
            title: "Mental Conscious",
            description: "Awaken your higher mind through mindfulness, meditation, and mental awareness workshops.",
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            border: "border-amber-400/20",
            gradient: "from-amber-300 to-yellow-200",
        },
        {
            icon: Zap,
            title: "Physical Vitality",
            description: "Treat your body as a temple with yoga, clean nutrition, and energetic sports.",
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20",
            gradient: "from-blue-400 to-cyan-300",
        },
        {
            icon: Music,
            title: "Divine Soul & Song",
            description: "Connect to the divine through 'Naad Yoga', Kirtans, and singing God's song to uplift the spirit.",
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20",
            gradient: "from-purple-500 to-pink-500",
        },
    ];

    const features = [
        {
            icon: Users,
            title: "Vibrant Community",
            text: "Join 500+ active members starting their wellness journey.",
        },
        {
            icon: Calendar,
            title: "Weekly Events",
            text: "From yoga sessions to e-sports, there's always something on.",
        },
        {
            icon: ShieldCheck,
            title: "Safe Space",
            text: "A judgment-free zone to explore, grow, and be yourself.",
        },
        {
            icon: Award,
            title: "Expert Guidance",
            text: "Workshops led by trusted professionals and mentors.",
        },
    ];

    const faqSections = [
        {
            title: "Mental Conscious",
            questions: [
                {
                    q: "How can I manage exam stress?",
                    a: "We offer dedicated 'Mental Conscious' workshops that focus on practical techniques like Box Breathing, Pomodoro study methods, and mindfulness. Our meditation sessions before major exams are specifically designed to lower cortisol levels and enhance memory retention."
                },
                {
                    q: "Is counseling available for students?",
                    a: "Yes, SVNIT provides professional counseling services. The Wellness Club acts as a bridge—we can guide you to these confidential resources or connect you with our 'Peer Support Group', a safe space where senior students listen and share their own experiences."
                },
                {
                    q: "What is the best time for meditation?",
                    a: "While meditation is beneficial anytime, we strongly recommend the 'Brahma Muhurta' (approx. 4:30 AM - 6:00 AM) for deep spiritual connection, or the 'Sandhya' time (sunset) to release the day's stress. Our group sessions typically run at 6:00 AM and 7:00 PM to align with these natural rhythms."
                },
                {
                    q: "How do I deal with homesickness?",
                    a: "Homesickness is natural, and the best cure is community. Our club organizes 'Family Night' events, group dinners, and interactive games specifically to help you build a new family here on campus. You are never alone at SVNIT."
                },
                {
                    q: "Can I learn mindfulness even if I can't focus?",
                    a: "Absolutely. Mindfulness is a skill, not a talent. We start with 'Guided Object Focus' (Trataka) and breath awareness exercises that last just 2-3 minutes. Over time, with consistent practice, you'll find your ability to concentrate improves significantly in both studies and life."
                }
            ]
        },
        {
            title: "Physical Vitality & Sports",
            questions: [
                {
                    q: "Do I need to bring my own Yoga mat?",
                    a: "We have a stock of 50+ fresh yoga mats available for all participants at the Student Activity Center (SAC). However, for hygiene and energy reasons, we encourage regular members to eventually invest in their own personal mat."
                },
                {
                    q: "What sports facilities are available?",
                    a: "SVNIT boasts world-class facilities including a full-sized cricket ground, synthetic tennis courts, badminton halls, a gymnasium, and volleyball courts. As a Wellness Club member, you get priority access during our organized group sports hours."
                },
                {
                    q: "Are there separate sessions for beginners?",
                    a: "Yes! We believe everyone starts somewhere. We host 'Rookie Camps' for cricket, football, and badminton where mentors teach the basics of the game, rules, and techniques without the pressure of competition."
                },
                {
                    q: "How can I participate in tournaments?",
                    a: "We host the 'Wellness Cup' once a semester. Registration opens 2 weeks in advance on our website and Discord. You can register as a team or as an individual player (we'll assign you to a squad!). Keep an eye on the 'Programs' tab."
                },
                {
                    q: "Do you offer nutrition advice?",
                    a: "Physical vitality isn't just exercise; it's fuel. We organize monthly workshops with nutritionists who teach 'Hostel Hacks'—how to eat healthy within the mess menu, easy dorm-room snacks, and hydration strategies for peak academic performance."
                }
            ]
        },
        {
            title: "Health & Membership",
            questions: [
                {
                    q: "Is membership really free?",
                    a: "Yes! The Wellness Club is fully funded by the institute's student welfare fund. All events, workshops, health camps, and regular sessions are completely free of charge for all SVNIT students, faculty, and staff members."
                },
                {
                    q: "How often are health checkups organized?",
                    a: "We conduct 'Mega Health Camps' once every semester. These comprehensive camps include Eye Checkups (Vision & Glaucoma), Dental Screening, BMI analysis, and General Physician consultations, typically in collaboration with Sunshine Global or Civil Hospital."
                },
                {
                    q: "Is blood donation safe?",
                    a: "Completely. We partner with Red Cross and government-certified blood banks who follow strict sterile protocols. Every donor undergoes a preliminary hemoglobin and weight check to ensure their own safety before donating."
                },
                {
                    q: "How do I join the Wellness Club?",
                    a: "There is no formal application process for general members. Simply show up! Attend any morning Yoga session or evening Kirtan. To stay updated, click the 'Join Community' button to enter our WhatsApp announcement group."
                },
                {
                    q: "Can I get advice on sleep cycles?",
                    a: "Sleep is the foundation of mental health. We teach 'Sleep Hygiene' protocols—limiting blue light, Nidra Yoga techniques, and establishing circadian rhythms—to help you get restorative rest even during busy exam weeks."
                }
            ]
        },
        {
            title: "Divine Soul & Song",
            questions: [
                {
                    q: "What is 'Naad Yoga'?",
                    a: "Naad Yoga is the ancient science of sound vibration. By listening to specific frequencies or chanting primal sounds (like OM), we tune our body's internal rhythm. It helps reduce anxiety and deeply relaxes the nervous system beyond what normal sleep can do."
                },
                {
                    q: "Is the club religious?",
                    a: "No, we are spiritual and universal. While we draw wisdom from ancient Indian traditions (like Vedas or Kirtan), our practices are secular and open to everyone. We celebrate the 'Divine' as the universal positive energy that connects us all, regardless of faith."
                },
                {
                    q: "What happens at 'Divine Kirtan Night'?",
                    a: "It's a magical evening of music and unity. Students gather with instruments (drums, cymbals, guitars) to sing simple, uplifting mantras. It’s not a performance; it’s a collective release of emotion that leaves you feeling incredibly light and joyful."
                },
                {
                    q: "Can I join if I can't sing?",
                    a: "Your voice is perfect just as it is. In Kirtan, we sing with our hearts, not our vocal cords. The collective volume of 50+ students singing together creates a powerful energy where individual pitch doesn't matter—only your participation does."
                },
                {
                    q: "How does spirituality help in engineering?",
                    a: "Engineering requires focus, resilience, and problem-solving. Spirituality cultivates a calm mind ('Sthita Prajna') that remains stable under pressure. Many top scientists and innovators practice spirituality to access deeper levels of intuition and creativity."
                }
            ]
        }
    ];

    return (
        <>
            {/* Pillars Section */}
            <section className="py-24 relative bg-[#0f172a] overflow-hidden">
                {/* Subtle Background Elements */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute -left-20 top-40 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px]" />
                <div className="absolute -right-20 bottom-40 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-serif text-white">
                            The Three Pillars of <span className="text-emerald-400 italic">Wellness</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
                            We believe in a holistic approach. It’s not just about one aspect; it’s about the harmony of all three.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {pillars.map((pillar, index) => (
                            <div
                                key={index}
                                className={`p-8 rounded-[2rem] border ${pillar.border} ${pillar.bg} backdrop-blur-sm hover:translate-y-[-5px] transition-all duration-300 group`}
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                                    <pillar.icon className="w-7 h-7 text-black/80" />
                                </div>
                                <h3 className={`text-2xl font-serif mb-4 text-white`}>{pillar.title}</h3>
                                <p className="text-slate-300 leading-relaxed font-light">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Join / Community Section */}
            <section className="py-24 relative bg-[#0b1120]">
                {/* ... existing Why Join content ... */}
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* ... existing Left Content ... */}
                        <div className="space-y-8">
                            {/* ... */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <Smile className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Why Join Us?</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                                More Than Just a <br /> <span className="text-blue-400">Student Club</span>
                            </h2>

                            <p className="text-slate-400 text-lg font-light leading-relaxed">
                                College life can be overwhelming. Wellness Club SVNIT is your sanctuary—a place to pause, breathe, and find your rhythm again alongside friends who care.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 pt-4">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                            <feature.icon className="w-5 h-5 text-slate-200" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                                            <p className="text-slate-500 text-sm">{feature.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content - CTA Card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-blue-600/20 blur-2xl rounded-3xl" />
                            <div className="relative bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] text-center space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-serif text-white">Ready to Transform?</h3>
                                    <p className="text-slate-400">First month is all about exploration. Dive in.</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Button className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 border-0">
                                        Join the Community
                                    </Button>
                                    <p className="text-xs text-slate-500">
                                        Free for all SVNIT students • No prior experience needed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 relative overflow-hidden bg-[url('/faq_bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
                <div className="absolute inset-0 bg-black/85 z-0" /> {/* Dark Overlay */}

                <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-300 font-light">Everything you need to know about the club.</p>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqSections.map((section, sectionIdx) => (
                            <AccordionItem
                                key={sectionIdx}
                                value={`section-${sectionIdx}`}
                                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-2 data-[state=open]:bg-black/60 transition-all hover:bg-black/50"
                            >
                                <AccordionTrigger className="text-xl font-serif text-amber-400 hover:text-amber-300 hover:no-underline">
                                    {section.title}
                                </AccordionTrigger>
                                <AccordionContent className="pt-4">
                                    {/* Inner Accordion for Questions */}
                                    <Accordion type="single" collapsible className="w-full space-y-3">
                                        {section.questions.map((faq, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={`item-${sectionIdx}-${index}`}
                                                className="bg-white/5 border border-white/5 rounded-xl px-4 last:border-0 hover:bg-white/10 transition-colors"
                                            >
                                                <AccordionTrigger className="text-white hover:no-underline hover:text-blue-300 text-left transition-colors text-base font-sans">
                                                    {faq.q}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-slate-200 leading-relaxed font-light">
                                                    {faq.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </>
    );
};

export default HomeSections;
