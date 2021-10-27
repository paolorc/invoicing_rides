# Invo Passenger Frontend App

## Description

- This is the frontend side of the invo_passenger project!
- It allow us to login, see our rides, select the ones who were completed and start creating our invoicing process!
- Be careful, we can just create invoices from COMPLETED rides and must be one invoice per ride, we cannot generate duplicated ones, but don't worry the application won't let you make those mistakes ;)

## Tech stack and strategies

- So we used React JS!
- We did not have the need to use redux, just hooks!
- We have our design kit with MaterialUI
- It an application not based on server side render, for now but it's ok! Due to is only for internal users ;)

## Project Structure:

- src
  - adapters `This is for anything outside our application, and needs to be configured from there`
  - components `For our couple o componets`
  - hooks `All the amazing hooks live here!`
  - pages `Our pages where we can interact and merge some components inside`
  - services `This is our intermediate layer to call our api services`
  - theme `I's barely used now but it's a good practice to manage themes at some point`
  - utils `It's for any utility function and reusable`

## Run the app

To run this application, we just need to make:

```
npm install && npm start
```

And will live in our `localhost:3000` take a look ;)

## TODO:

- We need some cleanups in our pages and maybe decouple a bit more our components in small ones, following the atomic design <3
- Improve Hooks
- Improve Styling
- Add tests if possible

```
HAPPY CODING!


Paolo Reyes, Lima Peru, 27 Oct 2021
```
