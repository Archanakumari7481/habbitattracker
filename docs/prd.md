# Habit Tracker Requirements Document

## 1. Application Overview

### 1.1 Application Name
Habit Tracker

### 1.2 Application Description
A high-performance web-based habit tracking application designed to help users build, track, and analyze daily habits with comprehensive features including productivity tools, analytics, focus modes, reminders, routines management, and long-term insights.

## 2. Core Features
\n### 2.1 User Authentication
- Google OAuth login (using OSS Google login method)
- Email and password login
- Automatic login after signup
- Error handling and validation
- Secure logout functionality
- No guest mode access

### 2.2 Top Navigation Bar
- Application logo and name display (left-aligned)
- Account dropdown menu:\n  - Display user name and email
  - Edit name functionality
  - Change password option
  - Sign out button\n- Dark/Light mode toggle switch
- Month selector (January to December)
- Year selector with manual input

### 2.3 Action Bar
- Add new habit with name and priority settings
- Import habits from another month/year
- Export habits to CSV format
\n### 2.4 Statistics Dashboard
- To-Do list with live synchronization
- Water reminder system:\n  - Timer functionality
  - Hydration counter
  - Browser notifications
- Focus mode:
  - Stopwatch and Pomodoro timer
  - Session saving capability
  - Full-screen mode
- Pinned shortcuts:\n  - CRUD operations
  - Category management
  - Drag and drop functionality
  - Open in new tab option

### 2.5 Habit Tracking
- College row status per day:
  - C (College - red indicator)
  - F (Fita - blue indicator)
  - H (Holiday - green indicator)
  - Unmarked (grey indicator)
- Daily notes:
  - Auto-save functionality
  - Rich text editor
  - Full-screen editor mode
- Habit table:
  - Habit name display
  - Priority level
  - Streak counter
  - Daily status (Done/Skip/Empty)
  - Reminder bell icon
  - Rename and delete options
  - Horizontal scrolling for dates

### 2.6 Analytics
- Daily, weekly, and monthly statistics
- Heatmap visualization
- Calendar analytics view
- Focus session analysis
- Completion and skip percentages\n
### 2.7 Additional Sections
- Analytics dashboard
- Shortcuts management
- To-Do list\n- Calendar view
- College routines and syllabus editor
- Sleep tracker
- 24-hour activity tracker
- Goals tracking system

## 3. Technical Requirements

### 3.1 Frontend Technologies
- React.js framework
- HTML, CSS, JavaScript
- Tailwind CSS with Shadcn-style UI components
- Mobile-first responsive design
- Dark/Light theme support
- Lazy loading and virtual scrolling optimization

### 3.2 Backend Technologies
- Node.js with Express framework
- RESTful API architecture
- JWT authentication\n\n### 3.3 Database
- MongoDB (primary database)
- MySQL (alternative SQL version)
- Proper schemas and data relations

### 3.4 State Management
- Persist selected month and year
- State preservation across page reloads and full-screen mode
- Accurate restoration of previous month data
\n### 3.5 Performance Optimization
- Fast loading times
- Minimal DOM manipulation\n- Optimized rendering\n- Elimination of unnecessary page reloads

## 4. Design Style\n
### 4.1 Color Scheme
- Primary colors: Modern blue (#3B82F6) and neutral grey (#6B7280)
- Status indicators: Red (College), Blue (Fita), Green (Holiday), Grey (Unmarked)
- Dark mode: Deep charcoal background (#1F2937) with light text
- Light mode: Clean white background (#FFFFFF) with dark text

### 4.2 Visual Details
- Rounded corners (8px border-radius) for cards and buttons
- Subtle shadows for depth and hierarchy
- Clean, minimal borders
- Modern icon set with consistent styling
- Smooth transitions and hover effects

### 4.3 Layout Structure
- Card-based layout for dashboard sections
- Grid system for habit tracking table
- Responsive breakpoints for mobile, tablet, and desktop
- Fixed navigation bar with scrollable content area
- Horizontal scrolling for date columns in habit table