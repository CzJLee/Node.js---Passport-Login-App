# Node.js & Passport Login App

This is a simple registration and login web app built using Node.js, Express, MongoDB, and Passport. A live working example can be seen [here](https://passport.czjlee.com). 

This project was built following [this example](https://www.youtube.com/watch?v=6FOq4cUdH8k).
The source code for the original project can be found [here](https://github.com/bradtraversy/node_passport_login). 

- [Node.js & Passport Login App](#nodejs--passport-login-app)
	- [Front End](#front-end)
		- [HTML](#html)
		- [JS](#js)
		- [CSS](#css)
	- [Express](#express)
	- [MongoDB](#mongodb)
	- [Passport](#passport)
		- [Authentication](#authentication)
	- [Alerts](#alerts)

## Front End

There are no front end facing html files, nor an index.html in the public_html directory. 

### HTML

All of the HTML is rendered using the templating engine for Express, [EJS](https://ejs.co). 

### JS

The JS alerts and buttons are built using [Bootstrap](Bootstrap). 

### CSS

The CSS is a Bootstrap theme from [Bootswatch](https://bootswatch.com) called [Journal](https://bootswatch.com/journal/).

## Express

Express is used for the back end routing. It uses EJS as a templating engine to display webpages, and also allows relevant alerts to display to the user. 

## MongoDB

MongoDB Atlas is used to store user login information including name, email, and a hashed password. The passwords are hashed using the [BCrypt algorithm](https://en.wikipedia.org/wiki/Bcrypt) and [bcryptjs module](https://www.npmjs.com/package/bcryptjs). 

The MongoDB Atlas connection string is saved in `/config/keys.js`. An example of the format can be seen in `/config/keys_example.js`. 

```
mongodb+srv://<username>:<password>@<data.base>.mongodb.net/users?retryWrites=true&w=majority
```

## Passport

[Passport](http://www.passportjs.org) is used to handle login and user sessions. Only the [local strategy](http://www.passportjs.org/packages/passport-local/) is implemented. 

### Authentication

Passport is also used to authenticate users to allow only logged in users to view the [dashboard](https://passport.czjlee.com/dashboard). 

## Alerts

Alerts are displayed to the user at the registration and login screens when information is filled in incorrectly, or to confirm registration. This is done using `connect-flash` and `express-session`. The messages are displayed using EJS. 