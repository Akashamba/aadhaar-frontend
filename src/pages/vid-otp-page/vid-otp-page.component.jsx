import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

class OtpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payload: {
                "uid" : "",
                "mobile" : "",
                "otp" : "",
                "otpTxnId" : ""
            },
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const { payload } = this.state;
        const headers = {
            "Content-Type": "application/json"
        }
        payload["uid"] = this.props.uidNumber;
        payload["mobile"] = this.props.mobileNumber;
        payload["otpTxnId"] = this.props.txnId;
        console.log(payload)
        axios.post(process.env.REACT_APP_VID_API, JSON.stringify(payload), {headers})
        .then(res => res.data)
        .then(res => console.log(res))
        .catch(err => console.log(err));

        this.setState({
            payload: {
                "uid" : "",
                "mobile" : "",
                "otp" : "",
                "otpTxnId" : ""
            },
        });
    }

    handleChange = event => {
        const { name, value } = event.target;
        const { payload } = this.state;
        payload[name] = value;
        this.setState({"payload": payload});
    }
    
    render() {
        return(
            <div className="otp-screen">
            <form onSubmit={this.handleSubmit}>
                <h2>OTP Verification</h2>
                <p>A One-Time Password (OTP) has been sent to your Registered Mobile Number</p><br/>
                <p>Enter OTP</p>
                <TextField value={this.state.payload["otp"]} name="otp" required autoComplete="off" label="OTP" onChange={this.handleChange} variant="outlined" /><br/><br/><br/><br/>
                <Button type="submit" variant="contained">Submit</Button>
            </form>
            </div>
        )
    }
}

export default OtpPage;