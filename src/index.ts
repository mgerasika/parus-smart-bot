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

import { ENV } from "./constants/env.constant";

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
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: any) {
  //   const content = await fs.readFile(CREDENTIALS_PATH);
  console.log("saveCredentials", TOKEN_PATH);
  const content = ENV.GOOGLE_API_CRED;
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await new google.auth.GoogleAuth({
    // client = await authenticate({
    scopes: SCOPES,
    //keyFile: CREDENTIALS_PATH,
    credentials: JSON.parse(ENV.GOOGLE_API_CRED),
  });
  console.log("authorized");
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function getValues(auth: any) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: ENV.GOOGLE_SHEET_ID,
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
}

async function writeValuesAsync(auth: any) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: ENV.GOOGLE_SHEET_ID,
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
    const result = await sheets.spreadsheets.values.update({
      spreadsheetId: ENV.GOOGLE_SHEET_ID,
      range: column, //`${column}:${column}`,
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
  } catch (err) {
    // TODO (Developer) - Handle exception
    throw err;
  }
}

authorize().then(writeValuesAsync).catch(console.error);
// authorize().then(getValues).catch(console.error);
// [END sheets_quickstart]
