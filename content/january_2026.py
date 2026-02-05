"""
Content for January 2026 Edition
"""

EDITION = {
    "month": "January",
    "year": "2026",
    "subtitle": "Your Monthly Dose of AI Innovation",
    
    # Breaking News Ticker Items
    "ticker_items": [
        "NVIDIA Releases GR00T-N1 Physical AI Models",
        "Apple Siri to Use Google's Gemini",
        "Llama 4 Scout: 10M Token Context Window",
        "Claude Cowork Mode Launched",
        "OpenAI Plans AI-Powered Earbuds for 2026",
        "Anthropic Expands into Healthcare",
    ],
    
    # Featured Story
    "featured": {
        "badge": "🔥 Featured",
        "title": "The White Knight of the Medina: AI Meets Ancient Architecture",
        "image": "January_2026/batman-2.jpg",
        "meta": [
            {"icon": "📍", "text": "Marrakech"},
            {"icon": "🎨", "text": "AI Art"},
            {"icon": "⏱️", "text": "5 min read"},
        ],
        "excerpt": """
            In a stunning fusion of cutting-edge AI and timeless Moroccan aesthetics, 
            these AI-generated images reimagine a futuristic guardian watching over 
            the ancient medinas. The white-armored figure stands as a symbol of 
            protection, blending seamlessly with the ornate zellige tilework and 
            towering minarets that define Morocco's architectural heritage.
            <br><br>
            Created using Luma Labs' revolutionary Photon model, these images 
            demonstrate the remarkable ability of modern AI to capture cultural 
            essence while creating entirely new narratives.
        """,
        "links": {
            "title": "Luma Labs Photon",
            "links": [
                {"name": "✨ Luma Labs Photon", "url": "https://lumalabs.ai/photon"},
            ]
        }
    },
    
    # AI Art Gallery
    "gallery": [
        {
            "image": "January_2026/batman-1.jpg",
            "title": "Dawn in the Medina",
            "description": "A solitary figure walks through the ancient streets as golden light breaks through the morning mist."
        },
        {
            "image": "January_2026/batman-2.jpg",
            "title": "Guardian of the Souk",
            "description": "Standing watch over bustling markets, where tradition meets tomorrow."
        },
        {
            "image": "January_2026/batman-3.jpg",
            "title": "Twilight Sentinel",
            "description": "As the city lights flicker on, a silent protector surveys the skyline."
        },
    ],
    
    # Top Stories
    "top_stories": {
        "left_column": [
            {
                "icon": "🦙",
                "title": "Meta Unleashes Llama 4 Scout with 10M Token Context",
                "meta": [
                    {"icon": "🤖", "text": "LLMs"},
                    {"icon": "📅", "text": "Jan 2026"},
                ],
                "excerpt": """
                    Meta's latest language model breaks all context window records with an 
                    unprecedented 10 million token capacity. The model can now process 
                    entire codebases, years of chat history, and massive document collections 
                    in a single prompt. "I see you have a memory leak in line 42,384," 
                    quipped one developer testing the new capabilities.
                """,
                "image": "January_2026/llama4scout.png",
                "links": None
            }
        ],
        "right_column": [
            {
                "icon": "🤖",
                "title": "NVIDIA's GR00T-N1.6: Physical AI Takes a Giant Leap",
                "meta": [
                    {"icon": "🦾", "text": "Robotics"},
                    {"icon": "📅", "text": "Jan 2026"},
                ],
                "excerpt": """
                    NVIDIA announces groundbreaking physical AI models that enable robots 
                    to understand and interact with the real world like never before. 
                    The GR00T-N1.6-3B model, now available on Hugging Face, promises to 
                    revolutionize humanoid robotics and automation.
                """,
                "links": {
                    "title": "NVIDIA GR00T-N1.6 Resources",
                    "links": [
                        {"name": "📰 NVIDIA Press Release", "url": "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Releases-New-Physical-AI-Models-as-Global-Partners-Unveil-Next-Generation-Robots/default.aspx"},
                        {"name": "🤗 HuggingFace Model", "url": "https://huggingface.co/nvidia/GR00T-N1.6-3B"},
                        {"name": "📝 Technical Blog", "url": "https://developer.nvidia.com/blog/building-generalist-humanoid-capabilities-with-nvidia-isaac-gr00t-n1-6-using-a-sim-to-real-workflow/"},
                    ]
                }
            },
            {
                "icon": "🍎",
                "title": "Apple Siri Gets a Brain Upgrade: Hello, Gemini!",
                "meta": [
                    {"icon": "📱", "text": "Consumer AI"},
                    {"icon": "📅", "text": "Jan 2026"},
                ],
                "excerpt": """
                    In a surprising partnership, Apple announces that the next generation 
                    of Siri will be powered by Google's Gemini language models. This 
                    collaboration marks a new era of AI assistants that actually... assist.
                """,
                "links": {
                    "title": "Apple Siri + Gemini Resources",
                    "links": [
                        {"name": "📱 Ars Technica", "url": "https://arstechnica.com/apple/2026/01/apple-says-its-new-ai-powered-siri-will-use-googles-gemini-language-models/"},
                        {"name": "💰 OpenAI Advertising", "url": "https://openai.com/index/our-approach-to-advertising-and-expanding-access/"},
                    ]
                }
            }
        ]
    },
    
    # Tools Spotlight
    "tools_spotlight": {
        "image": "January_2026/image.png",
        "title": "Claude Code vs Cursor: Why Not Both?",
        "meta": [
            {"icon": "🛠️", "text": "Dev Tools"},
            {"icon": "⭐", "text": "Editor's Pick"},
        ],
        "excerpt": """
            The eternal debate between AI coding assistants reaches a wholesome 
            conclusion: both Claude Code and Cursor bring unique strengths to 
            the developer's toolkit. Claude Code excels at understanding complex 
            codebases and providing thoughtful, context-aware suggestions, while 
            Cursor shines with its seamless IDE integration and rapid iteration 
            capabilities.
            <br><br>
            As one wise developer memed: <strong>"Both is good."</strong> 
            Why limit yourself when you can leverage the best of both worlds?
        """,
        "links": {
            "title": "Claude Cowork",
            "links": [
                {"name": "🤖 Simon Willison Blog", "url": "https://simonwillison.net/2026/Jan/12/claude-cowork/"},
            ]
        }
    },
    
    # Developer Tools
    "developer_tools": [
        {
            "icon": "🧠",
            "title": "Claude-Mem",
            "description": """
                A powerful memory management system for Claude that enables persistent 
                context across conversations. Perfect for long-running projects and 
                maintaining continuity in AI-assisted development.
            """,
            "link": {"name": "🔗 View on GitHub", "url": "https://github.com/thedotmack/claude-mem"}
        },
        {
            "icon": "🗺️",
            "title": "SoArxiv - The \"Infinite Paper\" Map",
            "description": """
                Explore the landscape of academic research like never before. SoArxiv 
                creates an interactive map of papers, helping you discover connections 
                and navigate the vast ocean of scientific knowledge.
            """,
            "link": {"name": "🔗 Explore SoArxiv", "url": "https://soarxiv.org/abs/1706.03762"}
        }
    ],
    
    # Quote
    "quote": {
        "text": """
            The best AI tools don't replace developers—they amplify their capabilities. 
            In 2026, we're seeing a renaissance of human-AI collaboration that's 
            redefining what's possible in software development.
        """,
        "author": "The Gradient Editorial Team"
    },
    
    # Research Papers
    "papers": [
        {
            "title": "AI Agent Systems: Architectures, Applications, and Evaluation",
            "url": "https://arxiv.org/abs/2601.01743",
            "description": "A comprehensive survey of AI agent architectures and their real-world applications."
        },
        {
            "title": "TSAQA: Time Series Analysis Question & Answering Benchmark",
            "url": "https://arxiv.org/abs/2601.23204",
            "description": "New benchmark for evaluating LLM capabilities in time series analysis."
        },
        {
            "title": "Rethinking Multi-Agent Workflows: A Strong Single Agent Baseline",
            "url": "https://arxiv.org/abs/2601.12307",
            "description": "Challenging assumptions about multi-agent systems with surprising single-agent results."
        },
        {
            "title": "If You Want Coherence, Orchestrate a Team of Rivals",
            "url": "https://arxiv.org/abs/2601.14351",
            "description": "Multi-Agent Models of Organizational Intelligence for improved AI reasoning."
        }
    ],
    
    # Stats
    "stats": [
        {"number": "10M", "label": "Llama 4 Context Window"},
        {"number": "3B", "label": "GR00T Model Parameters"},
        {"number": "200K", "label": "Claude Context Tokens"},
        {"number": "∞", "label": "Possibilities with AI"},
    ],
    
    # More Headlines
    "more_headlines": [
        {
            "icon": "🏥",
            "title": "AI Enters Healthcare",
            "description": """
                Both Anthropic's Claude and OpenAI's ChatGPT expand into healthcare 
                and life sciences, promising AI-assisted diagnostics and research.
            """,
            "links": {
                "title": "AI in Healthcare Resources",
                "links": [
                    {"name": "🏥 Anthropic Healthcare", "url": "https://www.anthropic.com/news/healthcare-life-sciences"},
                    {"name": "📰 CNBC - ChatGPT Health", "url": "https://www.cnbc.com/2026/01/12/open-ai-torch-health-care-technology.html"},
                    {"name": "📋 EveryDev AI News", "url": "https://www.everydev.ai/p/news-ai-dev-news-digest-january-16th-2026"},
                ]
            }
        },
        {
            "icon": "🎧",
            "title": "OpenAI's Earbuds Project",
            "description": """
                OpenAI targets consumer hardware with AI-powered 
                earbuds planned for release in 2026.
            """,
            "links": {
                "title": "OpenAI Hardware",
                "links": [
                    {"name": "🎧 TechCrunch", "url": "https://techcrunch.com/2026/01/21/openai-aims-to-ship-its-first-device-in-2026-and-it-could-be-earbuds/"},
                ]
            }
        },
        {
            "icon": "🦅",
            "title": "Falcon H1-R Soars",
            "description": """
                TII releases Falcon H1-R 7B, pushing the boundaries 
                of efficient language model architecture.
            """,
            "links": {
                "title": "Falcon H1-R",
                "links": [
                    {"name": "🦅 Falcon H1-R 7B", "url": "https://falconllm.tii.ae/falcon-h1r-7b.html"},
                ]
            }
        }
    ],
    
    # Creative AI Spotlight
    "creative_spotlight": {
        "icon": "✨",
        "title": "Luma Labs Photon: The Future of AI Image Generation",
        "meta": [
            {"icon": "🎨", "text": "Generative AI"},
            {"icon": "🖼️", "text": "Image Models"},
        ],
        "excerpt": """
            The stunning "White Knight" images in this edition were created using Luma Labs' 
            revolutionary Photon model. Photon represents a quantum leap in AI image generation, 
            capable of understanding complex cultural contexts, architectural styles, and 
            creating coherent narratives across multiple images.
            <br><br>
            Unlike previous models that often struggled with consistency and cultural nuance, 
            Photon excels at capturing the essence of specific aesthetic traditions—from the 
            intricate geometric patterns of Moroccan zellige to the dramatic lighting of 
            cinematic compositions. The result is AI art that feels less like algorithmic 
            output and more like the vision of a digital artist with deep cultural appreciation.
        """,
        "link": {"name": "✨ Try Luma Labs Photon", "url": "https://dream-machine.lumalabs.ai/"}
    }
}
