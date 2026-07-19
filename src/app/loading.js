import React from 'react';

const RootLoading = () => {
    const skeletonCards = Array.from({ length: 8 });

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border/60 pb-8 animate-pulse">
                    <div>
                        <div className="h-6 w-36 bg-muted rounded-full mb-3"></div>
                        <div className="h-12 w-80 bg-muted rounded-xl"></div>
                    </div>
                    <div className="space-y-2 max-w-md w-full">
                        <div className="h-4 w-full bg-muted rounded-md"></div>
                        <div className="h-4 w-5/6 bg-muted rounded-md"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {skeletonCards.map((_, index) => (
                        <div 
                            key={index} 
                            className="w-full h-[470px] bg-card rounded-[24px] border border-border/80 overflow-hidden flex flex-col animate-pulse"
                        >
                            <div className="relative h-52 w-full bg-muted flex-shrink-0">
                                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                                    <div className="h-5 w-14 bg-muted-foreground/20 rounded-md"></div>
                                    <div className="h-5 w-14 bg-muted-foreground/20 rounded-md"></div>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="h-4 w-24 bg-muted rounded-md"></div>
                                        <div className="h-5 w-10 bg-muted rounded-lg"></div>
                                    </div>
                                    
                                    <div className="h-7 w-3/4 bg-muted rounded-md mt-1"></div>
                                    
                                    <div className="space-y-2 mt-2">
                                        <div className="h-3.5 w-full bg-muted rounded-md"></div>
                                        <div className="h-3.5 w-full bg-muted rounded-md"></div>
                                        <div className="h-3.5 w-4/5 bg-muted rounded-md"></div>
                                    </div>
                                </div>

                                <div className="pt-4 mt-auto flex flex-col gap-3 flex-shrink-0">
                                    <div className="flex items-center justify-between border border-border/30 bg-muted/40 px-3 py-2 rounded-xl">
                                        <div className="h-3 w-20 bg-muted rounded-md"></div>
                                        <div className="h-3 w-12 bg-muted rounded-md"></div>
                                    </div>
                                    <div className="h-11 w-full bg-muted rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RootLoading;