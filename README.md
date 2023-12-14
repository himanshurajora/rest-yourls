# Rest Yourls

A simple rest client for generating short urls from `Yourls` backend.

Example:

```typescript
  const response = await getShortLink({
    username: process.env["YOURLS_USERNAME"]!,
    password: process.env["YOURLS_PASSWORD"]!,
    serverUrl: process.env["YOURLS_SERVER_URL"]!,
    // A uniquely generated url
    url: `https://example-${Date.now()}.com`,
  });

    console.log(response); // Should be completely typed and expected output

```

Thanks for reading!

By Vedik Dev: Himanshu Jangid @himanshurajora
