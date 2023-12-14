import * as dotenv from "dotenv";
import { getShortLink } from "./index";

dotenv.config();

test("Should get a unique shorturl without any errors", async () => {
  const response = await getShortLink({
    username: process.env["YOURLS_USERNAME"]!,
    password: process.env["YOURLS_PASSWORD"]!,
    serverUrl: process.env["YOURLS_SERVER_URL"]!,
    // A uniquely generated url
    url: `https://example-${Date.now()}.com`,
  });

  expect(response).toBeDefined();
  expect(response.root.errorCode[0]).toBeFalsy();
  expect(response.root.shorturl[0]).toBeDefined();
});

test("Should try for two requests with same url and should contain error for the second while still having the shortened url in response", async () => {
  const url = `https://example-${Date.now()}.com`;

  const response1 = await getShortLink({
    username: process.env["YOURLS_USERNAME"]!,
    password: process.env["YOURLS_PASSWORD"]!,
    serverUrl: process.env["YOURLS_SERVER_URL"]!,
    url,
  });

  const response2 = await getShortLink({
    username: process.env["YOURLS_USERNAME"]!,
    password: process.env["YOURLS_PASSWORD"]!,
    serverUrl: process.env["YOURLS_SERVER_URL"]!,
    url,
  });

  expect(response1).toBeDefined();
  expect(response2).toBeDefined();
  expect(response2.root.errorCode[0]).toBeTruthy();
  expect(response2.root.shorturl[0]).toBeDefined();
});
