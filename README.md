# Homework 4 - CSC 515 - Advanced Internet Programming #
**Due Date: 3/29/2019**

## Objective ##
Use HTML5 pushstate routing to display the university calendar events for a specified day. This is a continuation of Homework 3.

## Specifications ##
* Get the events from [http://people.missouristate.edu/chadkillingsworth/csc590/calendar/](http://people.missouristate.edu/chadkillingsworth/csc590/calendar/)
   - The URL takes a single query parameter `date` which returns events for that date. '?date=03/20/2017'
* Add user interface elements to allow the user to move forward and backward by date. When the page is initially loaded, it should show the current day's events.
    Users should be able to step through dates infinitely (as long as there is data) in either direction.
* Use single page application routing to ensure that the browser's backward and forward buttons continue to work and that the URL is sharable.
* Provide a progress indicator to show that data is being retrieved
* Handle errors gracefully (tell the user an error was encountered and let them retry)
* Use the `before` hook in the `devServer` for webpack to make your routing work.
* You may not use any libraries in the browser - only native APIs.

### Notes about the API
 * The API url will randomly issue a 500 error. This is to allow for you to implement error handling.
 * The API will randomly delay the request for 3 seconds. This is to allow you to implement a progress indicator.
 * The API will issue a 404 error if the `date` parameter is not present or in an invalid format.
 * Make sure to use the "network" section of your developer tools to watch the response traffic.

## Local Development
Use webpack to create a local web environment. Wireup a "start" script in the
package.json file so that `npm start` automatically starts the webpack server.

```js
npm install
npm start
```

## How To Submit The Assignment

 1. Clone the repository locally.
 2. Create a feature branch to work on your code.
 3. Use `npm init` to start your npm project.
 4. Commit and push often while you develop.
 5. When ready to submit, create a pull request on GitHub targeting the master branch .

If you have questions during this process, create the pull request early and ask the questions there. Email me a link to the pull request.
