## Getting Started with HexaEight Authentication

This is a [Next.js](https://nextjs.org/) cloned project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This template has undergone changes as stated below

` /next.config.js ==>(Modified) Rewrites all requests ending with /login to /api/loginpage

` /pages/api/loginpage.js ==>(Added) Contains HexaEight Serverless Server Side Code Base which authenticates email users

` /pages/_app.js ==>(Modified) Implements automatic Silent refresh of user session using setinterval function.

` /pages/_middleware.ts ==>(Added/Modified) The middleware typescript function which redirects the user to login page if the user session has expired

This HexaEight Authentication template is specific to Vercel Deployment and requires the following mandatory environment variables 
for HexaEight Serverless to start authenticating users.

clientappcode
RapidAPIKey

###### Get an API Key for HexaEight Secure Platform from [RapidAPI](https://rapidapi.com/hexaeight-hexaeight-default/api/hexaeight-sso-platform/pricing)

A Free Plan is available if you want to test the authentication. Once you have subscribed to a plan, your Rapid API key is available 
@
[Rapid API Dashboard](https://rapidapi.com/developer/dashboard) --> Choose the default application --> Security on the left hand pane --> Application Key
Copy your API Key 

  
###### Run the below command to Generate a New Client App Code (or Client ID) for your Login Application using RAPID API Key hosted by CF Worker

Input the Rapid API Key and change the data field to reflect your application name.  This application name is for your internal use to identify
the login page from which the user got authenticated.  This output of this is a Client ID (similar to Oauth Client ID which is used to identify Apps)
This Client ID is tied to the Rapid API user account, so you can only decode the tokens for this Client ID using the same API keys associated with 
your Rapid API user account.

###### From Unix Or Mac using Shell
>     curl --header 'x-rapidapi-key: your rapidapi key' --data 'Default Login Application v 1.0' --request POST --url https://hexaeight-sso-platform.p.rapidapi.com/get-new-securetoken --header 'content-type: text/plain' --header 'x-rapidapi-host: hexaeight-sso-platform.p.rapidapi.com'

OR

###### From Windows using Powershell
>     $h = @{"x-rapidapi-host"="hexaeight-sso-platform.p.rapidapi.com"; "x-rapidapi-key"="your rapid api key";}
>     $response = Invoke-WebRequest -Body 'Default Login Application v 1.0' -Uri 'https://hexaeight-sso-platform.p.rapidapi.com/get-new-securetoken' -Method POST -Headers $h -ContentType 'text/plain';$response.Content;


The above output displayed is the ClientID.

You will need this ClientID and RapidApi Key to deploy this template using the Deploy button. 

This template by default uses a Public Datasink to deploy HexaEight Serverless, If you want a private datasink, you should subscribe to Macrometa.com which provides
a cheap KV Datastore which is supported by default.  Refer to documentation for additional details.

This template by default uses the vercel provided domain name as the custom domain name.  We recommend you deploy a custom domain and set
the HexaEight Servername and cookiename environment variables accordingly to support your custom domain name.  Refer to Documentation for additional details.

Additional Environment variables are available for customization. Refer to the Documentation Section for more details.




