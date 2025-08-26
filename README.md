# Expense Tracker Dashboard

A modern and responsive expense tracking dashboard built with Next.js, featuring analytics, dark/light mode, and data export capabilities.

## Features

- 🎨 **Modern UI**: Clean design with Tailwind CSS and Framer Motion animations
- 📊 **Analytics**: Interactive charts showing spending patterns and budget tracking
- 🌓 **Dark/Light Mode**: Toggle between themes with persistent storage
- 📱 **Responsive**: Fully responsive design for desktop and mobile
- 🔍 **Search & Filter**: Find expenses by description or category
- 📤 **Export**: Download data as CSV or PDF
- ⚡ **Fast**: Built with Next.js for optimal performance

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Chart.js with React-Chartjs-2
- **Icons**: Lucide React
- **PDF Export**: jsPDF
- **TypeScript**: Full type safety

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── components/
│   ├── Dashboard/          # Dashboard-specific components
│   └── Layout/             # Layout components (Nav, Sidebar)
├── context/                # React contexts (Theme)
├── data/                   # Mock data and types
├── pages/                  # Next.js pages
├── styles/                 # Global styles
└── public/                 # Static assets
```

## Components

### Dashboard Components
- **DashboardHeader**: Greeting, date filter, and add expense button
- **OverviewCards**: Key metrics with animations
- **ExpenseTable**: Interactive table with search and filtering
- **Charts**: Pie chart, line chart, and budget tracking visuals
- **ExportData**: CSV and PDF export functionality

### Layout Components
- **Navigation**: Top navigation with logo, theme toggle, and profile
- **Sidebar**: Navigation menu with active states
- **Layout**: Main layout wrapper

## Customization

### Colors
Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: { /* Blue shades */ },
  indigo: { /* Indigo shades */ },
  success: { /* Green shades */ },
  danger: { /* Red shades */ },
}
```

### Data
Replace mock data in `data/mockData.ts` with your actual data source.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT License - feel free to use this project for personal or commercial purposes.
