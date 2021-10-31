import React from 'react';
import axios from 'axios';

class VidCaptcha extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            captchaB64: "",
        };
    }

    getCaptchaB64 = (payload) => {
        axios.post(`${process.env.REACT_APP_AUTH_API}/get/captcha`, {
            method: 'POST', 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        .then(res => {return res.data})
        .then(res => this.setState({'captchaB64': res['captchaBase64String']}))
        .then(() => console.log(this.state.captchaB64))
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getCaptchaB64({
            "langCode": "en",
            "captchaLength": "3",
            "captchaType": "2"
        })        
    }

    render() {
        if(this.state.captchaB64) {
            return(<img alt="captcha" src={`data:image/png;base64,${this.state.captchaB64}`}/>)
        }
        else 
            return (<div>hello</div>);
    }
}

export default VidCaptcha;