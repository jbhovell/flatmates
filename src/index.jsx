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
                'Accept': 'application/json',
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

        const liststyle = {
            color: "blue",
            textDecoration: "underline"
        }
        return (
            <div style={fmstyle}>
                <h1> Flatmates</h1>
                <p>
                    The flatmates borrow money from each other frequently and have trouble remembering who owes whom, and how much.
                </p>
                <h3>
                    <a href="/api/users">Users</a>
                </h3>
                <p>
                    <h3 style={liststyle}>Add</h3>
                    <form onSubmit={this.addSubmitHandler}>
                        <input
                            type='text' maxlength="6" size="6" placeholder="name" name="newuser"
                            onChange={this.addChangeHandler}
                        />
                    </form>
                </p>
                <p>
                    <h3 style={liststyle}>Search</h3>
                    <form onSubmit={this.searchSubmitHandler}>
                        <input
                            type='text' maxlength="6" size="6" placeholder="name"
                            onChange={this.searchChangeHandler}
                        />
                    </form>
                </p>
                <p>
                    <h3 style={liststyle}>Borrow</h3>
                    <form onSubmit={this.borrowSubmitHandler}>
                        <input
                            type='text' maxlength="6" size="6" placeholder="lender"
                            onChange={this.lenderChangeHandler}
                        />
                        <input
                            type='text' maxlength="6" size="6" placeholder="borrower"
                            onChange={this.borrowerChangeHandler}
                        />
                        <input
                            type='text' maxlength="6" size="6" placeholder="amount"
                            onChange={this.amountChangeHandler}
                        />
                        <input
                            type='submit' value="Submit"
                        />
                    </form>
                </p>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('index'));