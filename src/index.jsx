import React from 'react';
import ReactDOM from 'react-dom';


class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
    }
    addSubmitHandler = (event) => {
        event.preventDefault();
        fetch('/api/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: this.state.newuser
            })
        }).then(() => window.open("/api/user?name=" + this.state.newuser, "_self"))
    }
    addChangeHandler = (event) => {
        this.setState({ newuser: event.target.value });
    }
    searchSubmitHandler = (event) => {
        event.preventDefault();
        window.open("/api/user?name=" + this.state.username, "_self")
    }
    searchChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    borrowSubmitHandler = (event) => {
        event.preventDefault();
        fetch('/api/borrow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lender: this.state.lender,
                borrower: this.state.borrower,
                amount: parseFloat(this.state.amount).toFixed(2)
            })
        }).then(() => window.open("/api/user?name=" + this.state.borrower, "_self"))
    }
    lenderChangeHandler = (event) => {
        this.setState({ lender: event.target.value });
    }
    borrowerChangeHandler = (event) => {
        this.setState({ borrower: event.target.value });
    }
    amountChangeHandler = (event) => {
        this.setState({ amount: event.target.value });
    }

    render() {
        const fmstyle = {
            fontFamily: "Arial",
            textAlign: "center"
        };

        const inputstyle = {
            border: "thin solid green",
            padding: "0.5rem",
            margin: "1rem"
        }
        return (
            <div style={fmstyle}>
                <h1> Flatmates</h1>
                <p>
                    The flatmates often borrow money from each other. They need an app to log who owes whom and how much.
                </p>
                <h3>
                    <a href="/api/users">Users</a>
                </h3>
                <p>
                    <form onSubmit={this.addSubmitHandler}>
                        <input
                            type='text' maxlength="10" size="10" placeholder=" Add User" name="newuser" style={inputstyle}
                            onChange={this.addChangeHandler}
                        />
                    </form>
                </p>
                <p>
                    <form onSubmit={this.searchSubmitHandler}>
                        <input
                            type='text' maxlength="10" size="10" placeholder="Search User" style={inputstyle}
                            onChange={this.searchChangeHandler}
                        />
                    </form>
                </p>
                <p>
                    <form onSubmit={this.borrowSubmitHandler}>
                        <input
                            type='text' maxlength="8" size="8" placeholder="lender" style={inputstyle}
                            onChange={this.lenderChangeHandler}
                        />
                        <input
                            type='text' maxlength="8" size="8" placeholder="borrower" style={inputstyle}
                            onChange={this.borrowerChangeHandler}
                        />
                        <input
                            type='text' maxlength="6" size="6" placeholder="amount" style={inputstyle}
                            onChange={this.amountChangeHandler}
                        />
                        <input
                            type='submit' value="Borrow"
                        />
                    </form>
                </p>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('index'));