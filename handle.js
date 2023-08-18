import { google } from "googleapis";
import axios from "axios";
import cheerio from "cheerio";
// Web DreamShip + Get Data be request from rows, colums
// SOURCE_MAIN_info= https://docs.google.com/spreadsheets/d/1b03YGc5HCsgSJ_caqwINesuMg0sDnqNC/edit#gid=1667872402
// SECONDARY_SOURCE_info= https://docs.google.com/spreadsheets/d/1b03YGc5HCsgSJ_caqwINesuMg0sDnqNC/edit#gid=1667872402 (Merchize Product Catalog)
export const Wirite = async (req, res) => {
  try {
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Area Config System
    const codeAuthor = {
      type: "service_account",
      project_id: "useful-monitor-396010",
      private_key_id: "a88b8620310d28e5bacbe58e009547e716c688b6",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIurLPEV50qTvG\n7Xy+cV8/X3BTvzMcZQUkuHEnySHwwnwNtt4WCoznIv/MKPYuQkBGoOrHUwx4LEcI\nWa1Su1wOK6E64dAcFXEdmSgU2KngPDmxz7CU+aZjay4dYH8W+Wv5X9cdk5k2036l\nLH5Lo4Ioc0XMs+sm3Hv9IHyDKqgKyxDM2nHvp/LsFQUctoM1BCjlTpZc5jo1RDDX\n5mac7vit02LcGtNK04clYmqELsnRQgOfCYKQ2v1ufnGnTW6dbwEHZSMglAmH9BB8\nJjc5SbXI3XVJv7jSC32pDy4Ud6O4a/K7arr7B4QxAk6itXDSweLP6lG3871mnos8\nheBNfPJHAgMBAAECggEAELDhlHFLyuSVmWV/BXD07BaaBwSzkc1en56MnjPN1DC/\n0v4dOnT3IXMaFRZk3hTZNmZED3363/VClNGsJWB5952uIvDK9sLbrIvjNtSLT5+C\nZqQv+TtHGCY95+hxuO3Vih9rikSPLW1prv9joxN+C7IGIE7no0wbLUGpyNhfr8Hs\nAOWLFobjZ+MD3S2V21k6vdEJF07o2ZT8jpKpYfjpBwtUb2Sa+INXqc5AAoAQg0sh\nhPeF9rtXHfXim2BnPIne/6cmPT76YRYCA5ail0Pn+LYZOR0by/N2NghdrWL1SEJc\nwvd02pP1Voi4A7kukUcOH7/ioUQ4u8ZoGx3XYsBNDQKBgQD8iJqVw7iot7kNf2Cr\nf54eCVmK+85TxDwgbqwP2Ghh6FBNyzaK0+XmErZtOb0XH6FF6zZ3A59JZHicmuKQ\ny/4XPqH+CWvLIlIum1iZMm77cXxmTWo1Q83liGjdN2vLRvfjmKAPXWbUTe5m+vzT\nbpsgJsYg32WVHw2bIPWdUL029QKBgQDLfA5A1u5siBldqZ9EBETBUJxtVU1aMVay\nXFiSEc/xdlzkIRLF4xPcKavJZKdYSzAxhOSAEM0Idz5jnFqVbfx0vY0mbyhzAgv/\nihm8GLqtuPhZsTnfTGn6zXM+A4+VfbUe+aE4x4QtFJyy8y4dE3aIFv8Dq60LaZgh\nhrJR2eImywKBgQC83pH3Bq26CcZuUOEFAupH/qgoqVFUFwT9IKixJSJUb4J33E9L\nn1VnMIGdyTwh6jcc6uEOO/hK1MjcH37p2peL3P0c2QD0qROb5fVqhmy4w9TNUoLn\nmXGJhO8g3A1TuB037HNxamK40BxIitjCbQu6DSXLeikoUVREvG7WHIeXbQKBgQC8\nGMgALe4ly0VPbG257Qw1erOu6WxglD0lEPIazHZhKV3Cz8PPwxHnsWmH+BAtMQuy\nqrqim2U8jyXP5IdjnFEDBPlGbviAH4NBy8HwOxfNYK/KEWaCwNsyqNn/mEERGivk\nHzNmDiBjn6seTGbzH7uxHzjKhtamNw0W6LFLslI4MwKBgCd4DUnDZC1pSFRge4h3\n3rlQ5xhgZNe1xAtXVFpiL8klotOsM0KN/125lHsG/yk1puhbhVz62CMV3l9PYkV3\nBqm2H+wAOtEyPadHh6iOFbRSJQQrHECU42ds7e+TCdtSgFnskHixJYPrwaOe8vdr\nzhhdZU0e+UId9O4GpxK/GJPG\n-----END PRIVATE KEY-----\n",
      client_email: "project-1@useful-monitor-396010.iam.gserviceaccount.com",
      client_id: "103189030119684332388",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/project-1%40useful-monitor-396010.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };
    const auth = new google.auth.GoogleAuth({
      credentials: codeAuthor,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();
    const sheets = google.sheets({// OR const sheets = google.sheets('v4');
      version: "v4",
      auth: client,
    });
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Area get data web: DreamShip paste sheets ================================> OK
    const { data } = await axios.get("https://dreamship.com/page-data/en/catalog/item/7/page-data.json");// get place
    const DataFinaly = data.result.data.catalogItem.data.item_variants; // toan bo gia tuong ung vs COLOR va SIZE
    
    const DataOK = [];// get Data san pham can lay <---> Color: Black with full Size
    DataFinaly.map((item) => {
      if (item.color == 46) {
        DataOK.push(item);
      }
    });
    let count = 5; //set place Sheets need paste
    DataOK.map((items) => {// console.log([[Number(items.basic_cost)]]);
      const ID_Sheet_Paste1 = "1OOsURNAIsGEEc0dQTtNVB9iBiAj9wZtexFL1XsHzbOY"; // ID GG-Sheet
      sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheet_Paste1,
        range: `Sheet1!W${count}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want fomat
        resource: {
          values: [[Number(items.basic_cost)]],
        },
      });
      count++;
    });
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Area get data web: PrintWay paste sheets ================================> Pendding
    const url ="https://printway.io/collections/made-in-usa/products/classic-unisex-t-shirt";// get place
    const responseAPI = await axios.get(url);
    const html = responseAPI.data;
    const $ = cheerio.load(html);
    const SaveData = $('script[type="application/ld+json"]');
    const Convert1 = [];
    const Convert2 = [];
    SaveData.each((index, element) => {
      const jsonData = $(element).html();
      const SetJson = jsonData.slice(345, 6010);// return res.status(200).json(SetJson);
      Convert1.push(SetJson);
    });
    const Result = JSON.parse(Convert1[1]);
    Result.map((item) => {
      Convert2.push(Number(item.price));
    });// console.log(Convert2); === Data Web PrintWay
    
    const SizeS = [[Convert2[0], Convert2[8], Convert2[16]]];
    const SizeM = [[Convert2[1], Convert2[9], Convert2[17]]];
    const SizeL = [[Convert2[2], Convert2[10], Convert2[18]]];
    const SizeXL = [[Convert2[3], Convert2[11], Convert2[19]]];
    const Size2XL = [[Convert2[4], Convert2[12], Convert2[20]]];
    const Size3XL = [[Convert2[5], Convert2[13], Convert2[21]]];
    const Size4XL = [[Convert2[6], Convert2[14], Convert2[22]]];
    const Size5XL = [[Convert2[7], Convert2[15], Convert2[23]]];
    console.log(SizeS);
    console.log(SizeM);
    console.log(SizeL);
    console.log(SizeXL);
    console.log(Size2XL);
    console.log(Size3XL);
    console.log(Size4XL);
    console.log(Size5XL);

    const ID_Sheet_Paste2 = "1OOsURNAIsGEEc0dQTtNVB9iBiAj9wZtexFL1XsHzbOY"; // ID GG-Sheet
    sheets.spreadsheets.values.update({// - Size S
      auth: client,
      spreadsheetId: ID_Sheet_Paste2,
      range: `Sheet1!Q5`, // collum 2
      valueInputOption: "RAW", // or 'USER_ENTERED' if want format
      resource: {
        values: SizeS,
      },
    });
    sheets.spreadsheets.values.update({// - Size M
      auth: client,
      spreadsheetId: ID_Sheet_Paste2,
      range: `Sheet1!Q6`, // collum 2
      valueInputOption: "RAW", // or 'USER_ENTERED' if want format
      resource: {
        values: SizeM,
      },
    });
    sheets.spreadsheets.values.update({// - Size L
      auth: client,
      spreadsheetId: ID_Sheet_Paste2,
      range: `Sheet1!Q7`, // collum 2
      valueInputOption: "RAW", // or 'USER_ENTERED' if want format
      resource: {
        values: SizeL,
      },
    });
    sheets.spreadsheets.values.update({// - Size XL
      auth: client,
      spreadsheetId: ID_Sheet_Paste2,
      range: `Sheet1!Q8`, // collum 2
      valueInputOption: "RAW", // or 'USER_ENTERED' if want format
      resource: {
        values: SizeXL,
      },
    });
    sheets.spreadsheets.values.update({// - Size 2XL
      auth: client,
      spreadsheetId: ID_Sheet_Paste2,
      range: `Sheet1!Q9`, // collum 2
      valueInputOption: "RAW", // or 'USER_ENTERED' if want format
      resource: {
        values: Size2XL,
      },
    });
    sheets.spreadsheets.values.update({// - Size 3XL
      auth: client,
      spreadsheetId: ID_Sheet_Paste2,
      range: `Sheet1!Q10`, // collum 2
      valueInputOption: "RAW", // or 'USER_ENTERED' if want format
      resource: {
        values: Size3XL,
      },
    });
    sheets.spreadsheets.values.update({// - Size 4XL
      auth: client,
      spreadsheetId: ID_Sheet_Paste2,
      range: `Sheet1!Q11`, // collum 2
      valueInputOption: "RAW", // or 'USER_ENTERED' if want format
      resource: {
        values: Size4XL,
      },
    });
    sheets.spreadsheets.values.update({// - Size 5XL
      auth: client,
      spreadsheetId: ID_Sheet_Paste2,
      range: `Sheet1!Q12`, // collum 2
      valueInputOption: "RAW", // or 'USER_ENTERED' if want format
      resource: {
        values: Size5XL,
      },
    });
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Area get sheets and paste sheets ================================> Pendding
    
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: "1kPMjgrYWRr2jj1HEuS9JLhRYiCfJ-SzdImOY8mJrKVs",
      ranges: ["US!F5", "US!i8", "US!j8"],
    });

    const DataGet = [
      response.data.valueRanges.map((range) => range.values[0][0]),
    ];
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Push Data Sheets

    const newSpreadsheetId = "1OOsURNAIsGEEc0dQTtNVB9iBiAj9wZtexFL1XsHzbOY"; // ID GG-Sheet
    await sheets.spreadsheets.values.update({
      auth: client,
      spreadsheetId: newSpreadsheetId,
      range: `Sheet1!L5`,
      valueInputOption: "RAW", // or 'USER_ENTERED' if want fomat
      resource: {
        values: DataGet,
      },
    });
    console.log("Đã update data on Google-Sheet !");
  } catch (error) {
    res.status(400).json({
      Message:
        "Loi He Thong =============================================+++> ",
      error,
    });
  }
};
