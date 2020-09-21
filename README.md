# About the Project

I created this project to demonstrate to my team how to use Python/Flask to build a Rest API, and use React to access the backend service, as an additional technology to what the team has been using (Node.js/Express, Java/Spring Boot).

This app solved an imaginary problem.
```
The flatmates borrow money from each other frequently and have trouble remembering who owes whom, and how much.
```
The project name comes from a BBC drama on iPlayer now.

# Technology Stacks

- [x] python 3
- [x] Flask
- [x] Rest api
- [x] Pipenv
- [x] React
- [ ] Grafana
- [ ] Docker
- [ ] Elastic Beanstalk deployment
- [ ] Heroku
- [ ] Circle ci
- [ ] Pytest
- [ ] Let's Encrypt

# API Specification

#### User object
```json
{
  "name": "adam",
  "owes": {
    "chris": 4.0
  },
  "owed_by": {
    "bob": 6.5,
    "dan": 2.75,
  },
  "balance": 5.25
}
```

#### Methods

| Description | HTTP Method | URL | Payload Format | Response w/o Payload | Response w/ Payload |
| --- | --- | --- | --- | --- | --- |
| List all users | GET | /api/users | N/A |  `<all users>`|
| List a user | GET | /api/user?name=`<username>`| N/A |  `<User object for the user>`|
| Create user | POST | /api/add| `{"user":<name of new user (unique)>}` | N/A | `<User object for new user>` |
| Create lend | POST | /api/lend | `{"lender":<name of lender>,"borrower":<name of borrower>,"amount":5.25}` | N/A | `{"users":<updated User objects for <lender> and <borrower> (sorted by name)>}` |


## Running the tests

To run the tests, run `pytest test_flat_mates.py`

Alternatively, run the pytest module:
`python3 -m pytest test_flatmates.py`
