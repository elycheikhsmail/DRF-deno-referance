// deno test --allow-all  --location http://localhost:8080  tests/auth2.test.ts

import { FetchHelper } from "https://deno.land/x/fetch_as_class@v1.0.8/mod.ts";
const fetchHepler = new FetchHelper();
import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";
 
// test params 
const data = {
    user1: {
        username: "ely",
        email: "ely@example.com",
        password: "1234"
    },
    user1Login: {
        username: "ely",
        password: "1234"
    }
    ,

    user2: {
        username: "sidi",
        email: "sidi@example.com",
        password: "1234"
    },
    user2Login: {
        username: "sidi",
        password: "1234"
    }

}

const httpPaths = {
    registerPathname: "api/auth/register",
    loginPathname: "api/token",
    protectedRessourcePathname: "api/hello"
}

const testNames = {
    testregister1: "register user1 test",
    testRegisterUser2:"register user2 test",
    testLogin: "login user test",
    testProtectedUrl: "protected url test",

}

Deno.test(
    testNames.testregister1, 
    async () => { 
        const requestOption = {
            method: "POST",
            body: JSON.stringify(data.user1),
            headers: {
                'Content-Type': 'application/json', 
            }
        }
        const resp = await fetch(httpPaths.registerPathname, requestOption) 
        await resp.text()
        t.assertEquals(resp.status, 201);
    }

);



Deno.test(
    testNames.testLogin,
   // testLoginName,
    async () => {

        const requestOption = {
            method: "POST",
            body: JSON.stringify(data.user1),
            headers: {
                'Content-Type': 'application/json', 
            }
        }
        const resp = await fetch(httpPaths.loginPathname, requestOption) 
        const respText = await resp.text()
        const respJson = JSON.parse(respText)
        localStorage.setItem("accessToken", respJson.access) 
        t.assertEquals(resp.status, 200);

 
    }

);

Deno.test(
    testNames.testProtectedUrl
    ,
    async () => {
        const token = localStorage.getItem("accessToken") || ""
        const resp = await fetch(
            httpPaths.protectedRessourcePathname
            //protectedRessourcePathname
            , {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const _r = await resp.text()
        // await Deno.writeTextFile("log_protect.html", _r)

        t.assertEquals(resp.status, 200);
    }
);



