export interface Registration {
    _id: string;
    eventId: string;
    eventTitle: string;
    name: string;
    email: string;
    admissionNumber: string;
    whatsapp: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    registrationDate: string;
    attended?: boolean;
}
