// lib/server.ts
import app from "./app";
import * as https from 'https';
import * as fs from 'fs';

const PORT = process.env.PORT || 8084;

// Test only
const httpsOptions = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("certificate.pem")
}
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})