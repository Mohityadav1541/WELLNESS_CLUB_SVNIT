export interface Event {
    _id: string; // MongoDB ID
    id?: number; // Legacy ID support if needed
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: string;
    image: string;
    tags: string[];
    status: 'upcoming' | 'ongoing' | 'closed';
    registrationLimit: number;
    registeredCount: number;
    isRegistrationOpen?: boolean;
}
