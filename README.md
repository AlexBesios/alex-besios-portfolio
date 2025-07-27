# Alex Besios - Portfolio Website

A modern, dark-themed portfolio website showcasing my development skills and projects.

🌐 **Live Site**: [https://alexbesios.github.io/alex-besios-portfolio/](https://alexbesios.github.io/alex-besios-portfolio/)

## 🚀 Features

- **Responsive Design** - Works on all devices
- **Dark Theme** - Modern and professional appearance  
- **Interactive Animations** - Smooth transitions and effects
- **Contact Form** - Functional email contact via EmailJS
- **Project Showcase** - Featured projects with live demos
- **Skills Display** - Interactive progress bars
- **GitHub Pages Ready** - Deployed and live!

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Font Awesome 6.0.0
- **Fonts**: Google Fonts (Poppins)
- **Email Service**: EmailJS
- **Animations**: CSS Animations + JavaScript
- **Hosting**: GitHub Pages

## � Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css              # All CSS styles
├── script.js               # JavaScript functionality
├── config-public.js        # Public EmailJS config (safe to commit)
├── config.js               # Private EmailJS config (git-ignored)
├── .env                    # Environment variables (git-ignored)
├── .gitignore              # Git ignore rules
├── media/                  # Images and assets
│   ├── encryptDecrypt.webp
│   ├── MainImage_1200x544-11.webp
│   └── glowing-code-workspace-stockcake.jpg
└── README.md               # This file
```

## 🔧 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AlexBesios/alex-besios-portfolio.git
cd alex-besios-portfolio
```

### 2. Configure EmailJS for Local Development
1. Create a `config.js` file (for local development):
   ```javascript
   // Local development config (DO NOT commit this file)
   window.emailjsConfig = {
     serviceId: 'your_service_id',
     templateId: 'your_template_id', 
     publicKey: 'your_public_key'
   };
   ```
2. The `config.js` file is git-ignored for security

### 3. Set Up EmailJS (If Forking)
1. Create account at [EmailJS](https://www.emailjs.com/)
2. Add email service (Gmail, Outlook, etc.)
3. Create email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
4. Get your Service ID, Template ID, and Public Key
5. Update `config-public.js` with your credentials

### 4. Add Your Content
- Replace placeholder images in `/media/` folder
- Update personal information in `index.html`
- Customize skills percentages
- Add your actual project links

## 🔒 Security & Configuration

### Two Configuration Files:
1. **`config-public.js`** - Safe for GitHub Pages (public credentials)
2. **`config.js`** - For local development (git-ignored)

### EmailJS Security:
- ✅ Public keys are **designed** to be exposed in frontend code
- ✅ They only allow sending emails **TO** your configured address
- ✅ Cannot be used to access your EmailJS account
- ✅ Cannot be used to send spam **FROM** your email

### What's Git-Ignored:
- `config.js` (local development config)
- `.env` (environment variables)
- Node modules, IDE files, OS files

## � GitHub Pages Deployment

This portfolio is automatically deployed to GitHub Pages:

1. **Live URL**: `https://alexbesios.github.io/alex-besios-portfolio/`
2. **Auto-deploy**: Every push to `main` branch triggers rebuild
3. **Contact Form**: Fully functional for public visitors
4. **Build Time**: ~2-5 minutes after push

### Deploy Your Own Version:
1. Fork this repository
2. Update `config-public.js` with your EmailJS credentials
3. Enable GitHub Pages in Settings → Pages
4. Select Source: "Deploy from a branch" → main

## 🌐 Alternative Deployment Options

- **Netlify**: Connect repository and deploy
- **Vercel**: Import project and deploy
- **Firebase Hosting**: Deploy with Firebase CLI

## 📧 Contact

- **Email**: alexbesios02@gmail.com
- **LinkedIn**: [Alex Besios](https://www.linkedin.com/in/alex-besios-16a622299)
- **GitHub**: [AlexBesios](https://github.com/AlexBesios)
- **Instagram**: [@alexandros_mpesios](https://www.instagram.com/alexandros_mpesios/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
