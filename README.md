# Alex Besios - Portfolio Website

A modern, dark-themed portfolio website showcasing my development skills and projects.

## 🚀 Features

- **Responsive Design** - Works on all devices
- **Dark Theme** - Modern and professional appearance  
- **Interactive Animations** - Smooth transitions and effects
- **Contact Form** - Functional email contact via EmailJS
- **Project Showcase** - Featured projects with live demos
- **Skills Display** - Interactive progress bars

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Font Awesome 6.0.0
- **Fonts**: Google Fonts (Poppins)
- **Email Service**: EmailJS
- **Animations**: CSS Animations + JavaScript

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio
cd portfolio
```

### 2. Configure EmailJS (Important!)
1. Copy `.env.example` to `config.js`
2. Fill in your actual EmailJS credentials:
   ```javascript
   const config = {
     emailjs: {
       publicKey: 'your_actual_public_key',
       serviceId: 'your_actual_service_id', 
       templateId: 'your_actual_template_id'
     }
   };
   window.emailjsConfig = config.emailjs;
   ```
3. **Never commit `config.js` to GitHub!**

### 3. Set Up EmailJS
1. Create account at [EmailJS](https://www.emailjs.com/)
2. Add email service (Gmail, Outlook, etc.)
3. Create email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
4. Get your Service ID, Template ID, and Public Key

### 4. Add Your Content
- Replace placeholder images in `/media/` folder
- Update personal information in `index.html`
- Customize skills percentages
- Add your actual project links

## 🔒 Security Notes

- **`config.js`** contains sensitive EmailJS credentials and is git-ignored
- Use `.env.example` as template for your configuration
- Never commit real API keys or credentials to public repositories
- The contact form will gracefully fail if config is missing

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── config.js           # EmailJS config (NOT in git)
├── .env.example        # Template for configuration
├── .gitignore          # Git ignore rules
├── media/              # Images and assets
│   ├── encryptDecrypt.webp
│   ├── MainImage_1200x544-11.webp
│   └── glowing-code-workspace-stockcake.jpg
└── README.md           # This file
```

## 🚀 Deployment

1. **GitHub Pages**: Push to `gh-pages` branch
2. **Netlify**: Connect repository and deploy
3. **Vercel**: Import project and deploy

**Important**: Remember to add your `config.js` file to your hosting platform's environment or upload it separately (not via git).

## 📧 Contact

- **Email**: alexbesios02@gmail.com
- **LinkedIn**: [Alex Besios](https://www.linkedin.com/in/alex-besios-16a622299)
- **GitHub**: [AlexBesios](https://github.com/AlexBesios)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
