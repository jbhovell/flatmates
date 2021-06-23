import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: ['alice', 'bob', 'mark', 'jianfang']};
        
    }
    addSubmitHandler = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/api/add',
            data: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                user: this.state.newuser
            }
        }).then(() => window.open("/api/user?name=" + this.state.newuser, "_self"))
    }
    searchSubmitHandler = (event) => {
        event.preventDefault();
        window.open("/api/user?name=" + this.state.username, "_self")
    }
    borrowSubmitHandler = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/api/borrow',
            data: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                lender: this.state.lender,
                borrower: this.state.borrower,
                amount: parseFloat(this.state.amount).toFixed(2)
            }
        }).then(() => window.open("/api/user?name=" + this.state.borrower, "_self"))
    }

    stateChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    async render() {
        const fmstyle = {
            fontFamily: "Arial",
            textAlign: "center"
        };
        const boxstyle = {
            fontFamily: "Arial",
            textAlign: "center",
            borderStyle: "dashed",
            borderWidth: "1px",
            width: "50%",
            margin: "auto"
        };
        const inputstyle = {
            border: "thin solid green",
            padding: "0.5rem",
            margin: "1rem",
            textAlign: "center"
        }
        const submitstyle = {
            padding: "5px 15px",
            background: "#ccc",
            border: "0 none",
            cursor: "pointer",
            borderRadius: "5px",
            textAlign: "center"
        }

        const tableboxstyle = {
            fontFamily: "Arial",
            textAlign: "center",
            width: "50%",
            margin: "auto"
        };
        const tablestyle = {
            fontFamily: "Arial",
            textAlign: "center",
            borderCollapse: "collapse",
            width: "50%",
            margin:"auto",
            padding: "2rem",
        }

        return (
            <div style={fmstyle}>
                <h1> Flatmates</h1>
                <p>
                    The flatmates often borrow money from each other. They need an app to log who owes whom and how much.
                </p>
                <div style={boxstyle}>
                    <h3>
                        <a href="/api/users">Users</a>
                    </h3>
                        <form onSubmit={this.addSubmitHandler}>
                            <input
                                type='text' maxLength="10" size="10" placeholder=" Add User" name="newuser" style={inputstyle}
                                onChange={this.stateChangeHandler}
                            />
                        </form>
                        <form onSubmit={this.searchSubmitHandler}>
                            <input
                                type='text' maxLength="10" size="10" placeholder="Search User" style={inputstyle} name="username"
                                onChange={this.stateChangeHandler}
                            />
                        </form>
                        <form onSubmit={this.borrowSubmitHandler}>
                            <input
                                type='text' maxLength="8" size="8" placeholder="lender" style={inputstyle} name="lender"
                                onChange={this.stateChangeHandler}
                            />
                            <input
                                type='text' maxLength="8" size="8" placeholder="borrower" style={inputstyle} name="borrower"
                                onChange={this.stateChangeHandler}
                            />
                            <input
                                type='text' maxLength="6" size="6" placeholder="amount" style={inputstyle} name="amount"
                                onChange={this.stateChangeHandler}
                            />
                            <input
                                type='submit' value="Borrow" style={submitstyle}
                            />
                        </form>
                </div>
                <div style={tableboxstyle}>
                    <div style={tablestyle}>
                        <table>
                          <tbody>
                            <tr><td></td>{this.state.username.map(u=><td>{u}</td>)}</tr>
                            {
                                this.state.username.map(u=><tr><td>{u}</td></tr>)
                            }
                         </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('index'));