"""
Template for Future Monthly Editions

STEPS TO CREATE A NEW EDITION:
1. Copy this file and rename it to {month}_{year}.py (e.g., february_2026.py)
2. Create a directory named {Month}_{Year} (e.g., February_2026) in the newsletter root
3. Place all images for that month in the directory
4. Update all image paths below to: "{Month}_{Year}/your-image.jpg"
5. Replace all content placeholders with your actual content
"""

EDITION = {
    "month": "Month",  # e.g., "February", "March"
    "year": "2026",
    "subtitle": "Your Monthly Dose of AI Innovation",
    
    # Breaking News Ticker Items (5-8 items recommended)
    "ticker_items": [
        "Breaking News Item 1",
        "Breaking News Item 2",
        "Breaking News Item 3",
        "Breaking News Item 4",
        "Breaking News Item 5",
    ],
    
    # Featured Story (main highlight with large image)
    "featured": {
        "badge": "🔥 Featured",
        "title": "Your Featured Story Title Here",
        "image": "Month_Year/your-featured-image.jpg",  # e.g., "February_2026/featured.jpg"
        "meta": [
            {"icon": "📍", "text": "Location or Category"},
            {"icon": "🎨", "text": "Topic"},
            {"icon": "⏱️", "text": "X min read"},
        ],
        "excerpt": """
            Write your featured story excerpt here. This should be engaging and 
            highlight the most important story of the month. You can use <br><br> 
            for paragraph breaks and <strong>bold text</strong> for emphasis.
        """,
        "links": {  # Optional - set to None if no links
            "title": "Resource Title",
            "links": [
                {"name": "🔗 Link Name", "url": "https://example.com"},
            ]
        }
    },
    
    # AI Art Gallery (3 images with captions)
    "gallery": [
        {
            "image": "Month_Year/gallery-image-1.jpg",  # e.g., "February_2026/gallery-1.jpg"
            "title": "Image Title 1",
            "description": "Brief description of the first image."
        },
        {
            "image": "Month_Year/gallery-image-2.jpg",
            "title": "Image Title 2",
            "description": "Brief description of the second image."
        },
        {
            "image": "Month_Year/gallery-image-3.jpg",
            "title": "Image Title 3",
            "description": "Brief description of the third image."
        },
    ],
    
    # Top Stories (left column: 1 story, right column: 2 stories)
    "top_stories": {
        "left_column": [
            {
                "icon": "🎯",
                "title": "Your Top Story Title",
                "meta": [
                    {"icon": "🏷️", "text": "Category"},
                    {"icon": "📅", "text": "Date"},
                ],
                "excerpt": """
                    Write the main content of your top story here. Make it engaging 
                    and informative. This will appear in the left column with an image below.
                """,
                "image": "Month_Year/top-story-image.png",  # Optional - can be None
                "links": None  # Optional - add links dict if needed
            }
        ],
        "right_column": [
            {
                "icon": "🚀",
                "title": "Second Story Title",
                "meta": [
                    {"icon": "🏷️", "text": "Category"},
                    {"icon": "📅", "text": "Date"},
                ],
                "excerpt": """
                    Content for your second story. This appears in the right column.
                """,
                "links": {  # Optional
                    "title": "Resource Title",
                    "links": [
                        {"name": "📰 Source 1", "url": "https://example.com/1"},
                        {"name": "🔗 Source 2", "url": "https://example.com/2"},
                    ]
                }
            },
            {
                "icon": "💡",
                "title": "Third Story Title",
                "meta": [
                    {"icon": "🏷️", "text": "Category"},
                    {"icon": "📅", "text": "Date"},
                ],
                "excerpt": """
                    Content for your third story. Also in the right column.
                """,
                "links": None  # Optional
            }
        ]
    },
    
    # Tools Spotlight (large image on left, content on right)
    "tools_spotlight": {
        "image": "Month_Year/tools-image.png",  # e.g., "February_2026/tools.png"
        "title": "Tool or Workflow Highlight Title",
        "meta": [
            {"icon": "🛠️", "text": "Category"},
            {"icon": "⭐", "text": "Badge"},
        ],
        "excerpt": """
            Describe your featured tool or workflow here. This section is perfect 
            for highlighting new developer tools, workflows, or AI assistants.
            <br><br>
            You can add multiple paragraphs and <strong>emphasis</strong>.
        """,
        "links": {  # Optional
            "title": "Tool Links",
            "links": [
                {"name": "🔗 Official Site", "url": "https://example.com"},
            ]
        }
    },
    
    # Developer Tools (2 cards side by side)
    "developer_tools": [
        {
            "icon": "🔧",
            "title": "Developer Tool 1",
            "description": """
                Description of your first developer tool. Keep it concise but informative.
            """,
            "link": {"name": "🔗 View Tool", "url": "https://example.com"}
        },
        {
            "icon": "🛠️",
            "title": "Developer Tool 2",
            "description": """
                Description of your second developer tool.
            """,
            "link": {"name": "🔗 View Tool", "url": "https://example.com"}
        }
    ],
    
    # Quote Block
    "quote": {
        "text": """
            Your inspirational or thought-provoking quote here. This will be 
            displayed in a special highlighted block with gold accents.
        """,
        "author": "Author Name or Team"
    },
    
    # Research Papers (4 papers in 2x2 grid)
    "papers": [
        {
            "title": "Research Paper Title 1",
            "url": "https://arxiv.org/abs/XXXX.XXXXX",
            "description": "Brief description of what this paper is about."
        },
        {
            "title": "Research Paper Title 2",
            "url": "https://arxiv.org/abs/XXXX.XXXXX",
            "description": "Brief description of the second paper."
        },
        {
            "title": "Research Paper Title 3",
            "url": "https://arxiv.org/abs/XXXX.XXXXX",
            "description": "Brief description of the third paper."
        },
        {
            "title": "Research Paper Title 4",
            "url": "https://arxiv.org/abs/XXXX.XXXXX",
            "description": "Brief description of the fourth paper."
        }
    ],
    
    # Stats (4 numbers displayed prominently)
    "stats": [
        {"number": "XX", "label": "Statistic Label 1"},
        {"number": "YY", "label": "Statistic Label 2"},
        {"number": "ZZ", "label": "Statistic Label 3"},
        {"number": "∞", "label": "Statistic Label 4"},
    ],
    
    # More Headlines (3 smaller stories)
    "more_headlines": [
        {
            "icon": "📰",
            "title": "Headline 1",
            "description": """
                Brief description of your first headline story.
            """,
            "links": {  # Optional
                "title": "Resources",
                "links": [
                    {"name": "🔗 Source", "url": "https://example.com"},
                ]
            }
        },
        {
            "icon": "🎯",
            "title": "Headline 2",
            "description": """
                Brief description of your second headline story.
            """,
            "links": None  # Optional
        },
        {
            "icon": "🌟",
            "title": "Headline 3",
            "description": """
                Brief description of your third headline story.
            """,
            "links": None  # Optional
        }
    ],
    
    # Creative AI Spotlight (highlighted section at the end)
    "creative_spotlight": {
        "icon": "✨",
        "title": "Creative AI Tool or Technique Spotlight",
        "meta": [
            {"icon": "🎨", "text": "Category"},
            {"icon": "🖼️", "text": "Type"},
        ],
        "excerpt": """
            Describe your creative AI spotlight here. This could be about 
            image generation, video creation, music AI, or any creative tool.
            <br><br>
            This section gets special visual treatment at the end of the newsletter.
        """,
        "link": {"name": "✨ Try This Tool", "url": "https://example.com"}
    }
}
