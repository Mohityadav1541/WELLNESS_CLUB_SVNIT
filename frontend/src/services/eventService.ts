import api from '../utils/api';

export interface Event {
    _id: string;
    id?: number; // legacy support
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    tags: string[];
    images: string[];
    featured?: boolean;
    status: 'upcoming' | 'ongoing' | 'closed';
    attendees?: number;
    prizePool?: string;
    contact?: string;
    games?: string[];
    artists?: string[];
    partners?: string[];
}

// Default Events Data (Fallback)
const defaultEvents: Event[] = [
    {
        _id: "1",
        title: "Morning Yoga & Meditation",
        date: "2024-03-15",
        time: "6:00 AM - 7:30 AM",
        location: "SAC Gardens",
        description: "Start your day with mindfulness. Join us for a rejuvenating session of Hatha Yoga followed by guided meditation. Suitable for all beginners and advanced practitioners. Mats will be provided.",
        tags: ["Yoga", "Meditation", "Wellness"],
        images: ["https://images.unsplash.com/photo-1544367563-121910aace75?q=80&w=1000&auto=format&fit=crop"],
        status: "upcoming",
        attendees: 45,
        contact: "wellness@svnit.ac.in"
    },
    {
        _id: "2",
        title: "eSports Tournament - Gaming for Wellness",
        date: "2024-03-20",
        time: "2:00 PM - 8:00 PM",
        location: "Computer Center",
        description: "Competitive gaming meets mental resilience. Participate in our BGMI and Valorant tournament while learning about focus, reaction time, and managing competitive stress.",
        tags: ["eSports", "Gaming", "Competition"],
        images: ["https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop"],
        status: "upcoming",
        prizePool: "₹10,000",
        games: ["BGMI", "Valorant", "FIFA"],
        attendees: 120
    },
    {
        _id: "3",
        title: "Divine Kirtan Night",
        date: "2024-03-25",
        time: "7:00 PM - 9:00 PM",
        location: "Open Air Theatre",
        description: "An evening of soulful music and chant. Experience the power of sound vibration (Naad Yoga) to uplift your spirit and connect with the community.",
        tags: ["Music", "Cultural", "Spiritual"],
        images: ["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"],
        status: "upcoming",
        artists: ["SVNIT Music Club", "Guest Artists"],
        attendees: 200
    },
    {
        _id: "4",
        title: "Mental Health Workshop",
        date: "2024-03-10",
        time: "5:00 PM - 6:30 PM",
        location: "Seminar Hall A",
        description: "Practical strategies for managing academic stress and anxiety. Led by Dr. Sharma, our campus counselor. Learn box breathing and cognitive reframing techniques.",
        tags: ["Education", "Mental Health", "Workshop"],
        images: ["https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop"],
        status: "closed",
        contact: "counseling@svnit.ac.in"
    },
    {
        _id: "5",
        title: "Nutrition & Hostel Hacks",
        date: "2024-04-05",
        time: "6:00 PM - 7:00 PM",
        location: "Mess Hall 1",
        description: "How to eat healthy in a hostel? Learn simple recipes and nutrition hacks to fuel your brain during exam season.",
        tags: ["Nutrition", "Health", "Lifestyle"],
        images: ["https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop"],
        status: "upcoming"
    }
];

export const eventService = {
    // Get all events
    getEvents: async () => {
        try {
            const response = await api.get('/events');
            if (response.data.data && response.data.data.length > 0) {
                return response.data.data;
            }
            return defaultEvents;
        } catch (error) {
            console.error("API Fetch Failed, using defaults", error);
            return defaultEvents;
        }
    },

    // Get single event
    getEventById: async (id: string) => {
        const response = await api.get(`/events/${id}`);
        return response.data.data;
    },

    // Register for an event
    registerForEvent: async (registrationData: any) => {
        const response = await api.post('/registrations', registrationData);
        return response.data;
    },

    // Get my registrations
    getMyRegistrations: async () => {
        const response = await api.get('/registrations/my');
        return response.data.data;
    },

    // Delete event
    deleteEvent: async (id: string) => {
        const response = await api.delete(`/events/${id}`);
        return response.data;
    },

    // Create event
    createEvent: async (eventData: FormData | any) => {
        const response = await api.post('/events', eventData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Update event
    updateEvent: async ({ id, data }: { id: string; data: FormData | any }) => {
        const response = await api.put(`/events/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Get registrations for an event
    getEventRegistrations: async (eventId: string) => {
        const response = await api.get(`/registrations/event/${eventId}`);
        return response.data.data;
    }
};
