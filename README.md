# ShopNook: E-Commerce Shopping Cart Application

## Overview
**ShopNook** is a user-friendly e-commerce shopping cart application developed using **Spring Boot** for the backend and **Angular** for the frontend. Customers can browse products, add items to their shopping cart, and securely complete their transactions. The application integrates a **MySQL** database for managing user data, product inventory, and order history, while **Stripe API** ensures secure payment processing. The application also includes advanced security features with **JWT-based authentication**, **OAuth2**, **OpenID Connect**, and **Okta** for user authentication and authorization.

## Core Functionalities

1. **User Registration & Authentication**  
   - Secure user registration and login.  
   - **JWT-based authentication** for secure sessions and **Okta** integration for enhanced security.

2. **Product Catalog**  
   - Browse a wide range of products with details like name, description, price, and images.  
   - Advanced search options for easy product discovery.

3. **Shopping Cart Management**  
   - Add/remove products to/from the shopping cart with real-time updates.  
   - Modify cart contents before proceeding to checkout.

4. **Secure Checkout**  
   - Secure payment processing via **Stripe API**.  
   - Safe and efficient credit card transactions during checkout.

## Technologies Used
- **Back-End**:
  - **Spring Boot** to create RESTful APIs for managing business logic and data.
  - **JWT-based authentication** for secure user login and session management.
  - **OAuth2** and **OpenID Connect** for secure, standards-based authorization and authentication.
  - **Okta** for identity and access management.
  - **HTTPS & SSL/TLS** for secure data transmission.
- **Front-End**:
  - **Angular** (with **HTML**, **CSS**, **TypeScript**) for a dynamic user interface.
- **Database**:
  - **MySQL** for storing user, product, and order data.
- **Payment Processing**:
  - **Stripe API** for secure, real-time payment processing.

## Demo
For a detailed demonstration of the application, including screenshots and an analysis of the results, please refer to the **Documentation.pdf** located in the **01-ausarbeitung** folder of this repository. The documentation includes visual aids in the section **"Ergebnisse und Analyse"** for a deeper understanding of the application’s functionality and user interface.

## Acknowledgments
Special thanks to **Prof. Dr. Andreas Lux** for his guidance and support throughout the project.
