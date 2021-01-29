## Story Blog

### A MEN Stack Web App.

This Web app was built following a Traversy Media Express tutorial.

It uses **Pug** to render the view and **Materialize CSS** for styling although Handlebar view engine was used in the tutorial.

Both **Passport-Local** Strategy and **Google Oauth-2** is provided for users registeration and validation

**Mongoose** is used for **Mongodb** Support

The database is saved in Mongodb Atlas Cloud Services.

### How the App works.
The app has two models Users and Stories. A user can create multiple stories and a story can either be private or public. Private stories can only be viewed by the user that created them

The two models are joined i.e stories has a reference for users.

The app allows registerd users to perform **CRUD Operations** that is to create, read, update and delete Stories. a user can only update and delete stories that he owns    
