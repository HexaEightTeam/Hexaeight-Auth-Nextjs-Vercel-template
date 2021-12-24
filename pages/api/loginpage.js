// Copyright(c) 2021 HexaEight Team
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {
  createHash,
} = require('crypto');

const btoa = function(str){ return Buffer.from(str).toString('base64'); }

const usemacrometakv = process.env.usemacrometakv || 'NO';
const usemacrometakvsinkname = process.env.usemacrometakvsinkname || '';
const usemacrometakvapikey = process.env.usemacrometakvapikey || '';
const datasinkprotocol = process.env.datasinkprotocol || 'https';
const datasink = process.env.datasink || 'api.cl1p.net';
const cookiedomain = process.env.cookiedomain || '.' + process.env.VERCEL_URL;
const emaildomainsfilter = process.env.emaildomainsfilter || 'NO';
const emaildomainslist = process.env.emaildomainslist || "";
const servername = process.env.servername || process.env.VERCEL_URL;
const path = process.env.path || "/";
const redirecturl = process.env.redirecturl || '/loginsuccess';
const clientappcode = process.env.clientappcode || '';
const bottomlogo = process.env.bottomlogo || 'https://cdn1.iconfinder.com/data/icons/hawcons/32/698845-icon-118-lock-rounded-128.png';
const auditing = process.env.auditing || 'ENABLED';
const RapidAPIKey = process.env.RapidAPIKey || '';



export default function handler(request, response) {
  handleRequest(request, response);
}

function loginpagehtml() {
	return `
	<html lang="en">
	<title>Sign In</title>
	<head>
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    	<!-- SEO Meta Tags -->
	    <meta name="description" content="Login Using HexaEight QR Code">
	    <meta name="author" content="Provided By HexaEight">

	     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
	      <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>

		<style>
		*{
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		.btn-pulse{
		  color: #1c264a;
		  position: relative;
		  left: 50%;
		  transform: translate(-50%, -50%);
		  width: 75px;
		  height: 75px;
		  border-radius: 50%;
		  border: 2px solid #2debae;
		  background-color: #2debae;
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  cursor: pointer;
		  box-shadow: 0 0 0 0 #2debae;
		  animation: pulse 1.3s  infinite;
		}
		@keyframes pulse {
		  to {
		    box-shadow: 0 0 0 16px rgba(255,255,255,0.01);
		  }
		}



		body {
			height: 100vh;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #EE8FA6;
			background: -webkit-linear-gradient(45deg, #3C88CF, #EE8FA6, #FBE9DE);
			background: linear-gradient(45deg, #3C88CF, #EE8FA6, #FBE9DE);
			font-family: 'Roboto', sans-serif;
		}
		.screen {
			min-width: 360px;
			background-color: #FFFFFF;
			border-radius: 20px;
		  	text-align: center;
			padding: 18px;
			display: flex;
			flex-direction: column;
		}
		.register-heading{
		    text-align: center;
		    margin-top: 0%;
		    margin-bottom: 0%;
		    color: #495057;
		    display: flex;
		    flex-direction: column;
		}
		
		.hover01 figure img {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transition: .3s ease-in-out;
			transition: .3s ease-in-out;
		}
		.hover01 figure:hover img {
			-webkit-transform: scale(1.3);
			transform: scale(1.3);
		}


		</style>
		
		</head>
		
		<div class="screen register-heading">
		<button class="btn-pulse" id="login-hexaeight-button">Login</button>
		<div id="boxsize" class="register-heading">
		<h3><strong>Sign In </strong></h3>
		<p class="small below-txt1">Click On The Login Button Post QR Code Authorization</p>
		<p class="small below-txt1"><a href="https://www.hexaeight.com/docs/quick-instructions.html" target=_blank>Instructions</a></p>
		<p class="small below-txt2">HexaEight QR Code</p>
		<div id="display-hexaeight-qrcode">
		</div>
		<div id="display-hexaeight-qrcodeid">
		</div>
        	<button class="small" id="scan-hexaeight-qrcode">Scan QR Code</button> <br/>
		<div class="hover01 column">
			<figure> <img src="` + bottomlogo.trim() + `" width = "50" height = "50"/> </figure>
		</div>
		</div>
		</div>
	
	</html>
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>
	
	
	<script>
		console.log("Login Page Loaded Successfully");
	</script>	

` + `<script id="hexaeightclient" src="https://cdn.jsdelivr.net/gh/hexaeight/jslibrary/hexaeight-token-quickauth.js" servername="` + servername.trim() + `" path="` + path.trim() + `" redirecturl="` + redirecturl.trim() + `" clientappcode="` + clientappcode.trim() + `" datasinkprotocol="` + datasinkprotocol.trim() + `" datasinkurl="` + datasink.trim() + `"></script>

`;
}

function loginsuccesspage(user) {
	let info = user.split("@");
	let username = info[0];

	return `
	<html lang="en">
	<meta charset="utf-8"/>
	<title>Sign In - Success</title>
	<head>
		<style type="text/css">
		body {text-align: center}
		</style>

	<body>
		<h1 center>Login - Success</h1>
		<div>
		        <p>Hello ` + username + `, Login Successful. Welcome To Dashboard Page.</p>
		</div>
	`;
}


function sha256(plain) {
	let hash = createHash('sha256');
	const encoder = new TextEncoder();
	const data = encoder.encode(plain);
	hash.update(plain);
	return hash.digest('hex');
}

function base64urlencode(a) {
	return  Buffer.from(a, 'hex').toString('base64').replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function generateCodeChallengeFromVerifier(v) {
	var hashed = await sha256(v);
	var base64encoded = base64urlencode(hashed);
	return base64encoded;
}


function parseUserData(data) {
	try {
		return JSON.parse(data);
	} catch (ex) {
		return { 'user': 'Unknown user' };
	}
}

function validateemail(email) {
	let atpos = email.indexOf("@");
	let domain = email.split("@")[1];
	if (email == null || email == "") {
		return false;
	}
	else if (atpos < 1 || (emaildomainslist.indexOf(domain) == -1)) {
		return false;
	}
	return true;
}

function checkemailaddress(email)
{
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(email.match(mailformat)){
		return true;
	}
	else
	{
		return false;
	}
}

async function handleRequest(request, response) {
	const usercookiedomain = cookiedomain.trim();
	const userdatasink = datasink.trim();
	const macrometasinkname = usemacrometakvsinkname.trim();
	const macrometakvapikey = usemacrometakvapikey.trim();
	const userdatasinkprotocol = datasinkprotocol.trim();
	const requestbody = request.body + '||';
	const url = request.url;
	const cookies = request.cookies;

	if (request.method === 'POST') {

		try {
			let info = cookies.hexaeightuserinfo;
			let enduser = info.split(":");
			let useremail = enduser[0];
			if (cookies.hexaeightsessionid !== undefined && checkemailaddress(useremail)) {
				response.setHeader("Content-Type", "text/plain");
				response.status(200).send('SessionResponse: User Authenticated Successfully.');
			}
		  }
		  catch { };
			
			let xurl = request.url;
	  		if (xurl.toString().includes("/login/sink/") && usemacrometakv.trim() === "YES")  {
		
				let urlvalue = xurl.toString();
				var key = urlvalue.substring(urlvalue.lastIndexOf('/') + 1);

			        let expDate = Math.floor(new Date() / 1000)  + (3*60);

				let data = {'_key': key, 'value': requestbody.replace("||",""), 'expireAt': expDate };

				let durl = "https://api-gdn.paas.macrometa.io/_fabric/_system/_api/kv/" + macrometasinkname + "/value";

				console.log(urlvalue);
				console.log(key);
				console.log(JSON.stringify(data));
				console.log(xurl);

				var sinkresp = fetch(durl, {
					"method": "PUT",
					"headers": {
					       	"accept":"application/json",
			        	  	"Content-Type":"application/json",
						"Authorization": "apikey " + macrometakvapikey,
						},
        				"body": JSON.stringify(data),
				});

				response.setHeader("Content-Type", "text/plain");
				response.status(200).send('Ok');
				return response;
			}


			var incomingrequest = requestbody.split("|");
			var sinklocation = incomingrequest[0];
			var usercode = incomingrequest[1];
			var challenge = await generateCodeChallengeFromVerifier(usercode);

			var resp = "";
			var userauthtoken = "";

	  		if (usemacrometakv.trim() === "YES")  {
				let durl = "https://api-gdn.paas.macrometa.io/_fabric/_system/_api/kv/" + macrometasinkname + "/value/" + sinklocation;

				let sinkresp = await fetch(durl, {
					"method": "GET",
					"headers": {
						"Authorization": "apikey " + macrometakvapikey,
					},
				});
				let sinkdata = await sinkresp.json();
				userauthtoken = sinkdata.value;
			}
			else {
				let url = userdatasinkprotocol + "://" + userdatasink + "/" + sinklocation;
				resp = await fetch(url);
				userauthtoken = await resp.text();
			}


			var hexa8resp = await fetch("https://hexaeight-sso-platform.p.rapidapi.com/fetchauthtoken", {
				"method": "POST",
				"headers": {
					"content-type": "text/plain",
					"x-rapidapi-host": "hexaeight-sso-platform.p.rapidapi.com",
					"x-rapidapi-key": RapidAPIKey.trim()
				},
				"body": userauthtoken,
			});

			var userinfo = await hexa8resp.text();
	
			const whois = parseUserData(userinfo);

			if (whois.user != "Unknown user" && whois.clientcodechallenge.trim() == challenge.trim()) {
				if (emaildomainsfilter.toUpperCase().trim() == "NO") {
					//let expTStamp = Math.floor(Date.now() / 1000)+3600;
					let expTStamp = Number(whois.exp) * 60 * 1000;
					let expDate = new Date();
					expDate.setTime(expTStamp);
					response.setHeader("Content-Type", "text/plain");
					response.setHeader('Set-Cookie', [`hexaeightsessionid=${whois.clientcodechallenge.trim()}; expires=${expDate}; path=/; domain=${usercookiedomain.trim()}; secure; HttpOnly; SameSite=Strict;`,`hexaeighttoken=${userauthtoken.trim()}; expires=${expDate}; path=/; domain=${usercookiedomain.trim()}; secure; HttpOnly; SameSite=Strict;`,`hexaeightuserinfo=${whois.user.trim() + ":" + expTStamp.toString() + ";"}; expires=${expDate}; path=/; domain=${usercookiedomain.trim()}; secure; HttpOnly; SameSite=Strict;`]);
					response.status(200).send('SessionResponse: User Authenticated Successfully.');
					if (auditing.trim() === "ENABLED") {
						console.log(Date.now() + ":LoginSuccess:" + whois.user + ":" + JSON.stringify(whois) + "Capturedby:HexaEight Serverless");
					}
					return response;
				}
				else {
					if (emaildomainsfilter.toUpperCase().trim() == "YES" && validateemail(whois.user)) {
						//let expTStamp = Math.floor(Date.now() / 1000)+3600;
						let expTStamp = Number(whois.exp) * 60 * 1000;
						let expDate = new Date();
						expDate.setTime(expTStamp);
						response.setHeader("Content-Type", "text/plain");
						response.setHeader('Set-Cookie', [`hexaeightsessionid=${whois.clientcodechallenge.trim()}; expires=${expDate}; path=/; domain=${usercookiedomain.trim()}; secure; HttpOnly; SameSite=Strict;`,`hexaeighttoken=${userauthtoken.trim()}; expires=${expDate}; path=/; domain=${usercookiedomain.trim()}; secure; HttpOnly; SameSite=Strict;`,`hexaeightuserinfo=${whois.user.trim() + ":" + expTStamp.toString() + ";"}; expires=${expDate}; path=/; domain=${usercookiedomain.trim()}; secure; HttpOnly; SameSite=Strict;`]);
						response.status(200).send('SessionResponse: User Authenticated Successfully.');
						if (auditing.trim() === "ENABLED") {
							console.log(Date.now() + ":LoginSuccess:" + whois.user.trim() + ":" + JSON.stringify(whois) + "Capturedby:HexaEight Serverless");
						}

						return response;
					}
					else {
						if (auditing.trim() === "ENABLED") {
							console.log(Date.now() + ":LoginBlocked:" + whois.user.trim() + ":" + JSON.stringify(whois) + "Capturedby:HexaEight Serverless");
						}
						response.setHeader("Content-Type", "text/plain");
						response.status(401).send('Sorry, The Owner of this Site has enforced login only for specific Email Domains. Contact Owner');
						return response;
					}
				}
			}
			else {
				if (auditing.trim() === "ENABLED") {			
					console.log(Date.now() + ":LoginAttempt:" + whois.user.trim() + ":" + JSON.stringify(whois) + "Capturedby:HexaEight Serverless");
	
				}
				response.setHeader("Content-Type", "text/plain");
				response.status(401).send('Unauthorized Request');
				return response;
			}
	}
	else {
		if (request.method === 'GET' || request.method === 'OPTIONS' || request.method === 'HEAD') {
			const url = request.url;
			if (url.toString().endsWith("/loginpage")) {
				const html = loginpagehtml()
				response.setHeader("Content-Type", "text/html;charset=UTF-8");
				response.setHeader("Access-Control-Allow-Methods", 'OPTIONS, HEAD, POST, GET');
				response.status(200).send(html);
				return response;
			}

			if (url.toString().endsWith("/loginsuccess")) {
			  try {
				let userinfo = cookies.hexaeightuserinfo;
				let enduser = userinfo.split(":");
				let useremail = enduser[0];
				if (cookies.hexaeightsessionid !== undefined && checkemailaddress(useremail)) {

					const htmlsuccess = loginsuccesspage(useremail)

					response.setHeader("Content-Type", "text/html;charset=UTF-8");
					response.setHeader("Access-Control-Allow-Methods", 'OPTIONS, HEAD, POST, GET');
					response.status(200).send(htmlsuccess);
					return response;
				}
				else {

					response.setHeader("Content-Type", "text/plain");
					response.status(401).send('Unauthorized Request');
					return response;
				}
			   }
			   catch {
					response.setHeader("Content-Type", "text/plain");
					response.status(401).send('Access Denied');
					return response;
			   }


			}


			if (url.toString().endsWith("/login")) {
				try {
					let userinfo = cookies.hexaeightuserinfo;
					let enduser = userinfo.split(":");
					let useremail = enduser[0];
					if (cookies.hexaeightsessionid !== undefined && checkemailaddress(useremail)) {
						response.setHeader("Content-Type", "text/plain");
						response.status(200).send('SessionResponse: User Authenticated Successfully.');
						return response;
					}
					else {
						response.setHeader("Content-Type", "text/plain");
						response.status(200).send('Unauthorized Request');
						return response;
					}

				}
				catch {
						response.setHeader("Content-Type", "text/plain");
						response.status(200).send('Unauthorized Request');
						return response;
				}
			}

			if (url.toString().endsWith("/login/getuseremail")) {
				try {
					let userinfo = cookies.hexaeightuserinfo;
					let enduser = userinfo.split(":");
					let useremail = enduser[0];
					if (cookies.hexaeightsessionid !== undefined && checkemailaddress(useremail)) {
						response.setHeader("Content-Type", "text/plain");
						response.status(200).send(useremail);
						return response;
					}
					else {
						response.setHeader("Content-Type", "text/plain");
						response.status(200).send('Unauthorized Request');
						return response;
					}

				}
				catch {
						response.setHeader("Content-Type", "text/plain");
						response.status(200).send('Unauthorized Request');
						return response;
				}

			}

			if (url.toString().endsWith("/login/getsessionexpiry")) {
				try {
					let userinfo = cookies.hexaeightuserinfo;
					let enduser = userinfo.split(":");
					let useremail = enduser[0];
					let ttlleft = enduser[1];
					let expTStamp = ((Number(ttlleft) - Date.now()) / 1000);
					if (cookies.hexaeightsessionid !== undefined && checkemailaddress(useremail)) {
						response.setHeader("Content-Type", "text/plain");
						response.status(200).send(expTStamp + ' Seconds Left');
						return response;
					}
					else {
						response.setHeader("Content-Type", "text/plain");
						response.status(200).send('Unauthorized Request');
						return response;
					}

				}
				catch {
						response.setHeader("Content-Type", "text/plain");
						response.status(200).send('Unauthorized Request');
						return response;
				}

			}

			if (url.toString().endsWith("/login/extendSession")) {
				try {
					let userinfo = cookies.hexaeightuserinfo;
					let usertoken = cookies.hexaeighttoken;
					let challenge = cookies.hexaeightsessionid;
					let utoken = usertoken.replace(";", "");
					let userdetails = cookies.hexaeightuserinfo;
					let enduser = userdetails.split(":");
					let useremail = enduser[0];
					let ttlleft = enduser[1];
					let expTStamp = Number(ttlleft) - Date.now();
					if (cookies.hexaeightsessionid !== undefined && checkemailaddress(useremail)) {
						if (Number(expTStamp) < 900000) {
							var hexa8resp = await fetch("https://hexaeight-sso-platform.p.rapidapi.com/extendauthtoken", {
								"method": "POST",
								"headers": {
									"content-type": "text/plain",
									"x-rapidapi-host": "hexaeight-sso-platform.p.rapidapi.com",
									"x-rapidapi-key": RapidAPIKey.trim()
								},
								"body": utoken,
							});

							var newtoken = await hexa8resp.text();

							if (newtoken.toString().length > 1000) {

								var hexa8user = await fetch("https://hexaeight-sso-platform.p.rapidapi.com/get-cookieuser", {
									"method": "POST",
									"headers": {
										"content-type": "text/plain",
										"x-rapidapi-host": "hexaeight-sso-platform.p.rapidapi.com",
										"x-rapidapi-key": RapidAPIKey.trim()
									},
									"body": newtoken.trim(),
								});

								var uinfo = await hexa8user.text();

								const whois = parseUserData(uinfo);

								if (whois.user != "Unknown user") {
									//let newexpTStamp = Math.floor(Date.now() / 1000) + 3600;
									let newexpTStamp = Number(whois.exp) * 60 * 1000;
									let expDate = new Date();
									expDate.setTime(newexpTStamp);

									response.setHeader("Content-Type", "text/plain");
									response.setHeader('Set-Cookie', [`hexaeightsessionid=${challenge.trim()}; expires=${expDate}; path=/; domain=${usercookiedomain.trim()}; secure; HttpOnly; SameSite=Strict;`,`hexaeighttoken=${newtoken.toString().trim()}; expires=${expDate}; path=/; domain=${usercookiedomain.trim()}; secure; HttpOnly; SameSite=Strict;`,`hexaeightuserinfo=${useremail.trim() + ":" + newexpTStamp.toString() + ";"}; expires=${expDate}; path=/; domain=${usercookiedomain.trim()}; secure; HttpOnly; SameSite=Strict;`]);
									response.status(200).send('SessionResponse: User Authenticated Successfully.');

									if (auditing.trim() === "ENABLED") {
										console.log(Date.now() + ":CookieExtensionSuccess:" + whois.user.trim() + ":" + JSON.stringify(whois) + "Capturedby:HexaEight Serverless");
									}
									return response;
								}
								else {
									response.setHeader("Content-Type", "text/plain");
									response.status(200).send('SessionResponse: ' + JSON.stringify(uinfo));

									if (auditing.trim() === "ENABLED") {
										console.log(Date.now() + ":CookieExtensionFailed:" + whois.user.trim() + ":" + JSON.stringify(whois) + "Capturedby:HexaEight Serverless");
									}
									return response;
								}
							}
							else {
								response.setHeader("Content-Type", "text/plain");
								response.status(200).send('Ok');
								return response;
							}

						}
						else {
							response.setHeader("Content-Type", "text/plain");
							response.status(200).send('Ok');
							return response;
						}
					}
				 } catch (err) {
					response.setHeader("Content-Type", "text/plain");
					response.status(401).send('Unauthorized Request');
					return response;
		                 }	

			}

			response.setHeader("Content-Type", "text/plain");
			response.status(401).send('Invalid Request');
			return;
		}
		else {
			response.setHeader("Content-Type", "text/plain");
			response.status(401).send('Invalid Method');
			return;

		}


	}
}
