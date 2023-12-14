import * as axios from "axios";
import { parseStringPromise } from "xml2js";

export interface ShortLinkParam {
  username: string;
  password: string;
  serverUrl: string;
  url: string;
}

export interface YourlsResponse {
  root: {
    status: string[];
    code: string[];
    message: string[];
    errorCode: string[];
    statusCode: string[];
    url: Array<null[]>;
    title: string[];
    shorturl: string[];
  };
}

async function parseXml(input: string) {
  try {
    return parseStringPromise(input);
  } catch (err: any) {
    console.error(input);
    throw new Error(
      "Error encountered while parsing the XML, Error:" + err.message
    );
  }
}

export async function getShortLink({
  username,
  password,
  url,
  serverUrl,
}: ShortLinkParam): Promise<YourlsResponse> {
  try {
    const response = await axios.default.get<string>(
      `${serverUrl}?username=${username}&password=${password}&action=shorturl&url=${url}`,
      {
        headers: {
          "Content-Type": "text/xml",
        },
      }
    );

    return parseXml(response.data);
  } catch (err: any) {
    if (err instanceof axios.AxiosError) {
      return parseXml(err.response?.data);
    }

    throw Error(
      "We encountered a non axios error, perhaps there is a problem with XML response."
    );
  }
}
