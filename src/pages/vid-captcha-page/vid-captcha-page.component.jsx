import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import OtpPage from '../vid-otp-page/vid-otp-page.component';

class CaptchaPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            captchaB64: "",
            payload: {
                uidNumber: '',
                captchaTxnId: '',
                captchaValue: '',
                transactionId: ''
            },
        };
    }

    getCaptchaB64 = (payload) => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        };

        axios.post(`${process.env.REACT_APP_AUTH_API}/get/captcha`, JSON.stringify(payload), {headers})
        .then(res => {return res.data})
        .then(res => {
            const { payload } = this.state;
            payload['captchaTxnId'] = res['captchaTxnId'];
            this.setState({'captchaB64': res['captchaBase64String'], payload: payload})
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getCaptchaB64({
            "langCode": "en",
            "captchaLength": "3",
            "captchaType": "2"
        })        
    }

    handleSubmit = event => {
        event.preventDefault();
        const { payload } = this.state;
        payload['transactionId'] = "MYAADHAAR:"+uuidv4();
        const headers = {
            "x-request-id": uuidv4(),
            "appid": "MYAADHAAR",
            "Accept-Language": "en_in",
            "Content-Type": "application/json",
        }
        console.log(payload);
        axios.post(`${process.env.REACT_APP_AUTH_API}/generate/aadhaar/otp`, JSON.stringify(payload), {headers})
        .then(res => res.data)
        .then(res => {
            console.log("OTP GENERATION: "+res["status"]);
            console.log(res)
            const { uidNumber, mobileNumber, txnId } = res;
            this.setState({
                payload: {
                    uidNumber: '',
                    captchaTxnId: '',
                    captchaValue: '',
                    transactionId: ''
                },
                uidNumber: uidNumber, 
                mobileNumber: mobileNumber, 
                txnId: txnId,
                captchaB64: '',
            });

            console.log(res["status"] === "Success")
        })
        .catch(err => console.log(err));

        this.setState({
            payload: {
                uidNumber: '',
                captchaTxnId: '',
                captchaValue: '',
                transactionId: ''
            },
            captchaB64: '',
            otpPayload: {
                "uid" : "",
                "mobile" : "",
                "otp" : "",
                "otpTxnId" : ""
            }
        });
        
        this.getCaptchaB64({
            "langCode": "en",
            "captchaLength": "3",
            "captchaType": "2"
        })
    }

    handleChange = event => {
        const { name, value } = event.target;
        const { payload } = this.state;
        payload[name] = value;
        this.setState({"payload": payload}, () => console.log(this.state))
    }

    render() {
        if(!this.state.txnId) {
            return(
                <div className="captcha-screen">
                <form onSubmit={this.handleSubmit}>
                    <h2>Captcha Verification</h2>
                    <p>Enter Aadhaar Number</p>
                    <TextField value={this.state.payload["uidNumber"]} name="uidNumber" required autoComplete="off" label="UID Number" onChange={this.handleChange} variant="outlined" /><br/><br/><br/><br/>
                    <img alt="captcha" src={`data:image/png;base64,${this.state.captchaB64}`}/>
                    <br/> 
                    <p>Type the text given above</p>
                    
                    <TextField value={this.state.payload["captchaValue"]} name="captchaValue" required autoComplete="off" label="Captcha" onChange={this.handleChange} variant="outlined" />
                    <br/><br/>
                    <Button type="submit" variant="contained">Submit</Button>
                </form>
                </div>
            );
        }
        else {
            return (<OtpPage txnId={this.state.txnId} uidNumber={this.state.uidNumber} mobileNumber={this.state.mobileNumber}/>);
        }
    }
}

export default CaptchaPage;