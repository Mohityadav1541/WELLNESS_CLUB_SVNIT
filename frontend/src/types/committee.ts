export interface CommitteeMember {
    _id: string; // The subdocument ID in the members array
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        admissionNumber?: string;
        whatsappNumber?: string;
    };
    role: 'Head' | 'Co-Head' | 'Member';
    joinedAt: string;
}

export interface Committee {
    _id: string;
    name: string;
    description: string;
    members: CommitteeMember[];
    createdAt: string;
}

export interface CreateCommitteeData {
    name: string;
    description: string;
}

export interface UpdateCommitteeData {
    name?: string;
    description?: string;
}
