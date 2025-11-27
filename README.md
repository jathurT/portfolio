# Modern Portfolio Website

A beautiful, interactive personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features a stunning 3D intro animation, smooth animations, dark mode support, and a fully functional contact form.

## Features

- **3D Intro Animation**: Immersive Three.js intro with animated 3D text, floating particles, and interactive orbs
- **Modern Design**: Clean, minimalist interface with gradient accents
- **Smooth Animations**: Powered by Framer Motion with scroll-triggered animations
- **Dark Mode**: System-aware theme with manual toggle
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Meta tags, OpenGraph, and Twitter cards
- **Type-Safe**: Built with TypeScript for better development experience
- **Scalable Content**: JSON-based content management
- **Contact Form**: Integrated email functionality with Resend
- **Performance**: Optimized for speed with Next.js 16
- **Interactive Elements**: Mouse-responsive 3D scene with orbit controls

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Email**: Resend
- **Validation**: Zod
- **Icons**: React Icons
- **Themes**: next-themes

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A Resend account for email functionality

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-jathur
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Resend API key:
```env
RESEND_API_KEY=your_resend_api_key_here
NOTIFICATION_EMAIL=your.email@example.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

### Adding/Editing Projects

Edit `data/projects.json`:

```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Detailed description for modal",
  "technologies": ["React", "Node.js"],
  "images": ["/path/to/image.jpg"],
  "liveUrl": "https://demo.com",
  "githubUrl": "https://github.com/user/repo",
  "featured": true,
  "category": "Full Stack",
  "startDate": "2024-01-01",
  "endDate": "2024-06-30"
}
```

### Adding/Editing Skills

Edit `data/skills.json`:

```json
{
  "category": "Frontend Development",
  "skills": [
    {
      "name": "React",
      "proficiency": 95,
      "icon": "FaReact",
      "yearsOfExperience": 4
    }
  ]
}
```

Available icons: `FaReact`, `FaNode`, `FaGitAlt`, `FaDocker`, `FaAws`, `FaServer`, `SiNextdotjs`, `SiTypescript`, `SiTailwindcss`, `SiJavascript`, `SiPostgresql`, `SiMongodb`, `SiFigma`

### Adding/Editing Experience

Edit `data/experience.json`:

```json
{
  "id": "exp-1",
  "company": "Company Name",
  "position": "Job Title",
  "location": "City, Country",
  "type": "Full-time",
  "startDate": "2023-01-01",
  "endDate": null,
  "current": true,
  "description": "Brief description",
  "responsibilities": [
    "Achievement 1",
    "Achievement 2"
  ],
  "technologies": ["React", "Node.js"]
}
```

## Customization

### Personal Information

Update the following files with your information:

1. **Hero Section** (`components/sections/Hero.tsx`):
   - Line 115: Change "Your Name"
   - Lines 139-144: Update social links

2. **SEO Metadata** (`app/layout.tsx`):
   - Lines 17-67: Update title, description, URLs, and OpenGraph images

3. **Footer** (`components/layout/Footer.tsx`):
   - Lines 6-18: Update social links
   - Line 67: Change "Your Name"

4. **Contact Form Email** (`app/api/contact/route.ts`):
   - Line 57: Update "from" email (requires verified Resend domain)
   - Line 58: Update "to" email
   - Line 116: Update sender name

### Styling & Colors

The portfolio uses a gradient color scheme (blue to purple). To customize:

1. Update gradient classes in components:
   - `from-blue-600 to-purple-600`
   - `from-blue-400 to-purple-400`

2. Update hover states:
   - `hover:text-blue-600 dark:hover:text-purple-400`

### Email Configuration

1. Sign up at [Resend](https://resend.com)
2. Verify your domain (or use their test domain)
3. Get your API key
4. Update `.env.local`
5. Update email sender in `app/api/contact/route.ts`

## Project Structure

```
portfolio-jathur/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Email API endpoint
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Navigation with mobile menu
│   │   ├── Footer.tsx           # Footer component
│   │   └── ThemeToggle.tsx      # Dark/light mode toggle
│   ├── sections/
│   │   ├── Hero.tsx             # Hero section
│   │   ├── About.tsx            # About section
│   │   ├── Skills.tsx           # Skills section
│   │   ├── Projects.tsx         # Projects gallery
│   │   ├── Experience.tsx       # Timeline
│   │   └── Contact.tsx          # Contact form
│   └── ui/
│       ├── Button.tsx           # Reusable button
│       ├── SectionWrapper.tsx   # Section with animations
│       └── ProjectModal.tsx     # Project detail modal
├── data/
│   ├── projects.json            # Projects data
│   ├── skills.json              # Skills data
│   └── experience.json          # Experience data
├── lib/
│   └── utils.ts                 # Utility functions
├── providers/
│   └── ThemeProvider.tsx        # Theme context provider
├── types/
│   └── index.ts                 # TypeScript types
└── .env.local.example           # Environment variables template
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`
4. Deploy!

### Other Platforms

Build the project:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Performance Optimization

- Images are optimized using Next.js Image component
- Animations use CSS transforms for better performance
- Lazy loading implemented for below-fold content
- Code splitting via Next.js automatic optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to fork this project and customize it for your own portfolio!

## License

MIT License - feel free to use this for your own portfolio.

## Support

If you encounter issues:
1. Check that all dependencies are installed
2. Verify environment variables are set correctly
3. Ensure Node.js version is 18.x or higher

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Email powered by [Resend](https://resend.com/)

---

Made with ❤️ using modern web technologies
