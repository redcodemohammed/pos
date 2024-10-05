# POS App

This is a Point of Sale (POS) system built with Next.js.

## Installing POS System

To install the POS System, follow these steps:

1. Clone the repository
   ```
   git clone https://github.com/yourusername/pos.git
   ```
2. Navigate to the project directory
   ```
   cd pos
   ```
3. Install the dependencies
   ```
   npm install
   ```

## Using the system

Follow these steps:

1. To run the development server:

   ```
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

2. To build the application for production:

   ```
   pnpm run build
   ```

3. To start the production server:

   ```
   pnpm run start
   ```

4. To lint the code:
   ```
   pnpm run lint
   ```

## Assumptions Made During Development

1. The application is designed to run on modern web browsers that support ES6+ features.
2. The user has basic knowledge of operating a POS system.
3. The system is designed for a single store/location use.
4. The application requires an internet connection for full functionality.
5. The application is designed with a dark mode option, as indicated by the use of the `next-themes` package.
6. The system is set up to use React Query for data fetching and state management.
7. Form handling and validation are done using React Hook Form and Zod.
8. The UI is built using Shadcn/UI Radix UI components and styled with Tailwind CSS.
9. The application is using PNPM as the package manager.
10. The application assumes that the api is running on `http://localhost:6969/api/v1`, but this can be changed in the `.env` file.

## Technologies Used

1. Next.js
2. React
3. TypeScript
4. Tailwind CSS
5. Zustand
6. React Hook Form
7. Tanstack Query
8. Radix UI
