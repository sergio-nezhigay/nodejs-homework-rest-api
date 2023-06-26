const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://abc1971h:cuxTiw4XRMLlrxnz@cluster0.jg2z2uu.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
