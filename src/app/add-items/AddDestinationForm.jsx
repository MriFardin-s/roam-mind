'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import {
    Form, Fieldset, TextField, Input, Select, Label,
    SelectTrigger, SelectValue, SelectIndicator, SelectPopover,
    ListBox, ListBoxItem, Button
} from "@heroui/react";
import { toast } from "react-hot-toast";
import { addDestination } from "@/lib/action/destinations";

export default function AddDestination() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [mounted, setMounted] = useState(false); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [category, setCategory] = useState("");
    const [region, setRegion] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !isPending && !session) {
            router.push("/auth/signin");
        }
    }, [session, isPending, router, mounted]);

    if (!mounted || isPending || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const title = data.title;
        const location = data.location;
        const shortDescription = data.shortDescription;
        const longDescription = data.longDescription;
        const rating = data.rating;

        const categoryVal = category || "";
        const regionVal = region || "";

        if (!title || !location || !shortDescription || !longDescription || !rating || !categoryVal || !regionVal || !selectedImage) {
            toast.error("Please fill in all fields, descriptions, and select an image", {
                style: {
                    background: 'var(--color-card)',
                    color: 'hsl(0 84.2% 60.2%)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '14px',
                    fontWeight: '600'
                }
            });
            setIsSubmitting(false);
            return;
        }

        try {
            const imgFormData = new FormData();
            imgFormData.append('image', selectedImage);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                method: 'POST',
                body: imgFormData
            });

            const result = await response.json();

            if (!result.success) {
                toast.error("Failed to upload image to ImgBB.");
                setIsSubmitting(false);
                return;
            }

            const uploadedImageUrl = result.data.url;

            const newDestinationData = {
                title,
                location,
                shortDescription,
                longDescription,
                rating: Number(rating),
                category: categoryVal,
                region: regionVal,
                image: uploadedImageUrl,
                status: "pending",
                user: {
                    name: session?.user?.name,
                    email: session?.user?.email,
                    id: session?.user?.id,
                    role: session?.user?.role || "user"
                }
            };

            const responseData = await addDestination(newDestinationData);

            if (responseData) {
                toast.success("Destination added successfully!");
                router.push("/explore");
            } else {
                throw new Error("Backend operation failed");
            }

        } catch (error) {
            console.error("Submission error details:", error);
            toast.error("Failed to add destination. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getSelectionLabel = (state, placeholder) => {
        if (!state || state.size === 0) return placeholder;
        const val = Array.from(state)[0].toString();
        return val.charAt(0).toUpperCase() + val.slice(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-3xl mx-auto bg-card text-card-foreground rounded-2xl border border-border/60 p-6 sm:p-10 shadow-xl shadow-muted/20 backdrop-blur-sm">

                <div className="mb-10 text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex flex-col sm:flex-row sm:items-center gap-2">
                        <span>Add New</span>
                        <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent uppercase font-black">
                            Destination
                        </span>
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Share a new breathtaking travel spot with the world.
                    </p>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-6">
                    <Fieldset className="space-y-6 w-full">

                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold text-foreground">Destination Image</Label>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {!imagePreview ? (
                                <div
                                    onClick={triggerFileSelect}
                                    className="w-full min-h-[160px] border-2 border-dashed border-muted-foreground/30 hover:border-primary bg-muted/20 hover:bg-muted/40 rounded-xl flex flex-col items-center justify-center p-6 gap-2 transition-all cursor-pointer group"
                                >
                                    <div className="p-3 bg-background rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary">
                                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                            <circle cx="9" cy="9" r="2" />
                                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-foreground">Click to upload image</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Supports PNG, JPG or WEBP</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full h-[220px] border border-border rounded-xl overflow-hidden bg-muted group">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                                            className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer flex items-center gap-2 font-medium text-sm"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            Remove Image
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-foreground">Destination Name</Label>
                                <TextField aria-label="Destination Name">
                                    <Input name="title" placeholder="e.g., Cox's Bazar" className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition" />
                                </TextField>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-foreground">Detailed Location</Label>
                                <TextField aria-label="Detailed Location">
                                    <Input name="location" placeholder="e.g., Cox's Bazar, Bangladesh" className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition" />
                                </TextField>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-semibold text-foreground">Short Description</Label>
                                <span className="text-xs text-muted-foreground/70">Catchy overview (1-2 sentences)</span>
                            </div>
                            <textarea
                                name="shortDescription"
                                rows={2}
                                placeholder="A brief, engaging summary of the destination to grab attention..."
                                className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground/70 transition resize-none leading-relaxed"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <Label className="text-sm font-semibold text-foreground">Detailed Description</Label>
                                <span className="text-xs text-muted-foreground/70">Full insights</span>
                            </div>
                            <textarea
                                name="longDescription"
                                rows={5}
                                placeholder="Tell people about the profound beauty of this place, the perfect time to visit, available activities, culture, and special attractions..."
                                className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground/70 transition resize-none leading-relaxed"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-foreground">Rating (1 to 5)</Label>
                                <TextField aria-label="Rating">
                                    <Input name="rating" type="number" step="0.1" min="1" max="5" placeholder="4.8" className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition" />
                                </TextField>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-foreground">Category Type</Label>
                                <Select
                                    aria-label="Category Type"
                                    name="category"
                                    selectedKeys={category}
                                    onSelectionChange={setCategory}
                                    className="w-full bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                                >
                                    <SelectTrigger className="w-full px-4 py-3 flex justify-between items-center text-foreground hover:bg-muted/30 rounded-xl transition">
                                        <SelectValue>{getSelectionLabel(category, "Select category")}</SelectValue>
                                        <SelectIndicator />
                                    </SelectTrigger>
                                    <SelectPopover className="bg-popover border border-border rounded-xl shadow-xl mt-1 overflow-hidden min-w-[200px]">
                                        <ListBox className="py-1">
                                            <ListBoxItem id="beach" textValue="Beach" className="px-4 py-2.5 hover:bg-primary hover:text-primary-foreground text-popover-foreground cursor-pointer transition-colors">Beach</ListBoxItem>
                                            <ListBoxItem id="adventure" textValue="Adventure" className="px-4 py-2.5 hover:bg-primary hover:text-primary-foreground text-popover-foreground cursor-pointer transition-colors">Adventure</ListBoxItem>
                                            <ListBoxItem id="nature" textValue="Nature" className="px-4 py-2.5 hover:bg-primary hover:text-primary-foreground text-popover-foreground cursor-pointer transition-colors">Nature</ListBoxItem>
                                            <ListBoxItem id="cultural" textValue="Cultural" className="px-4 py-2.5 hover:bg-primary hover:text-primary-foreground text-popover-foreground cursor-pointer transition-colors">Cultural</ListBoxItem>
                                        </ListBox>
                                    </SelectPopover>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-foreground">Region</Label>
                                <Select
                                    aria-label="Region"
                                    name="region"
                                    selectedKeys={region}
                                    onSelectionChange={setRegion}
                                    className="w-full bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                                >
                                    <SelectTrigger className="w-full px-4 py-3 flex justify-between items-center text-foreground hover:bg-muted/30 rounded-xl transition">
                                        <SelectValue>{getSelectionLabel(region, "Select region")}</SelectValue>
                                        <SelectIndicator />
                                    </SelectTrigger>
                                    <SelectPopover className="bg-popover border border-border rounded-xl shadow-xl mt-1 overflow-hidden min-w-[200px]">
                                        <ListBox className="py-1">
                                            <ListBoxItem id="domestic" textValue="Bangladesh" className="px-4 py-2.5 hover:bg-primary hover:text-primary-foreground text-popover-foreground cursor-pointer transition-colors">Bangladesh</ListBoxItem>
                                            <ListBoxItem id="international" textValue="International" className="px-4 py-2.5 hover:bg-primary hover:text-primary-foreground text-popover-foreground cursor-pointer transition-colors">International</ListBoxItem>
                                        </ListBox>
                                    </SelectPopover>
                                </Select>
                            </div>
                        </div>
                    </Fieldset>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            isDisabled={isSubmitting}
                            className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-xl shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                    <span>Uploading & Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14" /><path d="M12 5v14" />
                                    </svg>
                                    <span>Publish Destination</span>
                                </>
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}