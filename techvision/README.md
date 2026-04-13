# TechVision Homepage

A React homepage for TechVision with EmailJS-powered contact form notifications.

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Setting Up Email Notifications (EmailJS)

When a student submits the contact form, you'll receive an email instantly.

### Step-by-step setup:

1. **Create a free account** at https://www.emailjs.com

2. **Add an Email Service**
   - Dashboard → Email Services → Add New Service
   - Connect your Gmail / Outlook / etc.
   - Copy the **Service ID**

3. **Create an Email Template**
   - Dashboard → Email Templates → Create New Template
   - Set the "To Email" to your address
   - Use these variables in the template body:
     ```
     New enquiry from TechVision website

     Name:    {{from_name}}
     Email:   {{from_email}}
     Message: {{message}}
     Time:    {{time}}
     ```
   - Copy the **Template ID**

4. **Get your Public Key**
   - Dashboard → Account → API Keys
   - Copy your **Public Key**

5. **Paste the credentials** into `src/TechVisionHomepage.jsx`:
   ```js
   const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
   const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "AbCdEfGhIjKlMnOp"
   ```

That's it — no backend needed!

## Build for Production

```bash
npm run build
```

## Project Structure

```
techvision/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── TechVisionHomepage.jsx   ← EmailJS config at the top
```
