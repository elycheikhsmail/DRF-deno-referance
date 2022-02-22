// deno run --allow-net --allow-read upload_using_browser.js
const formdata = new FormData();
formdata.append("description", "image de test");
formdata.append("document", 
//new File([await Deno.readFile("./file.txt")],"file.txt"),
new File([await Deno.readFile("./4.png")],"4.png"),
//fileInput.files[0], 

//"file.txt"
"4.png"
);

const requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8080/upload/up2", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));