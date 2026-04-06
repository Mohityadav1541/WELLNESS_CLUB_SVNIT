import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "../utils/api";

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventTitle: string;
    eventId: string | number | null;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
    isOpen,
    onClose,
    eventTitle,
    eventId,
}) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        admissionNumber: "",
        whatsapp: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/registrations', {
                ...formData,
                eventId,
                eventTitle
            });

            toast.success("Registration Successful!", {
                description: `You have successfully registered for ${eventTitle}.`,
            });
            onClose();
            setFormData({ name: "", email: "", admissionNumber: "", whatsapp: "" });
        } catch (error: any) {
            console.error("Registration failed", error);
            const errorMessage = error.response?.data?.message || "Please try again later.";
            toast.error("Registration Failed", {
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Register for Event</DialogTitle>
                    <DialogDescription>
                        {eventTitle}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="admissionNumber">Admission Number</Label>
                        <Input
                            id="admissionNumber"
                            name="admissionNumber"
                            placeholder="e.g., U21CS001"
                            required
                            value={formData.admissionNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input
                            id="whatsapp"
                            name="whatsapp"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            required
                            value={formData.whatsapp}
                            onChange={handleChange}
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="hero" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Registering...
                                </>
                            ) : (
                                "Confirm Registration"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrationModal;
