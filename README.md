Project Information:
1. The Porject contains Component testing of Login Component and Auth Serice class using Jest.

File Structure:
├── src/
│   ├── app/
│   │   ├── login/
│   │   │   ├── login.component.ts              # Login component class
│   │   │   ├── login.component.html            # Login component template
│   │   │   ├── login.component.css             # Login component styles
│   │   │   ├── login.componenttest.spec.ts     # UI interaction tests //for review
│   │   │   ├── login.componentunittest.spec.ts # Unit tests //for review
│   │   │   └── login.integrationtest.spec.ts   # Integration tests //for review
│   │   ├── auth.service.ts                     # Authentication service
│   │   ├── auth.service.spec.ts                # Auth service tests //for review
│   │   ├── app.component.ts                    # Root app component //not for review
│   │   ├── app.component.html                  # Root app template //not for review
│   │   ├── app.component.css                   # Root app styles //not for review
│   │   ├── app.config.ts                       # App configuration //not for review
│   │   └── app.routes.ts                       # App routing //not for review
│   ├── main.ts                                 # Application entry point
│   ├── index.html                              # Main HTML file
│   └── styles.css                              # Global styles
├── jest.config.ts                              # Jest configuration
├── setup-jest.ts                               # Jest setup file
├── package.json                                # NPM dependencies and scripts
├── tsconfig.json                               # TypeScript configuration
├── tsconfig.spec.json                          # TypeScript test configuration
├── angular.json                                # Angular CLI configuration
├── README.md                                   # Project documentation
└── node_modules/
