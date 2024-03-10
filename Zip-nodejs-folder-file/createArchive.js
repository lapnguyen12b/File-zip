const AdmZip = require("adm-zip");

async function createZipArchive() {
    try {
        const zip = new AdmZip();
        const outputFile = "test.zip";
        zip.addLocalFolder("./test");
        zip.writeZip(outputFile);
        console.log(`Created ${outputFile} successfully`);
    } catch (e) {
        console.log(`Something went wrong. ${e}`);
      }
}

createZipArchive();