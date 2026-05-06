import customtkinter as ctk
from PIL import Image
import os

from config import COLORS, FONTS, ICON_PATH, LOGO_PATH
from views.login import LoginView
from views.dashboard import DashboardView
from views.users import UsersView
from views.products import ProductsView
from views.orders import OrdersView

class App(ctk.CTk):
    def __init__(self):
        super().__init__()
        
        self.title("Kuarzo - Panel Administrativo")
        self.geometry("1100x700")
        self.configure(fg_color=COLORS["background_dark"])
        
        # Set theme colors
        ctk.set_appearance_mode("dark")
        
        # Set icon if exists
        if os.path.exists(ICON_PATH):
            try:
                # CustomTkinter icon setting (works better with .ico, but we can try)
                self.iconbitmap(ICON_PATH)
            except Exception:
                pass
                
        # Main container
        self.container = ctk.CTkFrame(self, fg_color="transparent")
        self.container.pack(fill="both", expand=True)
        
        # Start with Login
        self.show_login()

    def show_login(self):
        # Clear container
        for widget in self.container.winfo_children():
            widget.destroy()
            
        self.login_view = LoginView(self.container, self.on_login_success)

    def on_login_success(self, user):
        self.logged_in_user = user
        self.show_main_app()

    def show_main_app(self):
        # Clear container
        for widget in self.container.winfo_children():
            widget.destroy()
            
        self.container.grid_rowconfigure(0, weight=1)
        self.container.grid_columnconfigure(1, weight=1)
        
        # Sidebar
        self.sidebar = ctk.CTkFrame(self.container, width=250, fg_color=COLORS["tertiary"], corner_radius=0)
        self.sidebar.grid(row=0, column=0, sticky="nsew")
        self.sidebar.grid_propagate(False)
        
        # Main content area
        self.main_content = ctk.CTkFrame(self.container, fg_color=COLORS["background_dark"], corner_radius=0)
        self.main_content.grid(row=0, column=1, sticky="nsew")
        
        self.setup_sidebar()
        
        # Default view
        self.active_view = None
        self.show_view("dashboard")

    def setup_sidebar(self):
        # Logo/Title
        if os.path.exists(LOGO_PATH):
            logo_img = ctk.CTkImage(light_image=Image.open(LOGO_PATH),
                                    dark_image=Image.open(LOGO_PATH),
                                    size=(150, 45))
            logo_label = ctk.CTkLabel(self.sidebar, image=logo_img, text="")
            logo_label.pack(pady=(30, 20))
        else:
            logo_label = ctk.CTkLabel(self.sidebar, text="KUARZO", font=FONTS["h1"], text_color=COLORS["primary"])
            logo_label.pack(pady=(30, 20))
            
        # User Info
        user_name = f"{self.logged_in_user['primerNombre']} {self.logged_in_user['primerApellido']}"
        user_lbl = ctk.CTkLabel(self.sidebar, text=user_name, font=FONTS["body_bold"], text_color=COLORS["text_light"])
        user_lbl.pack(pady=(0, 30))
        
        # Navigation Buttons
        self.nav_buttons = {}
        
        nav_items = [
            ("Dashboard", "dashboard"),
            ("Usuarios", "users"),
            ("Productos", "products"),
            ("Pedidos", "orders")
        ]
        
        for text, view_name in nav_items:
            btn = ctk.CTkButton(self.sidebar, text=text, font=FONTS["body"], height=40,
                                fg_color="transparent", text_color=COLORS["text_light"],
                                hover_color=COLORS["tertiary_light"], anchor="w",
                                command=lambda v=view_name: self.show_view(v))
            btn.pack(fill="x", padx=10, pady=5)
            self.nav_buttons[view_name] = btn
            
        # Logout Button
        logout_btn = ctk.CTkButton(self.sidebar, text="Cerrar Sesión", font=FONTS["body"], height=40,
                                   fg_color=COLORS["danger"], hover_color="#b71c1c",
                                   command=self.show_login)
        logout_btn.pack(side="bottom", fill="x", padx=20, pady=20)

    def show_view(self, view_name):
        # Update active button styling
        for name, btn in self.nav_buttons.items():
            if name == view_name:
                btn.configure(fg_color=COLORS["primary"], text_color=COLORS["text_dark"], hover_color=COLORS["primary_hover"])
            else:
                btn.configure(fg_color="transparent", text_color=COLORS["text_light"], hover_color=COLORS["tertiary_light"])
                
        # Clear main content
        if self.active_view:
            self.active_view.destroy()
            
        # Load new view
        if view_name == "dashboard":
            self.active_view = DashboardView(self.main_content)
        elif view_name == "users":
            self.active_view = UsersView(self.main_content)
        elif view_name == "products":
            self.active_view = ProductsView(self.main_content)
        elif view_name == "orders":
            self.active_view = OrdersView(self.main_content)

if __name__ == "__main__":
    app = App()
    app.mainloop()
