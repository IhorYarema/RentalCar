# Project name

Rental Car

## Short Description

This project allows users to book cars online. Users can choose a booking date, leave a comment and submit the form, and also select favorite cars that will be saved at checkout. A filter has been created for easy searching.

## Key features

- Car booking via interactive form
- Date selection via calendar
- Form validation with error messages
- Display messages about successful booking
- Redux support for state management
- Filter by price, brand, and mileage range

## Using components

BookForm.jsx — main booking form. Uses Formik and Yup for validation.

Calendar.jsx — calendar component for date selection. Works with Formik via setFieldValue.

Filters.jsx — filter component, for filtering by brand, price, mileage. Used on the catalog page.

Loader.jsx — displays a loading indicator during submission.

useFormikToastErrors.js — hook for displaying form errors via toast messages.

submitBooking.js — utility for form submission and integration with Redux.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/car-booking-app.git
   ```
2. Go to the project directory:

   cd car-booking-app

3. Install dependencies:

   npm install

## Using

Start the project:

npm start

Open in browser: http://localhost:3000

## Author

Name: Ihor Yarema

Contacts: u96ok69@gmail.com

GitHub: [IhorYarema] (https://github.com/IhorYarema)
