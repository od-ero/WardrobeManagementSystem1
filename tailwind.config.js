module.exports = {
    // Paths to all of your template files
    content: ['./src/**/*.{js,jsx,ts,tsx}'], // This is where Tailwind will look for your classes

    theme: {
        extend: {
            colors: {
                // Custom colors
                primaryBlue: '#007bff',  // Custom blue color
                primaryGreen: '#28a745', // Custom green color
                primaryRed: '#EF4444', // Custom red color
                primaryWhite: '#FFFFFF', // Custom white color
                primaryBlack: '#000000', // Custom black color
                // Custom gray shades
                lightGray: '#F3F4F6',  // Light gray color
                darkGray: '#2D3748',   // Dark gray color
            },
        },
    },

    plugins: [
        // Tailwind CSS plugin for forms to style form elements
        require('@tailwindcss/forms'),
    ],
};
