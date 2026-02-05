import streamlit as st
from pathlib import Path
import base64
from datetime import datetime
import importlib.util
import sys
import textwrap

# Page config
st.set_page_config(
    page_title="🧠 The Gradient | AI Newsletter",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Get the directory where the script is located
SCRIPT_DIR = Path(__file__).parent
CONTENT_DIR = SCRIPT_DIR / "content"

def load_edition(edition_file):
    """Dynamically load an edition content file"""
    spec = importlib.util.spec_from_file_location("edition", CONTENT_DIR / edition_file)
    module = importlib.util.module_from_spec(spec)
    sys.modules["edition"] = module
    spec.loader.exec_module(module)
    return module.EDITION

def get_available_editions():
    """Get list of available monthly editions"""
    editions = []
    for file in CONTENT_DIR.glob("*.py"):
        if file.name not in ["__init__.py", "month_template.py"]:
            editions.append(file.stem)
    return sorted(editions, reverse=True)  # Most recent first

def render_link_button(links_data, button_text="🔗 View Sources"):
    """Render a link button that shows a popover with multiple links"""
    if links_data is None:
        return
    
    links = links_data.get("links", [])
    title = links_data.get("title", "Resources")
    
    if len(links) == 1:
        # Single link - direct button
        st.link_button(f"🔗 {links[0]['name']}", links[0]['url'], use_container_width=True)
    elif len(links) > 1:
        # Multiple links - use popover
        with st.popover(f"📚 {button_text} ({len(links)} sources)", use_container_width=True):
            st.markdown(f"### {title}")
            st.markdown("---")
            for link in links:
                st.link_button(link['name'], link['url'], use_container_width=True)

def render_meta_tags(meta_list):
    """Render meta tags for articles"""
    meta_html = ""
    for meta in meta_list:
        meta_html += f'<span>{meta["icon"]} {meta["text"]}</span>'
    return meta_html

def clean_text(text):
    """Remove leading whitespace from text while preserving intentional formatting"""
    return textwrap.dedent(text).strip()

# ============== LOAD AVAILABLE EDITIONS ==============
available_editions = get_available_editions()

# Custom CSS with animations (keeping all original animations!)
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap');
    
    /* Root variables */
    :root {
        --gradient-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        --gradient-accent: linear-gradient(135deg, #e94560 0%, #ff6b6b 100%);
        --gradient-gold: linear-gradient(135deg, #f39c12 0%, #e74c3c 50%, #9b59b6 100%);
        --text-primary: #f8f9fa;
        --text-secondary: #adb5bd;
        --accent-cyan: #00d4ff;
        --accent-magenta: #e94560;
        --accent-gold: #ffd700;
        --card-bg: rgba(255, 255, 255, 0.03);
        --card-border: rgba(255, 255, 255, 0.1);
    }
    
    /* Hide Streamlit elements */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .stDeployButton {display: none;}
    
    /* Main container styling */
    .stApp {
        background: var(--gradient-primary);
        background-attachment: fixed;
    }
    
    .main .block-container {
        padding-top: 2rem;
        padding-bottom: 2rem;
        max-width: 1400px;
    }
    
    /* Animated background particles */
    .stApp::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            radial-gradient(circle at 20% 80%, rgba(233, 69, 96, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.05) 0%, transparent 30%);
        pointer-events: none;
        z-index: 0;
    }
    
    /* Typography */
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Playfair Display', serif !important;
        color: var(--text-primary) !important;
    }
    
    p, span, div {
        font-family: 'Source Serif 4', serif !important;
    }
    
    code {
        font-family: 'JetBrains Mono', monospace !important;
    }
    
    /* Masthead animation */
    @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(233, 69, 96, 0.3); }
        50% { box-shadow: 0 0 40px rgba(233, 69, 96, 0.6); }
    }
    
    @keyframes slide-in-left {
        from { opacity: 0; transform: translateX(-50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slide-in-right {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slide-in-up {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes border-dance {
        0%, 100% { border-color: var(--accent-cyan); }
        33% { border-color: var(--accent-magenta); }
        66% { border-color: var(--accent-gold); }
    }
    
    /* Masthead */
    .masthead {
        text-align: center;
        padding: 3rem 2rem;
        margin-bottom: 2rem;
        position: relative;
        animation: fade-in 1s ease-out;
    }
    
    .masthead::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 2px;
        background: var(--gradient-gold);
        animation: shimmer 3s infinite linear;
        background-size: 200% auto;
    }
    
    .masthead::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 2px;
        background: var(--gradient-gold);
    }
    
    .masthead-title {
        font-family: 'Playfair Display', serif !important;
        font-size: 4.5rem !important;
        font-weight: 900 !important;
        background: linear-gradient(135deg, #fff 0%, #ffd700 50%, #e94560 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        animation: float 4s ease-in-out infinite;
    }
    
    .masthead-subtitle {
        font-family: 'Source Serif 4', serif !important;
        font-size: 1.2rem !important;
        color: var(--text-secondary) !important;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }
    
    .masthead-date {
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 0.9rem !important;
        color: var(--accent-cyan) !important;
        padding: 0.5rem 1.5rem;
        border: 1px solid var(--accent-cyan);
        display: inline-block;
        animation: border-dance 3s infinite;
    }
    
    /* Month Selector */
    .month-selector {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    /* Article cards */
    .article-card {
        background: var(--card-bg);
        backdrop-filter: blur(10px);
        border: 1px solid var(--card-border);
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: slide-in-up 0.6s ease-out backwards;
        position: relative;
        overflow: hidden;
    }
    
    .article-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.5s;
    }
    
    .article-card:hover::before {
        left: 100%;
    }
    
    .article-card:hover {
        transform: translateY(-8px) scale(1.02);
        border-color: var(--accent-magenta);
        box-shadow: 0 20px 40px rgba(233, 69, 96, 0.2);
    }
    
    .article-card:nth-child(1) { animation-delay: 0.1s; }
    .article-card:nth-child(2) { animation-delay: 0.2s; }
    .article-card:nth-child(3) { animation-delay: 0.3s; }
    .article-card:nth-child(4) { animation-delay: 0.4s; }
    
    .article-title {
        font-family: 'Playfair Display', serif !important;
        font-size: 1.6rem !important;
        font-weight: 700 !important;
        color: var(--text-primary) !important;
        margin-bottom: 0.8rem;
        line-height: 1.3;
    }
    
    .article-meta {
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 0.75rem !important;
        color: var(--accent-cyan) !important;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }
    
    .article-meta span {
        padding: 0.25rem 0.5rem;
        background: rgba(0, 212, 255, 0.1);
        border-radius: 4px;
    }
    
    .article-excerpt {
        font-family: 'Source Serif 4', serif !important;
        font-size: 1rem !important;
        color: var(--text-secondary) !important;
        line-height: 1.7;
    }
    
    /* Featured article */
    .featured-card {
        background: linear-gradient(135deg, rgba(233, 69, 96, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%);
        border: 2px solid;
        border-image: var(--gradient-gold) 1;
        animation: pulse-glow 3s infinite, slide-in-up 0.8s ease-out;
    }
    
    .featured-badge {
        display: inline-block;
        padding: 0.3rem 1rem;
        background: var(--gradient-accent);
        color: white;
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        border-radius: 20px;
        margin-bottom: 1rem;
        animation: float 2s ease-in-out infinite;
    }
    
    /* Section headers */
    .section-header {
        display: flex;
        align-items: center;
        margin: 3rem 0 2rem;
        animation: slide-in-left 0.6s ease-out;
    }
    
    .section-header::before,
    .section-header::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--gradient-gold);
    }
    
    .section-header span {
        font-family: 'Playfair Display', serif !important;
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        color: var(--accent-gold) !important;
        padding: 0 2rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
    }
    
    /* Breaking news ticker */
    .ticker-wrapper {
        background: linear-gradient(90deg, var(--accent-magenta), var(--accent-cyan));
        padding: 0.8rem 0;
        margin-bottom: 2rem;
        overflow: hidden;
        border-radius: 8px;
    }
    
    .ticker-content {
        display: flex;
        animation: ticker 30s linear infinite;
        white-space: nowrap;
    }
    
    @keyframes ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    
    .ticker-item {
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 0.85rem;
        color: white;
        padding: 0 3rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .ticker-item::before {
        content: '⚡';
    }
    
    /* Quote block */
    .quote-block {
        background: rgba(255, 215, 0, 0.05);
        border-left: 4px solid var(--accent-gold);
        padding: 2rem;
        margin: 2rem 0;
        border-radius: 0 12px 12px 0;
        animation: slide-in-right 0.6s ease-out;
    }
    
    .quote-text {
        font-family: 'Playfair Display', serif !important;
        font-size: 1.4rem !important;
        font-style: italic;
        color: var(--text-primary) !important;
        line-height: 1.6;
    }
    
    .quote-author {
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 0.85rem !important;
        color: var(--accent-gold) !important;
        margin-top: 1rem;
    }
    
    /* Stats cards */
    .stat-card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .stat-card:hover {
        border-color: var(--accent-cyan);
        transform: translateY(-5px);
    }
    
    .stat-number {
        font-family: 'Playfair Display', serif !important;
        font-size: 3rem !important;
        font-weight: 900 !important;
        background: var(--gradient-accent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
    .stat-label {
        font-family: 'JetBrains Mono', monospace !important;
        font-size: 0.75rem !important;
        color: var(--text-secondary) !important;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
    
    /* Footer */
    .footer {
        text-align: center;
        padding: 3rem 2rem;
        margin-top: 4rem;
        border-top: 1px solid var(--card-border);
    }
    
    .footer-logo {
        font-family: 'Playfair Display', serif !important;
        font-size: 2rem !important;
        font-weight: 700 !important;
        background: var(--gradient-gold);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 1rem;
    }
    
    .footer-text {
        font-family: 'Source Serif 4', serif !important;
        color: var(--text-secondary) !important;
        font-size: 0.9rem;
    }
    
    /* Paper card */
    .paper-card {
        background: rgba(255, 215, 0, 0.05);
        border: 1px solid rgba(255, 215, 0, 0.2);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        margin-bottom: 1rem;
        transition: all 0.3s ease;
    }
    
    .paper-card:hover {
        border-color: var(--accent-gold);
        transform: translateX(5px);
        box-shadow: 0 5px 20px rgba(255, 215, 0, 0.1);
    }
    
    .paper-title {
        font-family: 'Source Serif 4', serif !important;
        font-size: 1rem !important;
        color: var(--text-primary) !important;
        margin-bottom: 0.5rem;
    }
    
    /* Tool card */
    .tool-card {
        background: rgba(0, 212, 255, 0.05);
        border: 1px solid rgba(0, 212, 255, 0.2);
        border-radius: 12px;
        padding: 1.2rem;
        transition: all 0.3s ease;
    }
    
    .tool-card:hover {
        border-color: var(--accent-cyan);
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0, 212, 255, 0.15);
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .masthead-title {
            font-size: 2.5rem !important;
        }
        
        .section-header span {
            font-size: 1rem !important;
            padding: 0 1rem;
        }
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #1a1a2e;
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--gradient-accent);
        border-radius: 4px;
    }
    
    /* Streamlit specific overrides */
    .stImage > img {
        border-radius: 12px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .stImage > img:hover {
        transform: scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }
    
    div[data-testid="stHorizontalBlock"] {
        gap: 1.5rem;
    }
    
    .element-container {
        animation: fade-in 0.5s ease-out;
    }
    
    /* Popover styling */
    div[data-testid="stPopover"] {
        background: #1a1a2e !important;
    }
    
    div[data-testid="stPopover"] > div {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%) !important;
        border: 1px solid var(--accent-cyan) !important;
        border-radius: 12px !important;
    }
</style>
""", unsafe_allow_html=True)

# ============== MONTH SELECTOR ==============
if len(available_editions) > 1:
    st.markdown('<div class="month-selector">', unsafe_allow_html=True)
    selected_edition = st.selectbox(
        "📅 Select Edition",
        available_editions,
        format_func=lambda x: x.replace("_", " ").title(),
        label_visibility="collapsed"
    )
    st.markdown('</div>', unsafe_allow_html=True)
else:
    selected_edition = available_editions[0] if available_editions else None

if selected_edition is None:
    st.error("No editions available. Please add content files to the content folder.")
    st.stop()

# Load the selected edition
edition = load_edition(f"{selected_edition}.py")

# ============== MASTHEAD ==============
st.markdown(f"""
<div class="masthead">
    <div class="masthead-title">🧠 The Gradient</div>
    <div class="masthead-subtitle">{edition['subtitle']}</div>
    <div class="masthead-date">{edition['month']} {edition['year']} Edition</div>
</div>
""", unsafe_allow_html=True)

# ============== BREAKING NEWS TICKER ==============
ticker_html = '<div class="ticker-wrapper"><div class="ticker-content">'
# Duplicate items for seamless loop
for _ in range(2):
    for item in edition['ticker_items']:
        ticker_html += f'<span class="ticker-item">{item}</span>'
ticker_html += '</div></div>'
st.markdown(ticker_html, unsafe_allow_html=True)

# ============== FEATURED STORY ==============
st.markdown("""
<div class="section-header">
    <span>Featured Story</span>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns([1.2, 1])

with col1:
    st.image(str(SCRIPT_DIR / edition['featured']['image']), use_container_width=True)

with col2:
    featured = edition['featured']
    st.markdown(f"""
    <div class="article-card featured-card">
        <span class="featured-badge">{featured['badge']}</span>
        <h2 class="article-title">{featured['title']}</h2>
        <div class="article-meta">
            {render_meta_tags(featured['meta'])}
        </div>
        <p class="article-excerpt">
            {clean_text(featured['excerpt'])}
        </p>
    </div>
    """, unsafe_allow_html=True)
    render_link_button(featured.get('links'), "View Resources")

# ============== AI ART GALLERY ==============
st.markdown("""
<div class="section-header">
    <span>AI Art Gallery</span>
</div>
""", unsafe_allow_html=True)

cols = st.columns(3)
for idx, gallery_item in enumerate(edition['gallery']):
    with cols[idx]:
        st.image(str(SCRIPT_DIR / gallery_item['image']), use_container_width=True)
        st.markdown(f"""
        <div class="article-card">
            <h3 class="article-title">{gallery_item['title']}</h3>
            <p class="article-excerpt">{clean_text(gallery_item['description'])}</p>
        </div>
        """, unsafe_allow_html=True)

# ============== TOP STORIES ==============
st.markdown("""
<div class="section-header">
    <span>Top Stories</span>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns(2)

# Left column
with col1:
    for story in edition['top_stories']['left_column']:
        st.markdown(f"""
        <div class="article-card">
            <h3 class="article-title">{story['icon']} {story['title']}</h3>
            <div class="article-meta">
                {render_meta_tags(story['meta'])}
            </div>
            <p class="article-excerpt">
                {clean_text(story['excerpt'])}
            </p>
        </div>
        """, unsafe_allow_html=True)
        
        if story.get('image'):
            st.image(str(SCRIPT_DIR / story['image']), use_container_width=True)
        
        if story.get('links'):
            render_link_button(story['links'], "View Resources")

# Right column
with col2:
    for story in edition['top_stories']['right_column']:
        st.markdown(f"""
        <div class="article-card">
            <h3 class="article-title">{story['icon']} {story['title']}</h3>
            <div class="article-meta">
                {render_meta_tags(story['meta'])}
            </div>
            <p class="article-excerpt">
                {clean_text(story['excerpt'])}
            </p>
        </div>
        """, unsafe_allow_html=True)
        
        if story.get('links'):
            render_link_button(story['links'], "View Resources")

# ============== TOOLS SPOTLIGHT ==============
st.markdown("""
<div class="section-header">
    <span>Tools & Workflows</span>
</div>
""", unsafe_allow_html=True)

col1, col2 = st.columns([1, 1.2])

with col1:
    st.image(str(SCRIPT_DIR / edition['tools_spotlight']['image']), use_container_width=True)

with col2:
    tools = edition['tools_spotlight']
    st.markdown(f"""
    <div class="article-card">
        <h3 class="article-title">{tools['title']}</h3>
        <div class="article-meta">
            {render_meta_tags(tools['meta'])}
        </div>
        <p class="article-excerpt">
            {clean_text(tools['excerpt'])}
        </p>
    </div>
    """, unsafe_allow_html=True)
    render_link_button(tools.get('links'), "View Article")

# ============== DEVELOPER TOOLS ==============
st.markdown("""
<div class="section-header">
    <span>Developer Tools Spotlight</span>
</div>
""", unsafe_allow_html=True)

cols = st.columns(2)
for idx, tool in enumerate(edition['developer_tools']):
    with cols[idx]:
        st.markdown(f"""
        <div class="tool-card">
            <h4 class="article-title">{tool['icon']} {tool['title']}</h4>
            <p class="article-excerpt">
                {clean_text(tool['description'])}
            </p>
        </div>
        """, unsafe_allow_html=True)
        st.link_button(tool['link']['name'], tool['link']['url'], use_container_width=True)

# ============== QUOTE BLOCK ==============
quote = edition['quote']
st.markdown(f"""
<div class="quote-block">
    <p class="quote-text">
        {clean_text(quote['text'])}
    </p>
    <p class="quote-author">— {quote['author']}</p>
</div>
""", unsafe_allow_html=True)

# ============== RESEARCH PAPERS ==============
st.markdown("""
<div class="section-header">
    <span>Research Papers</span>
</div>
""", unsafe_allow_html=True)

cols = st.columns(2)
for idx, paper in enumerate(edition['papers']):
    with cols[idx % 2]:
        st.markdown(f"""
        <div class="paper-card">
            <p class="paper-title">📄 {paper['title']}</p>
            <p class="article-excerpt" style="font-size: 0.9rem; margin-bottom: 0.5rem;">{clean_text(paper['description'])}</p>
        </div>
        """, unsafe_allow_html=True)
        st.link_button(f"📖 Read Paper", paper['url'], use_container_width=True)

# ============== STATS SECTION ==============
st.markdown("""
<div class="section-header">
    <span>By The Numbers</span>
</div>
""", unsafe_allow_html=True)

cols = st.columns(4)
for idx, stat in enumerate(edition['stats']):
    with cols[idx]:
        st.markdown(f"""
        <div class="stat-card">
            <div class="stat-number">{stat['number']}</div>
            <div class="stat-label">{stat['label']}</div>
        </div>
        """, unsafe_allow_html=True)

# ============== MORE HEADLINES ==============
st.markdown("""
<div class="section-header">
    <span>More Headlines</span>
</div>
""", unsafe_allow_html=True)

cols = st.columns(3)
for idx, headline in enumerate(edition['more_headlines']):
    with cols[idx]:
        st.markdown(f"""
        <div class="article-card">
            <h4 class="article-title">{headline['icon']} {headline['title']}</h4>
            <p class="article-excerpt">
                {clean_text(headline['description'])}
            </p>
        </div>
        """, unsafe_allow_html=True)
        render_link_button(headline.get('links'), "Read More")

# ============== CREATIVE AI SPOTLIGHT ==============
st.markdown("""
<div class="section-header">
    <span>Creative AI Spotlight</span>
</div>
""", unsafe_allow_html=True)

spotlight = edition['creative_spotlight']
st.markdown(f"""
<div class="article-card">
    <h3 class="article-title">{spotlight['icon']} {spotlight['title']}</h3>
    <div class="article-meta">
        {render_meta_tags(spotlight['meta'])}
    </div>
    <p class="article-excerpt">
        {clean_text(spotlight['excerpt'])}
    </p>
</div>
""", unsafe_allow_html=True)

st.link_button(spotlight['link']['name'], spotlight['link']['url'], use_container_width=True)

# ============== FOOTER ==============
st.markdown(f"""
<div class="footer">
    <div class="footer-logo">🧠 The Gradient</div>
    <p class="footer-text">
        Curating the pulse of AI innovation, one neural pathway at a time.<br>
        {edition['month']} {edition['year']} Edition • Made with ❤️ and 🤖
    </p>
</div>
""", unsafe_allow_html=True)
