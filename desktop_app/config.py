import os

# Colors from tailwind.config.js
COLORS = {
    "primary": "#FED20F",
    "primary_hover": "#F4BA00",
    "secondary": "#FF9309",
    "secondary_hover": "#E27600",
    "tertiary": "#282828",
    "tertiary_light": "#3b3b3b",
    "background": "#f0f2f5",
    "background_dark": "#1e1e1e",
    "text_light": "#ffffff",
    "text_dark": "#000000",
    "quaternary": "#C2C2C2",
    "success": "#2e7d32",
    "danger": "#d32f2f"
}

# Typography
FONTS = {
    "h1": ("Roboto", 24, "bold"),
    "h2": ("Roboto", 20, "bold"),
    "h3": ("Roboto", 16, "bold"),
    "body": ("Open Sans", 14),
    "body_bold": ("Open Sans", 14, "bold"),
    "small": ("Open Sans", 12)
}

# Database
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "kuarzo_db"
}

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_DIR = os.path.join(BASE_DIR, "assets")
IMAGES_DIR = os.path.join(ASSETS_DIR, "images")

ICON_PATH = os.path.join(IMAGES_DIR, "icon.png")
LOGO_PATH = os.path.join(IMAGES_DIR, "logo.png")
