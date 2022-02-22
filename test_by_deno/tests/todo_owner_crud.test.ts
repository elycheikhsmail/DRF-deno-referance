import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";
// test params 
const data = {
    toAdd: { text: "test myapp" },
    updateTo: { text: "myapp is test" }
}

const httpPaths = {
    listPathname: "/api2/todosOwner",
    detailsPathname: "/api2/todosOwner/1"
}

const testNames = {
    testaddName: "test add one todowith owner ",
    testListName: "test  for get list  todos ",
    testGetItemByIdName: "test for get the first todo by id",
    testDeleteItemByIdName: "test delete one todo",
    testUpdateById: "test update todo by id"

}
function IsJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// test
Deno.test(
    testNames.testaddName,
    async () => {
        const token = localStorage.getItem("accessToken") || ""
        const requestOption = {
            method: "POST",
            body: JSON.stringify(data.toAdd),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const resp = await fetch(httpPaths.listPathname, requestOption)

        const responseText = await resp.text()
        //await Deno.writeTextFile("log_add.html", responseText)
        t.assertEquals(resp.status, 201);
    },
);



Deno.test(
    testNames.testListName,
    async () => {
        const token = localStorage.getItem("accessToken2") || ""
        await Deno.writeTextFile("log_token2.html", token)
        const requestOption = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const resp = await fetch(httpPaths.listPathname, requestOption)
        const respText = await resp.text()
        const isValidJson = IsJsonString(respText)

        if (isValidJson) {  
            t.assertEquals(resp.status, 200);
            const respJson = JSON.parse(respText)
            t.assertEquals(respJson.length,0) 

        } else {
            //
            await Deno.writeTextFile("log.html", respText)
            t.assertEquals("json", "text can't be convert to json")

        }
    },
);

Deno.test(
    testNames.testGetItemByIdName,
    async () => {

        const token = localStorage.getItem("accessToken2") || ""
        const requestOption = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const resp = await fetch(httpPaths.detailsPathname, requestOption)
        const respText = await resp.text()
        t.assertEquals(resp.status, 404); 

        // const isValidJson = IsJsonString(respText)
        // if (!isValidJson) {
        //     await Deno.writeTextFile("log.html", respText)
        //     t.assertEquals("json", "text can't be convert to json")
        // }else{
        //     t.assertEquals(resp.status, 404); 
        // }
        

    },
);

Deno.test(
    testNames.testUpdateById,
    async () => {
        const token = localStorage.getItem("accessToken2") || ""
        const requestOption = {
            method: "PUT",
            body: JSON.stringify(data.updateTo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const resp = await fetch(httpPaths.detailsPathname, requestOption)
        const _responseText = await resp.text()
        t.assertEquals(resp.status, 404); 
    },
);

Deno.test(
    testNames.testDeleteItemByIdName,
    async () => {
        const token = localStorage.getItem("accessToken2") || ""
        const requestOption = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const resp = await fetch(httpPaths.detailsPathname, requestOption)
        const _responseText = await resp.text()
        t.assertEquals(resp.status, 404)
        //t.assertEquals(resp.status, 204);
    },
);
