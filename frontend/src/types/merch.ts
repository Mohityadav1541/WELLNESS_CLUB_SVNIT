export interface MerchItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: 'T-Shirt' | 'Hoodie' | 'Cap' | 'Accessory' | 'Other';
    sizes: string[];
    colors: string[];
    image: string;
    isActive: boolean;
    createdAt?: string;
}

export interface MerchOrder {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        admissionNumber?: string;
        whatsappNumber?: string;
    };
    merch: {
        _id: string;
        name: string;
        price: number;
        image?: string;
    };
    size: string;
    quantity: number;
    totalAmount: number;
    status: 'Pending' | 'Paid' | 'Delivered' | 'Cancelled';
    createdAt: string;
}
