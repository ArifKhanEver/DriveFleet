# 🚗 DriveFleet - Premium Car Rental Platform

A modern, high-performance, and responsive Full-Stack Car Rental Application built using the **MERN Stack** (Next.js App Router, Node.js, Express, and MongoDB). The platform features an intuitive vehicle discovery workflow, advanced live-pricing calculation algorithms, and a streamlined booking dashboard.

---

## 🚀 Key Features

### 1. Vehicle Showcase & Dynamic Filtering
* **Brand Tabs & Filtering:** Seamless real-time car filtering by top automotive brands using `framer-motion` layout animations.
* **Live Status Indicator:** Visually dynamic availability badges (`Available` with blinking green pulse / `Rented` with solid rose indicator).
* **Responsive Layout:** Beautiful modern grid architecture using Tailwind CSS, structured for mobile, tablet, and widescreen layouts.

### 2. Advanced Car Details Page
* **Sticky Information Hub:** Dual-column view featuring a large optimized image gallery on the left and a sticky full-specification panel on the right.
* **Comprehensive Specifications:** At-a-glance visualization of core criteria including Passenger Capacity, Fuel Type, Transmission, Production Year, Pickup Point, and Luggage Space.

### 3. Smart Booking Modal (Powered by Hero UI)
* **Date-Range Restriction:** Smart validation on date-pickers prevents past-date selection and ensures drop-off dates are valid relative to pick-up entries.
* **Driver-Addon Provision:** Interactive toggle switch allowing users to recruit professional drivers for an additional nominal fee per day.
* **Live Price Calculator Summary:** JavaScript-driven dynamic calculation engine providing split-billing estimates (Base Rent + Driver Allowance = Total Balance) before submission.

### 4. Personal Booking Dashboard ("My Bookings")
* **Tracking Ledger:** Clean interface showing authenticated user bookings.
* **Dynamic Auditing:** Displays automated scheduling instances utilizing `new Date()` mapping, structured tracking logs, status tracking, and cancelation utilities.

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** Next.js (React 19, Client Component Architecture)
* **Styling & UI Components:** Tailwind CSS & Hero UI (formerly NextUI)
* **Animations:** Framer Motion
* **Iconography:** Lucide React
* **Authentication:** Better auth, JWT
* **State Management & UI Control:** React Hooks (`useState`, `useEffect`, `useDisclosure`)
* **Backend Runtime:** Node.js with Express.js *(Ready for integration)*
* **Database Cluster:** MongoDB Atlas *(Schema ready)*

---

## 📂 Core Data Models & Schemas

### Vehicle Input Field Schema
When adding or managing a car entry, the data object maps the following structural schema properties:
```json
{
  "name": "String (e.g., Cadillac Escalade Platinum)",
  "price": "Number (Daily Rent Rate in USD)",
  "carType": "String (SUV / Sedan / Hatchback / Luxury / Sports)",
  "image": "String",
  "seats": "String (Seat Capacity, e.g., 5 Persons)",
  "location": "String (Detailed Pickup Point Address)",
  "description": "String (Rich text paragraph summarizing vehicle features)",
  "availabilityStatus": "String (Available / Rented)"
}