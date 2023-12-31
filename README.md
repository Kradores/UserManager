# UserManager

This is a web application that manages users and their credits.

## Instalation
To run this app, **docker is required**, then you can run command from UserManager folder:
```
docker-compose up
```

## Usage
To check how UI works and see all its functionalities, use URL:
```
http://localhost:3000
```

But if you want to check the API only, you can access it by URL:
```
http://localhost:5000
```

## Build
App consists of 3 parts:
- UI: Node.js and React
- API: C# and ASP.NET Core
- Database: PostgreSQL

## Functionality
There is only 1 page, that has a table, which shows all users and their credits. It was created with pagination in mind.

It is possible to add a user, by clicking Create User button. By using buttons from action column you can edit or delete a user.
Also you can double click directly on the field that you wish to edit and make the changes, after changes are done you should use Save button, that appears in action column on edit.
