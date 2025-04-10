import { useState, useEffect, useRef, JSX } from "react";
import logo from '../../assets/github-copilot-icon.png';
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import ReactMarkdown from 'react-markdown';
import { BeatLoader } from "react-spinners";
import Templates from "../Templates/Templates";
const automationSteps = [
    {
        id: "initial",
        message: "Welcome to the n8n Copilot! What's your current n8n status?",
        options: [
            { text: "I already have n8n hosted", next: "existing-n8n" },
            { text: "I need to set up n8n", next: "setup-n8n" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },


    {
        id: "setup-n8n",
        message: "Choose your preferred n8n hosting option:",
        options: [
            { text: "Elestio (Recommended for teams)", next: "ask-questions" },
            { text: "n8n Cloud (Easiest setup)", next: "ask-questions" },
            { text: "Self-hosted (Most control)", next: "ask-questions" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },
    {
        id: "existing-n8n",
        message: "What's your goal with automation?",
        options: [
            { text: "Data Enrichment", next: "data-enrichment-workflows" },
            { text: "Content Creation", next: "content-creation-workflows" },
            { text: "Online Marketing", next: "online-marketing-workflows" },
            { text: "Build a custom solution", next: "custom-solution" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },
    {
        id: "data-enrichment-workflows",
        message: "Here are our recommended Data Enrichment templates:",
        options: [
            { text: "LinkedIn Data Enrichment (Waterfall)", filePath: "Agent_workflow__Linkedin_posts_from_telegram.json", next: "linkedin-data-enrichment" },
            { text: "AI Research (Not available in databases)", filePath: "ai-researcher.json", next: "ai-researcher" },
            { text: "Account Research (Not people)", filePath: "account-researcher.json", next: "account-researcher" },
            { text: "I want a custom Data Enrichment workflow ", next: "custom-solution" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },
    {
        id: "content-creation-workflows",
        message: "Here are our recommended Content Creation templates:",
        options: [
            { text: "Newsletter Strategist Agent", filePath: "newsletter-agent.json", next: "newsletter-agent" },
            { text: "LinkedIn Posts Agent", filePath: "linkedin-posts-agent.json", next: "linkedin-posts-agent" },
            { text: "AI-infused SEO", filePath: "ai-seo-agent.json", next: "ai-seo-agent" },
            { text: "I want a custom Content Creation workflow ", next: "custom-solution" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },
    {
        id: "online-marketing-workflows",
        message: "Here are our recommended Online Marketing templates:",
        options: [
            { text: "Analytics", filePath: "analytics-agent.json", next: "analytics-agent" },
            { text: "Demand Generation", filePath: "demand-gen-build.json", next: "demand-gen-build" },
            { text: "Account-based Marketing", filePath: "abm-build.json", next: "abm-build" },
            { text: "I want a custom Online Marketing workflow ", next: "custom-solution" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },
    {
        id: "custom-solution",
        message: "What is your most urgent business need?",
        options: [
            { text: "Upload Example", next: "upload-file" },
            { text: "I will explain my workflow", next: "ask-questions" },

        ]
    },

    // Data Enrichment Workflow Build Steps
    {
        id: "linkedin-data-enrichment",
        message: "LinkedIn Data Enrichment (Waterfall) Workflow Setup:",
        steps: [
            "✅ Paste the copied content in your n8n instance or import the downloaded file",

            "LinkedIn API Connection: Set up LinkedIn authentication",
            "Target Audience Definition: Configure your target criteria",
            "Data Enrichment Nodes: Configure enrichment data points",
            "✅ Step 1: Connect to LinkedIn API (Guide for API access)",
            "✅ Step 2: Set up data filtering parameters",
            "✅ Step 3: Configure waterfall enrichment sequence",
            "✅ Step 4: Set up data storage destination"
        ],
        options: [
            { text: "Lets Build This Wrokflow", next: "ask-questions" }
        ]
    },
    {
        id: "ai-researcher",
        message: "AI Research Workflow Setup:",
        steps: [
            "✅ Paste the copied content in your n8n instance or import the downloaded file",

            "Research Parameters: Define your research scope and questions",
            "AI Provider Selection: <OpenAI> <Anthropic> <Other>",
            "Research Output Format: <Structured> <Narrative> <Mixed>",
            "✅ Step 1: Set up AI provider connections",
            "✅ Step 2: Configure research prompt templates",
            "✅ Step 3: Set up response filtering and validation",
            "✅ Step 4: Configure output formatting and storage"
        ],
        options: [
            { text: "Lets Build This Wrokflow", next: "ask-questions" }
        ]
    },
    {
        id: "account-researcher",
        message: "Account Research Workflow Setup:",
        steps: [
            "✅ Paste the copied content in your n8n instance or import the downloaded file",

            "Target Account List: Upload or API source configuration",
            "Research Parameters: Define key data points to gather",
            "Data Sources: <Company DB> <News API> <Social Media> <Financial Data>",
            "✅ Step 1: Set up account list import mechanism",
            "✅ Step 2: Configure data source connections",
            "✅ Step 3: Set up data aggregation and normalization",
            "✅ Step 4: Configure output format and destination"
        ],
        options: [
            { text: "Lets Build This Wrokflow", next: "ask-questions" }
        ]
    },



    // Content Creation Workflow Build Steps
    {
        id: "newsletter-agent",
        message: "Newsletter Strategist Agent Workflow Setup:",
        steps: [
            "✅ Paste the copied content in your n8n instance or import the downloaded file",

            "Content Sources: <Chat Trigger Input>",
            "AI Services: <OpenAI>/<Google Gemini>",

            "✅ Step 1: Set up OpenAI credentials: Go to platform.openai.com and copy your API key. In n8n, go to Credentials → OpenAI, and paste your key.",
            "✅ Step 2: Open your n8n instance, click Workflows → Import, and paste the full JSON you provided.",
            "✅ Step 3: Click the “Open Chat” button. This is where you’ll send chat messages to start the conversation.",
            "✅ Step 4: Click the “Activate” button in the top right corner so the workflow listens for new chat input.",
            "✅ Step 5: Test It with a Message 'I want to create a newsletter for beginner investors.'",
            "✅ Step 6: Watch the Magic: The workflow will ask smart follow-up questions. Just respond with each answer",
            "✅ Step 7: Once enough info is collected, the assistant will return a full strategy including name, audience, value proposition, monetization plan, and more.",
        ],
        options: [
            { text: "Lets Build This Wrokflow", next: "ask-questions" }
        ]
    },
    {
        id: "linkedin-posts-agent",
        message: "LinkedIn Posts Agent Workflow Setup:",
        steps: [
            "✅ Paste the copied content in your n8n instance or import the downloaded file",

            "Content Strategy: <Thought Leadership> <AI Industry Insights> <Enterprise Solutions>",
            "Post Frequency: <Daily> <Weekly> <Custom Schedule>",
            "Content Generation: AI-powered text and image creation",
            "✅ Step 1: Set up OpenAI credentials and LinkedIn authentication",
            "✅ Step 2: Configure AI posting parameters and persona settings",
            "✅ Step 3: Set up RSS feeds and knowledge sources",
            "✅ Step 4: Configure posting schedule and automated publishing"
        ],
        options: [
            { text: "Lets Build This Wrokflow", next: "ask-questions" }
        ]
    },

    {
        id: "ai-seo-agent",
        message: "AI-infused SEO Workflow Setup:",
        steps: [
            "✅ Paste the copied content in your n8n instance or import the downloaded file",

            "Website Integration: <WordPress> <Custom CMS> <Static Site>",
            "SEO Strategy: <Keywords> <Content Gaps> <Competitive Analysis>",
            "Content Enhancement: <Meta Data> <Full Content> <Schema Markup>",
            "✅ Step 1: Set up website content access",
            "✅ Step 2: Configure SEO analysis parameters",
            "✅ Step 3: Set up AI content enhancement rules",
            "✅ Step 4: Establish implementation workflow and validation"
        ],
        options: [
            { text: "Lets Build This Wrokflow", next: "ask-questions" }
        ]
    },

    // Online Marketing Workflow Build Steps
    {
        id: "analytics-agent",
        message: "Analytics Workflow Setup:",
        steps: [
            "✅ Paste the copied content in your n8n instance or import the downloaded file",

            "Data Sources: <Google Analytics> <CRM> <Marketing Automation> <Custom>",
            "Dashboard Configuration: Define key metrics and visualizations",
            "Reporting Schedule: <Daily> <Weekly> <Monthly> <Custom>",
            "✅ Step 1: Connect data source APIs",
            "✅ Step 2: Configure data transformation rules",
            "✅ Step 3: Set up dashboard layout and components",
            "✅ Step 4: Establish alert thresholds and notification system"
        ],
        options: [
            { text: "Lets Build This Wrokflow", next: "ask-questions" }
        ]
    },
    {
        id: "demand-gen-build",
        message: "Demand Generation Workflow Setup:",
        steps: [
            "✅ Paste the copied content in your n8n instance or import the downloaded file",

            "Target Audience: Define segments and parameters",
            "Campaign Channels: <Email> <Social> <Content> <Paid Media>",
            "Lead Qualification: Define scoring criteria and thresholds",
            "✅ Step 1: Set up audience segmentation rules",
            "✅ Step 2: Configure multi-channel campaign orchestration",
            "✅ Step 3: Establish lead scoring and qualification logic",
            "✅ Step 4: Set up performance tracking and optimization"
        ],
        options: [
            { text: "Lets Build This Wrokflow", next: "ask-questions" }
        ]
    },
    {
        id: "abm-build",
        message: "Account-based Marketing Workflow Setup:",
        steps: [
            "✅ Paste the copied content in your n8n instance or import the downloaded file",

            "Target Account List: Upload or define selection criteria",
            "Account Research: Configure automated intelligence gathering",
            "Personalization Strategy: <Content> <Outreach> <Website> <All>",
            "✅ Step 1: Set up target account identification",
            "✅ Step 2: Configure account research automation",
            "✅ Step 3: Establish personalization logic and templates",
            "✅ Step 4: Set up engagement tracking and orchestration"
        ],
        options: [
            { text: "Lets Build This Wrokflow", next: "ask-questions" }
        ]
    },

    {
        id: "chat-mode",
        message: "Your automation workflow is now configured! How else can I assist you today?",
        options: [
            { text: "Create another automation", next: "initial" },
            { text: "Optimize existing workflow", next: "ask-questions" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },
    {
        id: "ask-questions",
        message: "I'm here to help with any n8n setup, n8n questions and challenges. What would you like to know?",
        // This is the endpoint for free-form conversation with the agent
        chatMode: true
    }
];


type Message = {
    id: string;
    role: "user" | "bot";
    text?: string;
    steps?: string[];
    options?: { text: string; filePath?: string; next: string }[];
};
type ChatSession = {
    id: string;
    label: string;
    messages: Message[];
    completed?: boolean; // Track if guided steps are finished
};
// Copy the file content



interface ComponentProps {
    activeTab: "Tab1" | "Tab2" | "Tab3" | "Tab4";
    activeChatId: string | null;
    chats: ChatSession[];
    setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
    setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
    isToggled: boolean;
    [key: string]: any;
}
// interface TrackingEvent {
//     type: string;
//     data: any;
// }
const ChatSection: React.FC<ComponentProps> = ({ chats, activeChatId, setChats, setActiveChatId, isToggled }) => {
    const activeChat = chats.find(chat => chat.id === activeChatId);
    const [message, setMessage] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [hasScroll, setHasScroll] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isListening, setIsListening] = useState(false);
    async function handleCopyFile(filePath: string, option: string) {
        try {
            const response = await fetch(filePath);
            const data = await response.text(); // Assuming it's JSON text
            await navigator.clipboard.writeText(data);
            // alert("File content copied to clipboard! Please paste it in your n8n instance to get strated.");
            handleUserSelection((activeChatId ?? ""), option, undefined, "Workflow Copied")
        } catch (error) {
            console.error("Failed to copy file:", error);
            alert("Failed to copy file.");
        }
    }

    // Download the file
    function handleDownloadFile(filePath: string, option: string) {
        const link = document.createElement("a");
        link.href = filePath;
        link.download = filePath.split("/").pop() || "download.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handleUserSelection((activeChatId ?? ""), option, undefined, "Workflow Downloaded")
    }
    async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        // ✅ Check if file type is JSON
        if (file.type !== "application/json" && !file.name.endsWith(".json")) {
            alert("❌ Please upload a valid JSON file.");
            return;
        }

        try {
            // 🛜 If valid JSON, continue normally
            if (activeChat) {
                handleUserSelection(activeChat.id, "Example Uploaded", file);
            } else {
                console.error("Active chat is undefined.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("❌ Error uploading file.");
        }
    }

    useEffect(() => {
        const checkScroll = () => {
            if (chatContainerRef.current) {
                setHasScroll(chatContainerRef.current.scrollHeight > chatContainerRef.current.clientHeight);
            }
        };

        checkScroll(); // Check on mount
        window.addEventListener("resize", checkScroll); // Check when window resizes

        return () => window.removeEventListener("resize", checkScroll);
    }, [activeChat?.messages]);
    // const [chatSectionLoaded, setChatSectionLoaded] = useState(false);
    // const [events, setEvents] = useState<TrackingEvent[]>([]);
    // const SCREENSHOT_DELAY = 4000;
    const activeChatIdRef = useRef<string | null>(activeChatId);
    const generateChatId = (): string => {
        return `chat-${Date.now()}`; // Use timestamp for uniqueness
    };

    const generateChatName = (message: string): string => {
        return message.substring(0, 20); // Use the first 20 characters of the message as the name
    };
    async function sendScreenShot() {
        // Ensure there's an active chat
        if (!activeChatIdRef.current) {
            console.error("No active chat selected");
            return;
        }

        //console.log(chats, 'chats');
        //console.log(activeChatIdRef.current, 'activeChatIdRef.current');
        // Get the active chat
        const activeChat = chats.find(chat => chat.id === activeChatIdRef.current);

        const history: {
            role: "user" | "bot";
            text: string | JSX.Element;
            steps?: string[];
            options?: { text: string; next: string }[];
        }[] = activeChat?.messages.slice(-20).map(msg => ({
            role: msg.role,
            text: msg.text ?? "",
            ...(msg.steps ? { steps: msg.steps } : {}), // Include steps only if they exist
            ...(msg.options ? { options: msg.options } : {}) // Include options only if they exist
        })) || [];

        try {
            setIsLoading(true);
            chrome.runtime.sendMessage(
                { type: "CAPTURE_SCREENSHOT" },
                async (response: { screenshot?: string } | undefined) => {
                    // If this is a new chat, assign a proper ID and name
                    if (activeChatIdRef.current === "new-chat") {
                        const newChatId = generateChatId(); // Generate a unique ID
                        const newChatName = generateChatName(`event-${Date.now()}`); // Generate a unique name

                        setChats(prevChats =>
                            prevChats.map(chat =>
                                chat.id === "new-chat"
                                    ? {
                                        ...chat,
                                        id: newChatId,
                                        label: newChatName,
                                        completed: true // Ensure completed is always true
                                    }
                                    : chat
                            )
                        );

                        // Update active chat references
                        setActiveChatId(newChatId);
                        activeChatIdRef.current = newChatId;
                    }

                    try {
                        const res: Response = await fetch("https://n8n.alsoknownas.me/webhook/chat", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                message: "This is Auto Sent Screenshot with DOM Monitoring",
                                screenshot: response?.screenshot || null,
                                history
                            }),
                        });

                        //console.log("Response status:", res.status); // Log the status
                        //console.log("Response OK:", res.ok); // Log if the response is OK

                        if (!res.ok) {
                            if (res.status === 404) {
                                console.error("Webhook not found. Make sure the workflow is active in n8n.");
                            }
                            throw new Error(`Server responded with status ${res.status}`);
                        }

                        const textData: string = await res.text();
                        //console.log("Bot response:", textData); // Log the bot's response

                        // Add bot response to the active chat
                        setChats(prevChats =>
                            prevChats.map(chat =>
                                chat.id === activeChatIdRef.current
                                    ? {
                                        ...chat,
                                        messages: [
                                            ...(chat.messages ?? []), // Ensure messages array exists
                                            { id: `msg-${Date.now()}`, role: "bot", text: textData } // Add a unique ID
                                        ]
                                    }
                                    : chat
                            )
                        );

                    } catch (error: unknown) {
                        console.error("Error fetching bot response:", error); // Log any errors
                        setChats(prevChats =>
                            prevChats.map(chat =>
                                chat.id === activeChatIdRef.current
                                    ? {
                                        ...chat,
                                        messages: [
                                            ...(chat.messages ?? []), // Ensure messages array exists
                                            { id: `msg-${Date.now()}`, role: "bot", text: "Error: Unable to get response from server." }
                                        ]
                                    }
                                    : chat
                            )
                        );

                    } finally {
                        setIsLoading(false); // Stop loading
                    }
                }
            );
        } catch (error: unknown) {
            console.error("Error capturing screenshot:", error);
            setIsLoading(false); // Stop loading
        }
    }
    const SCREENSHOT_DELAY = 3000; // 2 seconds delay

    useEffect(() => {
        let canTakeScreenshot = true; // Prevent multiple screenshots

        const handleMessage = async (message: any) => {
            if (
                // message.source === "n8n-injected" &&
                activeChat?.completed && (message.type === "CLICK" || message.type === "URL_CHANGE" || message.type === "TAB_VISIBILITY")
            ) {
                if (isLoading || !canTakeScreenshot || !isToggled) {
                    return; // Ignore if loading, already taking a screenshot, or isToggled is false
                }

                canTakeScreenshot = false; // Block additional screenshots temporarily

                setTimeout(async () => {
                    await sendScreenShot();
                    canTakeScreenshot = true; // Re-enable screenshots
                }, SCREENSHOT_DELAY);
            }
        };

        // ✅ Add the listener when component mounts or isToggled changes
        chrome.runtime.onMessage.addListener(handleMessage);

        // ✅ Clean up the listener when the component unmounts or isToggled changes
        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage);
        };
    }, [isLoading, isToggled]); // ✅ Re-run effect when isToggled changes
    // Reacts to isLoading changes
    // console.log(chats, 'chats')

    const startNewChat = (): void => {
        const newChat: ChatSession = {
            id: "new-chat",
            label: "new-chat",
            messages: [
                {
                    id: "msg-1",
                    role: "bot",
                    text: chats && chats.length > 0 ? "What's your goal with automation?" : "Welcome to the n8n Copilot! What's your current n8n status?",
                    options: chats && chats.length > 0 ? [
                        { text: "Data Enrichment", next: "data-enrichment-workflows" },
                        { text: "Content Creation", next: "content-creation-workflows" },
                        { text: "Online Marketing", next: "online-marketing-workflows" },
                        { text: "Build a custom solution", next: "custom-solution" },
                        { text: "Chat with Agent", next: "ask-questions" }
                    ] : [
                        { text: "I already have n8n hosted", next: "existing-n8n" },
                        { text: "I need to set up n8n", next: "no-n8n" },
                        { text: "Chat with Agent", next: "ask-questions" }
                    ]
                }
            ],
            completed: false,
        };

        setChats(prevChats => {
            const existingChatIndex = prevChats.findIndex(chat => chat.id === "new-chat");

            if (existingChatIndex !== -1) {
                // If chat exists, replace it
                const updatedChats = [...prevChats];
                updatedChats[existingChatIndex] = newChat;
                return updatedChats;
            } else {
                // If chat does not exist, add new one
                return [...prevChats, newChat];
            }
        });

        setActiveChatId(newChat.id);
    };

    const handleUserSelection = (chatId: string, selectedOption: string, uploadedFile?: File, fileAction?: string) => {
        const currentStep = automationSteps.find(step =>
            step.options?.some(opt => opt.text === selectedOption)
        );
        const nextStepId = currentStep?.options?.find(opt => opt.text === selectedOption)?.next;
        const nextStep = automationSteps.find(step => step.id === nextStepId);
        if (nextStep?.id === "ask-questions" || selectedOption === "Example Uploaded") {
            // 🆕 If file exists, pass it to sendMessage
            sendMessage(selectedOption, uploadedFile);
        } else {
            setChats(prevChats =>
                prevChats.map(chat => {
                    if (chat.id !== chatId) return chat;

                    const updatedMessages = [...chat.messages];

                    updatedMessages.push({
                        id: `msg-${Date.now()}`,
                        role: "user",
                        text: fileAction ? fileAction : selectedOption,
                    });

                    if (nextStep) {
                        const botMessage: Message = {
                            id: `msg-${Date.now()}`,
                            role: "bot",
                            text: nextStep.message,
                            ...(nextStep.steps ? { steps: nextStep.steps } : {}),
                            ...(nextStep.options ? { options: nextStep.options } : {}),
                        };

                        updatedMessages.push(botMessage);
                    }
                    return { ...chat, messages: updatedMessages };
                })
            );
        }
    };






    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeChat?.messages]);

    // useEffect(() => {
    //     if (!chatSectionLoaded && !activeChatId) {
    //         startNewChat();
    //         setChatSectionLoaded(true)
    //     }
    // }, [])


    // Keep the ref in sync with the state
    useEffect(() => {
        activeChatIdRef.current = activeChatId;
    }, [activeChatId]);
    const sendMessage = async (paramMessage: string, file?: File): Promise<void> => {
        if (!message.trim() && !paramMessage.trim()) {
            console.error("Message is empty");
            return;
        }

        // Ensure there's an active chat
        if (!activeChatIdRef.current) {
            console.error("No active chat selected");
            return;
        }

        // Get the active chat
        const activeChat = chats.find(chat => chat.id === activeChatIdRef.current);
        if (!activeChat) {
            console.error("Active chat not found");
            return;
        }

        const history: {
            role: "user" | "bot";
            text: string | JSX.Element;
            steps?: string[];
            options?: { text: string; next: string }[];
        }[] = activeChat?.messages.slice(-20).map(msg => ({
            role: msg.role,
            text: msg.text ?? "",
            ...(msg.steps ? { steps: msg.steps } : {}), // Include steps only if they exist
            ...(msg.options ? { options: msg.options } : {}) // Include options only if they exist
        })) || [];

        try {
            // Start loading
            setIsLoading(true);

            chrome.runtime.sendMessage(
                { type: "CAPTURE_SCREENSHOT" },
                async (response: { screenshot?: string } | undefined) => {
                    // If this is a new chat, assign a proper ID and name
                    if (activeChatIdRef.current === "new-chat") {
                        const newChatId = generateChatId(); // Generate a unique ID
                        const newChatName = generateChatName(`event-${Date.now()}`); // Generate a unique name

                        setChats(prevChats =>
                            prevChats.map(chat =>
                                chat.id === "new-chat"
                                    ? {
                                        ...chat,
                                        id: newChatId,
                                        label: newChatName,
                                        completed: true, // Ensure completed is always true
                                        messages: [
                                            ...(chat.messages ?? []), // Retain any initial messages
                                            { id: `msg-${Date.now()}`, role: "user", text: message?.trim() ? message : paramMessage } // ✅ Add user's first message
                                        ]
                                    }
                                    : chat
                            )
                        );

                        // Update active chat references
                        setActiveChatId(newChatId);
                        activeChatIdRef.current = newChatId;
                    } else {
                        // Add user message to the active chat
                        setChats(prevChats =>
                            prevChats.map(chat =>
                                chat.id === activeChatIdRef.current
                                    ? {
                                        ...chat,
                                        messages: [
                                            ...(chat.messages ?? []), // Ensure messages array exists
                                            { id: `msg-${Date.now()}`, role: "user", text: message?.trim() ? message : paramMessage } // ✅ Add user's message
                                        ]
                                    }
                                    : chat
                            )
                        );
                    }


                    try {
                        const payload: any = {
                            message: message?.trim() ? message : paramMessage,
                            screenshot: response?.screenshot || null,
                            history,
                        };
                        if (file) {
                            payload.fileName = file.name;
                            payload.fileContent = await file.text(); // Read file as string (JSON)
                        }
                        const res: Response = await fetch("https://n8n.alsoknownas.me/webhook/chat", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        });

                        //console.log("Response status:", res.status); // Log the status
                        //console.log("Response OK:", res.ok); // Log if the response is OK

                        if (!res.ok) {
                            if (res.status === 404) {
                                console.error("Webhook not found. Make sure the workflow is active in n8n.");
                            }
                            throw new Error(`Server responded with status ${res.status}`);
                        }

                        const textData: string = await res.text();
                        //console.log("Bot response:", textData); // Log the bot's response

                        // Add bot response to the active chat
                        setChats(prevChats =>
                            prevChats.map(chat =>
                                chat.id === activeChatIdRef.current
                                    ? {
                                        ...chat,
                                        messages: [
                                            ...(chat.messages ?? []), // Ensure messages exist
                                            { id: `msg-${Date.now()}`, role: "bot" as "bot", text: textData } // Explicitly define role as "bot"
                                        ]
                                    }
                                    : chat
                            )
                        );
                    } catch (error: unknown) {
                        console.error("Error fetching bot response:", error); // Log any errors
                        // Add error message to the active chat
                        setChats(prevChats =>
                            prevChats.map(chat =>
                                chat.id === activeChatIdRef.current
                                    ? {
                                        ...chat,
                                        messages: [
                                            ...(chat.messages ?? []), // Ensure messages exist
                                            { id: `msg-${Date.now()}`, role: "bot", text: "Error: Unable to get response from server." } // Add a unique ID
                                        ]
                                    } : chat
                            )
                        )
                    } finally {
                        setIsLoading(false); // Stop loading
                    }
                }
            );
        } catch (error: unknown) {
            console.error("Error capturing screenshot:", error);
            setIsLoading(false); // Stop loading
        }
        setMessage("");
    };
    const handleVoiceInput = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in your browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        if (!isListening) {
            try {
                recognition.start();
                setIsListening(true);
                console.log("🎤 Speech recognition started...");
            } catch (error) {
                console.error("Error starting speech recognition:", error);
                alert("There was an error starting the microphone.");
            }
        } else {
            console.log("⚠️ Already listening, please wait...");
        }

        recognition.onstart = () => {
            console.log("✅ Recognition ONSTART triggered. Now listening...");
        };

        recognition.onresult = (event: any) => {
            console.log("📥 Received speech result event:", event);
            const transcript = event.results[0][0].transcript;
            console.log("📝 Transcript received:", transcript);

            setMessage(prev => prev + " " + transcript);
        };

        recognition.onspeechend = () => {
            console.log("🛑 Speech has stopped being detected (user stopped talking)");
        };

        recognition.onend = () => {
            setIsListening(false);
            console.log("🚪 Speech recognition service ended (disconnected)");
        };

        recognition.onerror = (event: any) => {
            console.error("❌ Speech recognition error:", event.error);
            setIsListening(false);

            // Handle permission errors specifically
            if (event.error === "not-allowed" || event.error === "permission-denied") {
                alert(
                    "Microphone permission is required for voice input.\n\n" +
                    "This feature needs microphone access to convert your speech to text. " +
                    "We only use your microphone when you press the voice input button, " +
                    "and we don't store any audio recordings.\n\n" +
                    "Please allow microphone access in your browser settings if you'd like to use voice input."
                );
            } else if (event.error) {
                console.log(`Speech recognition error: ${event.error}`);
            }
        };
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage("");
        }
    };
    // const markdownContainerStyle = {
    //     width: '100%',
    //     maxWidth: '600px',
    //     border: '1px solid #ddd',
    //     borderRadius: '5px',
    //     padding: '10px',
    //     overflow: 'hidden'
    // };

    const textStyle = {
        OverflowX: 'auto',
        WhiteSpace: 'pre-wrap',
        WordWrap: 'break-word',
        maxWidth: '100%',
        lineHeight: '1rem'
    };

    const codeStyle = {
        OverflowX: 'auto',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word' as 'break-word',
        maxWidth: '100%',
        // backgroundColor: '#f5f5f5', // Optional: Better visibility for code blocks
        padding: '4px',
        borderRadius: '4px',
        lineHeight: '1rem'
    };
    const listItemStyle = {
        whiteSpace: 'pre-wrap',
        WordWrap: 'break-word',
        OverflowWrap: 'break-word',
        maxWidth: '100%',
    };
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#303030",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    minHeight: "40px",
                    color: "white"
                }}
            >
                <p style={{ marginLeft: "10px" }}>
                    {chats.find(chat => chat.id === activeChatIdRef.current)
                        ? chats.find((chat) => chat.id === activeChatId)?.label
                        : "No Active Chat"}
                </p>
                <button
                    onClick={startNewChat} // Trigger the new chat function
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        margin: "5px 5px",
                        transition: "background-color 0.2s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#212121")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "black")}
                    title="Start a new chat"
                >
                    New Chat
                </button>
            </div>
            <div ref={chatContainerRef} style={{ height: "100%", display: "flex", flexDirection: "column", overflowY: "auto" }}>
                {activeChat?.messages?.length ?? 0 > 0 ? (
                    activeChat?.messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                                backgroundColor: msg.role === "user" ? "black" : "#303030",
                                color: "white",
                                padding: "10px",
                                borderRadius: "10px",
                                maxWidth: "70%",
                                marginBottom: "5px",
                                marginRight: hasScroll ? (msg.role === "user" ? "10px" : "0") : "0"
                            }}
                        >
                            {/* Render text if available */}
                            {msg.text && (
                                typeof msg.text === "string" ? (
                                    <ReactMarkdown
                                        components={{
                                            code: ({ node, ...props }) => <code style={codeStyle} {...props} />,
                                            pre: ({ node, ...props }) => <pre style={codeStyle} {...props} />,
                                            p: ({ node, ...props }) => <p style={textStyle} {...props} />,
                                            span: ({ node, ...props }) => <span style={textStyle} {...props} />,
                                            li: ({ node, ...props }) => <li style={listItemStyle} {...props} />
                                        }}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                ) : (
                                    msg.text
                                )
                            )}

                            {/* Render steps if available */}
                            {msg.steps && (
                                <ul style={{ paddingLeft: "20px", marginTop: "5px", listStyleType: "none" }}>
                                    {msg.steps.map((step, index) => (
                                        <li key={index} style={{ marginBottom: "5px", display: "flex", alignItems: "center" }}>
                                            <span style={{ marginRight: "5px" }}>🔹</span> {/* Icon for each step */}
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Render options inside chat bubble */}
                            {msg.options && msg.role === "bot" && (
                                <div style={{ marginTop: "10px" }}>
                                    {msg.options.map((option) => (
                                        <div key={option.text} style={{ marginBottom: "10px" }}>

                                            {/* Check if it's the "Upload Example" option */}
                                            {option.text === "Upload Example" ? (
                                                <>
                                                    <button
                                                        onClick={() => fileInputRef.current?.click()}
                                                        disabled={activeChat.completed}
                                                        style={{
                                                            background: activeChat.completed ? "#ddd" : "white",
                                                            color: activeChat.completed ? "#888" : "black",
                                                            padding: "8px",
                                                            borderRadius: "5px",
                                                            border: "none",
                                                            cursor: activeChat.completed ? "not-allowed" : "pointer",
                                                            display: "block",
                                                            width: "100%",
                                                            opacity: activeChat.completed ? 0.6 : 1,
                                                        }}
                                                    >
                                                        📤 {option.text}
                                                    </button>

                                                    {/* Hidden file input */}
                                                    <input
                                                        type="file"
                                                        accept=".json"
                                                        ref={fileInputRef}
                                                        style={{ display: "none" }}
                                                        onChange={handleUploadFile}
                                                    />
                                                </>
                                            ) : !option.filePath ? (
                                                // Normal option (no file)
                                                <button
                                                    onClick={() => handleUserSelection(activeChat.id, option.text)}
                                                    disabled={activeChat.completed}
                                                    style={{
                                                        background: activeChat.completed ? "#ddd" : "white",
                                                        color: activeChat.completed ? "#888" : "black",
                                                        padding: "8px",
                                                        borderRadius: "5px",
                                                        border: "none",
                                                        cursor: activeChat.completed ? "not-allowed" : "pointer",
                                                        display: "block",
                                                        width: "100%",
                                                        opacity: activeChat.completed ? 0.6 : 1,
                                                    }}
                                                >
                                                    {option.text}
                                                </button>
                                            ) : (
                                                // Option has a filePath, show Copy and Download buttons
                                                <div>
                                                    <p>{option.text}</p>
                                                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "0.5rem" }}>
                                                        <button
                                                            onClick={() => handleCopyFile(option.filePath ?? "", option.text)}
                                                            style={{
                                                                background: "white",
                                                                border: "1px solid #ccc",
                                                                borderRadius: "5px",
                                                                padding: "8px",
                                                                cursor: "pointer",
                                                                opacity: activeChat.completed ? 0.6 : 1,
                                                                pointerEvents: activeChat.completed ? "none" : "auto",
                                                            }}
                                                            disabled={activeChat.completed}
                                                            title="Copy File"
                                                        >
                                                            📋 Copy
                                                        </button>

                                                        <button
                                                            onClick={() => handleDownloadFile(option.filePath ?? "", option.text)}
                                                            style={{
                                                                background: "white",
                                                                border: "1px solid #ccc",
                                                                borderRadius: "5px",
                                                                padding: "8px",
                                                                cursor: "pointer",
                                                                opacity: activeChat.completed ? 0.6 : 1,
                                                                pointerEvents: activeChat.completed ? "none" : "auto",
                                                            }}
                                                            disabled={activeChat.completed}
                                                            title="Download File"
                                                        >
                                                            ⬇️ Download
                                                        </button>
                                                    </div>

                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}


                        </div>

                    ))
                ) : (!isLoading && !activeChatIdRef.current) && (
                    <div>
                        <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
                            <img src={logo} alt="Copilot" style={{ maxWidth: "100px", marginBottom: "-15px" }} />
                            <p>n8n Copilot your Ai companion</p>
                        </div>
                        <Templates />
                    </div>
                )}

                {isLoading && (
                    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                        <BeatLoader
                            color={"grey"}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {/* Message Field */}
            {chats.find(chat => chat.id === activeChatIdRef.current) && <div style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                border: "2px solid #303030",
                backgroundColor: "#303030",
                borderRadius: "1.5rem",
            }}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything"
                    style={{
                        width: "100%",
                        resize: "none",
                        height: "40px",
                        overflowY: "auto",
                        outline: "none",
                        border: "none",
                        background: "none",
                        color: "white",
                    }}
                />
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px"
                }}>
                    <div>
                        <button
                            style={{
                                backgroundColor: "gray",
                                color: "white",
                                padding: "5px",
                                borderRadius: "25%",
                                border: "none",
                                cursor: "pointer",
                                marginRight: "0.3rem",
                                paddingBottom: "2px",
                            }}>
                            <IoImageOutline style={{ fontSize: "20px" }} />
                        </button>
                        <button
                            onClick={handleVoiceInput}
                            style={{
                                backgroundColor: isListening ? "red" : "gray",
                                color: "white",
                                padding: "5px",
                                borderRadius: "25%",
                                border: "none",
                                cursor: "pointer",
                                paddingBottom: "2px",
                            }}
                        >
                            <MdOutlineKeyboardVoice style={{ fontSize: "20px" }} />
                        </button>
                    </div>
                    <button onClick={() => sendMessage("")} style={{ background: "none", border: "none", cursor: "pointer", color: "white" }}>
                        <LuSendHorizontal style={{ width: "24px", height: "24px" }} />
                    </button>
                </div>

                {isListening && <div style={{ color: "red", marginTop: "10px" }}>🎙️ Listening...</div>}
            </div >}
        </>
    );
};

export default ChatSection;
