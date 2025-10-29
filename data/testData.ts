export const testData = {
  users: {
    validUser: {
      email: 'test.user@example.com',
      password: 'ValidPassword123!',
      firstName: 'Test',
      lastName: 'User',
      phone: '+1234567890'
    },
    adminUser: {
      email: 'admin@example.com',
      password: 'AdminPassword123!',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    },
    invalidUser: {
      email: 'invalid-email',
      password: '123',
      firstName: '',
      lastName: ''
    }
  },
  
  urls: {
    homepage: '/',
    loginPage: '/login',
    dashboardPage: '/dashboard',
    profilePage: '/profile',
    settingsPage: '/settings'
  },
  
  searchTerms: {
    validSearches: [
      'getting started',
      'installation',
      'configuration',
      'examples'
    ],
    invalidSearches: [
      'xyzabc123',
      '!@#$%^&*()',
      ''
    ]
  },
  
  formData: {
    contactForm: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test Inquiry',
      message: 'This is a test message for the contact form.'
    },
    registrationForm: {
      username: 'testuser123',
      email: 'testuser@example.com',
      password: 'SecurePassword123!',
      confirmPassword: 'SecurePassword123!',
      firstName: 'Test',
      lastName: 'User',
      dateOfBirth: '1990-01-01',
      agreeToTerms: true
    }
  },
  
  apiEndpoints: {
    users: '/api/users',
    auth: '/api/auth',
    products: '/api/products',
    orders: '/api/orders'
  },
  
  timeouts: {
    short: 5000,
    medium: 15000,
    long: 30000,
    veryLong: 60000
  },
  
  errorMessages: {
    invalidLogin: 'Invalid email or password',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    passwordMismatch: 'Passwords do not match',
    networkError: 'Network error occurred'
  },
  
  successMessages: {
    loginSuccess: 'Successfully logged in',
    registrationSuccess: 'Account created successfully',
    profileUpdated: 'Profile updated successfully',
    passwordChanged: 'Password changed successfully'
  }
};

export default testData;