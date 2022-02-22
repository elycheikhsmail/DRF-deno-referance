# test rest api using deno built in test tool and fetch api

```
deno test --allow-net  --location http://localhost:8080   tests/simple_todo_crud.test.ts  tests/auth2.test.ts

```

use deno 1.18.1 or heigher <br>
the rest api was build using dajango django rest framwork but the way we test is indpedent of the technologie and framwork used for built the 
rest api
