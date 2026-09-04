/**
 * Centralized test data fixtures and constants
 */
export const TEST_DATA = {
  routes: {
    home: '/',
    services: '/services',
    blindsShades: '/blinds-shades',
    zebra: '/zebra',
    roller: '/roller',
    customPrint: '/custom-print',
    about: '/about',
    contact: '/contact',
    freeEstimate: '/free-estimate',
    employee: '/employee',
  },
  contactForm: {
    validUser: {
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '6803162022',
      email: 'jane.doe.test@zellablinds.com',
      message: 'Automated test inquiry for custom zebra shades consultation.',
    },
    invalidPhone: '123abc456',
    invalidEmail: 'invalid-email-address',
  },
  freeEstimateForm: {
    validEstimate: {
      firstName: 'Michael',
      lastName: 'Smith',
      phone: '7132086620',
      email: 'michael.smith.test@zellablinds.com',
      message: 'Automated inquiry requesting motorized roller blinds estimate.',
    },
  },
  validationMessages: {
    fieldRequired: 'This field is required',
    invalidPhone: 'Please enter a valid phone number',
    invalidEmail: 'Please enter a valid email address',
  },
  pageTitles: {
    home: 'Custom Design Blinds & Shades | Zella Blinds | Zella Blinds',
    contact: 'Custom Window Coverings by Zella Blinds in Upstate New York | Zella Blinds',
    freeEstimate: 'Custom Window Coverings by Zella Blinds in Upstate New York | Zella Blinds',
    employee: 'Zella Blinds: Custom Blinds & Shades Experts | Zella Blinds',
  },
  auth: {
    invalidPassword: 'WrongPassword123!',
  },
};
