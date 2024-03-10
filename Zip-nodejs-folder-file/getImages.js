const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

async function readZipArchive(filepath) {
  try {
    const zip = new AdmZip(filepath);

    for (const zipEntry of zip.getEntries()) {
      // Kiểm tra xem entry có phải là file và nằm trong thư mục 'A' không
      if (!zipEntry.isDirectory && zipEntry.entryName.startsWith("web/") && path.extname(zipEntry.entryName) === ".png") {
        const imageData = zipEntry.getData(); // Lấy dữ liệu của file ảnh
        const outputPath = path.join(__dirname, "output", zipEntry.entryName); // Đường dẫn đến nơi lưu trữ file ảnh
        // /Volumes/Lloyd/Lab/Zip-nodejs-folder-file/output/web/
        fs.writeFileSync(outputPath, imageData); // Lưu file ảnh vào đường dẫn đã chỉ định
        console.log("Found image:", zipEntry.name);
      }
    }
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

readZipArchive("./test.zip");
