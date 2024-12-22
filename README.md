# Fullstack project Spring boot 3, Angular 18, Tailwind CSS, PostgreSQL, Kinde, Stripe

Monorepo Online Shop.

### Used Technologies:
- Angular, Tailwind CSS, DaisyUI for the frontend
- Java Spring for the backend
- PostgreSQL, Docker for database management and containerization
- Stripe for payment integration
- Kinde for user registration, login, and password reset

### Fetch dependencies
``npm install``

You will need to create an .env file at the root of the onlineshop-backend folder with the following values :

````
KINDE_CLIENT_ID=<client-id>
KINDE_CLIENT_SECRET=<client-secret>
STRIPE_API_KEY=<stripe-api-key>
STRIPE_WEBHOOK_SECRET=<stripe-webhook-secret>
````

Make sure to insert your own values for clientId and stripePublishableKey in the environments/* files. These values should be replaced with the appropriate credentials for your application to ensure proper functionality.

For Stripe to work correctly, you need to run the following command in the terminal:

```sh
stripe listen --forward-to localhost:8080/api/orders/webhook
```

## Manage the frontend

To run the dev server for your app, use:

```sh
npx nx serve onlineshop-frontend
```

To create a production bundle:

```sh
npx nx build onlineshop-frontend
```

To see all available targets to run for a project, run:

```sh
npx nx show project onlineshop-frontend
```

## Manage the Backend

To run the dev server for your app, use:

```sh
npx nx serve onlineshop-backend
```

To create a production bundle:

```sh
npx nx build onlineshop-backend
```

To see all available targets to run for a project, run:

```sh
npx nx show project onlineshop-backend
```
