# About the project

I built this application to demonstrate the React framework to my teammates (all are backend developers). I used Python and Flask to create the backend REST API. 

I am still learning React and making improvements to this project while learning.

### Scenario:
```
The flatmates often borrow money from each other. They need an app to log who owes whom and how much.
```

The project name comes from a BBC drama on iPlayer now.

The front page provides a simple user interface for listing, adding, searching users and borrowing money.

<img src="static/flatmates.png">


# It uses

- [x] React
- [x] Webpack
- [x] Babel
- [x] python 3
- [x] Flask
- [x] Rest api
- [ ] SQLite
- [ ] Pytest
- [ ] Jest for React
- [ ] SSL cert
- [ ] Docker 
- [ ] Nginx

# API specification

#### User object

```json
{
  "name": "adam",
  "owes": {
    "chris": 4.0
  },
  "owed_by": {
    "bob": 6.5,
    "dan": 2.75
  },
  "balance": 5.25
}
```

#### Methods

| Description    | HTTP Method | URL                         | Payload Format                                                            | Response w/o Payload         | Response w/ Payload                                                             |
| -------------- | ----------- | --------------------------- | ------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------- |
| List all users | GET         | /api/users                  | N/A                                                                       | `<all users>`                |
| List a user    | GET         | /api/user?name=`<username>` | N/A                                                                       | `<User object for the user>` |
| Create user    | POST        | /api/add                    | `{"user":<name of new user (unique)>}`                                    | N/A                          | `<User object for new user>`                                                    |
| Create borrow  | POST        | /api/borrow                   | `{"lender":<name of lender>,"borrower":<name of borrower>,"amount":5.25}` | N/A                          | `{"users":<updated User objects for <lender> and <borrower> (sorted by name)>}` |

## Running the tests

## Running the application

```
npm install
npm run dev
python3 server.py
```
navigate to http://localhost:3000 in a browser


## To Do: 

load all the users and balances in a table without search
