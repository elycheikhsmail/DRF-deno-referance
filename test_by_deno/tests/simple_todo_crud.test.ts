import { FetchHelper } from "https://deno.land/x/fetch_as_class@v1.0.8/mod.ts";
const fetchHepler = new FetchHelper();
import * as t from "https://deno.land/std@0.102.0/testing/asserts.ts";
// test params
const mockedData =  {text:"test myapp"}
const mockedDataUpdate =  {text:"myapp is test"}
const listPathname = "/api/todos"
const detailsPathname = "/api/todos/1"
// test names
const testListName =  "test  for get list  todos "
const testaddName = "test add one todo "
const testGetItemByIdName = "test for get the first todo by id"
const testDeleteItemByIdName =  "test delete one todo"
const testUpdateById = "test update todo by id"
// test
Deno.test(
    testaddName,
    async () => { 
        fetchHepler.setPathname(listPathname);
        const objectString = JSON.stringify(mockedData)
        const response = await fetchHepler.POST(objectString)
        const responseJson = await response.json() 
        t.assertEquals(response.status, 201);


        // const requestOption = {
        //     method: "POST",
        //     body: JSON.stringify(data.toAdd),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // }



        //t.assertEquals(responseJson.length,1)
    },
);

Deno.test(
    testListName ,
    async () => { 
        fetchHepler.setPathname(listPathname);
        const response = await fetchHepler.GET()
        const responseJson = await response.json()
        t.assertEquals(response.status, 200);
        t.assertEquals(responseJson.length,1)
        t.assertEquals(responseJson[0].text,mockedData.text)
        //t.assertEquals(responseJson[1].response,"b")
    },
);
Deno.test(
    testGetItemByIdName ,
    async () => { 
        fetchHepler.setPathname(detailsPathname);
        const response = await fetchHepler.GET()
        const responseJson = await response.json()
        t.assertEquals(response.status, 200); 
        t.assertEquals(responseJson.text,mockedData.text) 
    },
);
Deno.test(
    testUpdateById,
    async () => { 
        fetchHepler.setPathname(detailsPathname);
        const objectString = JSON.stringify(mockedDataUpdate)
        const response = await fetchHepler.PUT(objectString)
        const responseJson = await response.text()
        console.log(responseJson)
        t.assertEquals(response.status, 200);
        //t.assertEquals(responseJson.text,mockedDataUpdate.text) 
        //t.assertEquals(responseJson.length,1)
    },
);
Deno.test(
    testDeleteItemByIdName,
    async () => { 
        fetchHepler.setPathname(detailsPathname);
        const response = await fetchHepler.DELETE()
        await response.text()
        t.assertEquals(response.status, 204);  
    },
);
