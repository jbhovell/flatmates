import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users:[]}
    }

    loadState = () => {
        axios({
            method: 'get',
            url: '/api/users',
            data: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        }).then(resp => this.setState({users: resp.data}))
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
        }).then(() => this.loadState())
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

    render() {
        this.loadState();
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

        const td = {
            border: "1px solid #dddddd",
            textAlign: "left",
            padding: "8px",
            borderColor: "#4CAF50",
            borderRadius: "5px"
        }
        return (
            <div style={fmstyle}>
                <h1> Flatmates</h1>
                <p>
                    The flatmates often borrow money from each other. They need an app to log who owes whom and how much.
                </p>
                <div style={boxstyle}>
                    <div style={tablestyle}>
                        <table>
                          <tbody>
                            <tr><td></td>{this.state.users.map((u,i)=><td style={td}key={i}>{u.name}</td>)}</tr>
                            {
                                this.state.users.map((u,i)=><tr key={i}><td style={td}>{u.name}</td></tr>)
                            }
                         </tbody>
                        </table>
                    </div>
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
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('index'));