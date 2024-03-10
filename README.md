# File-zip
```bash
$cd Zip-nodejs-folder-file-API
```
## download image
```bash
$ cd test
$ curl -O https://assets.digitalocean.com/how-to-process-images-in-node-js-with-sharp/underwater.png
```
curl
```bash
curl --location 'localhost:3000/upload-zip' \
--form 'zipFile=@"/Lab/Zip-nodejs-folder-file-API/test.zip"'
```

# Function
```bash
$cd Zip-nodejs-folder-file-API
```

```bash
$ node createArchive.js
$ node readArchive.js
$ nano updateArchive.js
$ node updateArchive.js
$ node extractArchive.js
```