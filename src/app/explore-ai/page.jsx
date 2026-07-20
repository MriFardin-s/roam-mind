import ChatBox from "./ChatBox";

export default function AskRoamMindPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 min-h-[calc(100vh-80px)] flex flex-col">
            <div className="mb-6 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
                    Ask <span className="text-primary">Roam Mind</span>
                </h1>
                <p className="text-sm text-base-content/70 mt-1">
                    Your personal travel assistant. Ask anything or get guidelines!
                </p>
            </div>

            <div className="flex-1 bg-base-100 rounded-2xl border border-base-content/10 shadow-sm overflow-hidden flex flex-col">
                <ChatBox />
            </div>
        </div>
    );
}