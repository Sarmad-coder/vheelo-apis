let multer = require("multer")


// Configuration
// cloudinary.config({ 
//     cloud_name: 'daysl3hyk', 
//     api_key: '829652487523515', 
//     api_secret: 'k5R5eBere0Xqyfjg-RKHss0lMgc' 
//   });

// const parameters = {
//     cloudinary: cloudinary,
//     params: {
//         folder,
//         format: async (req, file) => '', // You can change the file format here.
//         public_id: function (req, file) {
//             const newFileName2 = `${Date.now()}-${file.originalname}`;
//             return newFileName2;
//         }
//     }
// }

// const storage = new CloudinaryStorage(parameters);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let path = 'images/'
  
      cb(null, path)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  

export const upload = multer({ storage: storage, limits: { fieldSize: 20971520 } })

