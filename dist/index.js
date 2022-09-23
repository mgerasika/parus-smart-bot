"use strict";
/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable camelcase */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_constant_1 = require("./constants/env.constant");
// [START sheets_quickstart]
const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const { env } = require("process");
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
function loadSavedCredentialsIfExist() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const content = yield fs.readFile(TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        }
        catch (err) {
            return null;
        }
    });
}
/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
function saveCredentials(client) {
    return __awaiter(this, void 0, void 0, function* () {
        //   const content = await fs.readFile(CREDENTIALS_PATH);
        console.log("saveCredentials", TOKEN_PATH);
        const content = env_constant_1.ENV.GOOGLE_API_CRED;
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: "authorized_user",
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        yield fs.writeFile(TOKEN_PATH, payload);
    });
}
/**
 * Load or request or authorization to call APIs.
 *
 */
function authorize() {
    return __awaiter(this, void 0, void 0, function* () {
        let client = yield loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        client = yield new google.auth.GoogleAuth({
            // client = await authenticate({
            scopes: SCOPES,
            //keyFile: CREDENTIALS_PATH,
            credentials: JSON.parse(env_constant_1.ENV.GOOGLE_API_CRED),
        });
        console.log("authorized");
        if (client.credentials) {
            yield saveCredentials(client);
        }
        return client;
    });
}
function getValues(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        const sheets = google.sheets({ version: "v4", auth });
        const res = yield sheets.spreadsheets.values.get({
            spreadsheetId: env_constant_1.ENV.GOOGLE_SHEET_ID,
            range: "A1:H130",
        });
        const rows = res.data.values;
        if (!rows || rows.length === 0) {
            console.log("No data found.");
            return;
        }
        console.log("ROWS", JSON.stringify(rows));
        //   rows.forEach((row) => {
        //     // Print columns A and E, which correspond to indices 0 and 4.
        //     console.log(`${row[0]}, ${row[4]}`);
        //   });
    });
}
function writeValuesAsync(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        const sheets = google.sheets({ version: "v4", auth });
        const res = yield sheets.spreadsheets.values.get({
            spreadsheetId: env_constant_1.ENV.GOOGLE_SHEET_ID,
            range: "A1:H130",
        });
        const resource = {
            values: [
                [""],
                [""],
                [""],
                [""],
                // Additional rows ...
            ],
        };
        try {
            const column = "I2:I5";
            const result = yield sheets.spreadsheets.values.update({
                spreadsheetId: env_constant_1.ENV.GOOGLE_SHEET_ID,
                range: column,
                valueInputOption: "USER_ENTERED",
                resource,
            });
            // data: {
            // 	spreadsheetId: '1-jXYIRneWp4-pqN5k9-hg5pXL30LdlZ6f5VQL7Oik-I',
            // 	updatedRange: "'Аркуш1'!I2:I5",
            // 	updatedRows: 4,
            // 	updatedColumns: 1,
            // 	updatedCells: 4
            //   },
            console.log("cells updated.", result);
            return result;
        }
        catch (err) {
            // TODO (Developer) - Handle exception
            throw err;
        }
    });
}
authorize().then(writeValuesAsync).catch(console.error);
// authorize().then(getValues).catch(console.error);
// [END sheets_quickstart]
//# sourceMappingURL=index.js.map