// src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* This script allows Tailwind classes to work instantly */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
