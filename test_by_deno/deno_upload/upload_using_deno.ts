// deno run --allow-net --allow-read upload_using_deno.ts
const formdata = new FormData();
formdata.append("description", "image de test"); 
const myFile = new File([await Deno.readFile("./4.png")],"4.png");
formdata.append("document",  myFile, "4.png");


const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8080/upload/up2", {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));