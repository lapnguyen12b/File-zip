const express = require("express");
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const port = 3000;

// Thiết lập Multer để xử lý file được gửi lên
const upload = multer({ dest: "uploads/" });

// Định nghĩa endpoint POST để xử lý file zip được gửi lên
app.post("/upload-zip", upload.single("zipFile"), (req, res) => {
  try {
    const zipFilePath = req.file.path; // Đường dẫn đến file zip tải lên
    const imagesInFolderA = [];

    const zip = new AdmZip(zipFilePath);

    for (const zipEntry of zip.getEntries()) {
      // Kiểm tra xem entry có phải là file và nằm trong thư mục 'web' không
      if (
        !zipEntry.isDirectory &&
        zipEntry.entryName.startsWith("web/") &&
        path.extname(zipEntry.entryName) === ".png"
      ) {
        console.log('image file name:', zipEntry.entryName);    // web/underwater-2.png
        const imageData = zipEntry.getData();       // Lấy dữ liệu của file ảnh
        console.log('images: ', imageData);
        console.log('__dirname: ', __dirname);      // /Volumes/Lloyd/Lab/Zip-nodejs-folder-file-API
        const outputPath = path.join(__dirname, "output", zipEntry.entryName); // Đường dẫn đến nơi lưu trữ file ảnh
        console.log('path: ', outputPath);          // /Volumes/Lloyd/Lab/Zip-nodejs-folder-file-API/output/web/underwater-2.pn
        fs.writeFileSync(outputPath, imageData);    // Lưu file ảnh vào đường dẫn đã chỉ định

        imagesInFolderA.push(zipEntry.entryName);
      }
    }

    res.json({ imagesInFolderA });
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
    res.status(500).json({ error: "An error occurred while processing the zip file." });
  } finally {
    // Xóa file zip tạm sau khi xử lý xong
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
