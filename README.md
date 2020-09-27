# About the project

I built this app to demo React. I am still learning the frontend framework and making improvements to this project.

```
The flatmates often borrow money from each other. They need an app to log who owes whom and how much.
```

The project name comes from a BBC drama on iPlayer now.

# It uses

- [x] React
- [x] python 3
- [x] Flask
- [x] Rest api
- [ ] Heroku
- [ ] SSL cert
- [ ] Docker
- [ ] Nginx
- [ ] CircleCI

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

