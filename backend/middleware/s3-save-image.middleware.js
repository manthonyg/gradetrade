const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const s3 = new aws.S3();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

var multerS3Config = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      const name = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, Date.now() + "-" + name);
    },
  }),
});

module.exports = multerS3Config.single("imagePath");
