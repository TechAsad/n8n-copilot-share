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
            { text: "LinkedIn Data Enrichment (Waterfall)", filePath:"linkedin-data-enrichment.json", next: "linkedin-data-enrichment" },
            { text: "AI Research (Not available in databases)", filePath:"ai-researcher.json", next: "ai-researcher" },
            { text: "Account Research (Not people)", filePath:"account-researcher.json", next: "account-researcher" },
            { text: "I want a custom Data Enrichment workflow ", next: "custom-solution" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },
    {
        id: "content-creation-workflows",
        message: "Here are our recommended Content Creation templates:",
        options: [
            { text: "Newsletter Strategist Agent", filePath:"newsletter-agent.json", next: "newsletter-agent" },
            { text: "LinkedIn Posts Agent", filePath:"linkedin-posts-agent.json", next: "linkedin-posts-agent" },
            { text: "AI-infused SEO", filePath:"ai-seo-agent.json", next: "ai-seo-agent" },
            { text: "I want a custom Content Creation workflow ", next: "custom-solution" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },
    {
        id: "online-marketing-workflows",
        message: "Here are our recommended Online Marketing templates:",
        options: [
            { text: "Analytics", filePath:"analytics-agent.json",  next: "analytics-agent" },
            { text: "Demand Generation", filePath:"demand-gen-build.json",  next: "demand-gen-build" },
            { text: "Account-based Marketing", filePath:"abm-build.json",  next: "abm-build" },
            { text: "I want a custom Online Marketing workflow ", next: "custom-solution" },
            { text: "Chat with Agent", next: "ask-questions" }
        ]
    },
    {
        id: "custom-solution",
        message: "What is your most urgent business need?",
        options: [
            { text: "I will explain my workflow", next: "ask-questions" },
            { text: "Upload Example", next: "upload-file" },
            
        ]
    },

    // Data Enrichment Workflow Build Steps
    {
        id: "linkedin-data-enrichment",
        message: "LinkedIn Data Enrichment (Waterfall) Workflow Setup:",
        steps: [
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