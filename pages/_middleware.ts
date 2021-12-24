// Copyright(c) 2021 Sample Middleware (HexaEight Team)

import { NextResponse, NextRequest } from 'next/server'

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


export async function middleware(req: NextRequest,res: NextResponse) {
  // Check if the user is authenticated else redirect to the login page
  const { pathname } = req.nextUrl;
  try {
	let userinfo = req.cookies.hexaeightuserinfo;
	let enduser = userinfo.split(":");
	let useremail = enduser[0];
	if (req.cookies.hexaeightsessionid == undefined || !checkemailaddress(useremail)) {
	    	if (!pathname.includes('/login')) {
			return NextResponse.redirect('/login/loginpage');
    	    	}
  	}
	else {
		return NextResponse.next();
	}
   }
   catch { 
    	if (!pathname.includes('/login')) {
		return NextResponse.redirect('/login/loginpage');
 	 }
	console.log("Caught error");
   };
}

