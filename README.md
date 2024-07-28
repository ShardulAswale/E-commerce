# E-Commerce Dashboard with Dynamic Product Filtering

## Overview
This project is an advanced e-commerce dashboard application built using React and Material-UI. It features dynamic product filtering based on user cart interactions and an adaptive interface that ensures optimal viewing across various devices.

## Features

### Responsive Dashboard Layout
- **Flexible Grid System**: Uses Material-UI’s Grid system to ensure the dashboard adjusts seamlessly to different screen sizes.
- **Adaptive Navigation**: Includes a collapsible sidebar that transforms into a hamburger menu for better usability on smaller screens.

### Advanced Product Filtering
- **Cart-Based Filtering**: Automatically filters products based on the user’s cart contents, ensuring users can easily find items from categories already in their cart while excluding items they have already added.
- **Real-Time Updates**: Utilizes React’s state management and `useEffect` hook to ensure product listings are updated in real-time as items are added or removed from the cart.

### Comprehensive Product and Cart Management
- **Product Listing**: Displays a detailed list of products with relevant information such as title, price, description, category, and image.
- **Cart Operations**: Allows users to add and remove items from the cart with real-time feedback and updates to the product listing.

### User Interface Components
- **Navigation Bar**: A top bar navigation that includes user actions and dynamically adjusts to include a menu button on smaller screens.
- **Side Drawer**: A sidebar that provides navigation options and collapses into a drawer for smaller screen devices.
- **Product Display**: Dedicated components for displaying full product lists (`Products`) and a minimized view (`MiniProducts`) based on user cart interactions.

### Routing and Navigation
- **React Router Integration**: Uses `react-router-dom` to manage navigation between different views such as Products, Cart, Login, Users, Invoice, and Orders.
- **Drawer Navigation**: Ensures smooth navigation within the sidebar and main content areas, maintaining context and state across different routes.

## Installation

1. **Install dependencies**
    ```bash
    npm install --legacy-peer-deps
    ```

2. **Start the development server**
    ```bash
    npm run dev
    ```


## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

This project is a comprehensive solution for dynamic product management and responsive design, offering a robust platform for modern e-commerce applications.
