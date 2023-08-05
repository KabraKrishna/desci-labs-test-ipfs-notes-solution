import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

const LOCAL_DB = 'public/db_local.json';

import { create } from "ipfs-http-client";

export type BasicIpfsData = {
  cid: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData | any>
) {

  await checkDbExisits();

  if (req.method === "POST") insertNewRecord(req, res);
  else retrieveData(req, res);

}

const insertNewRecord = async (
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData | any>
) => {

  const requestBody = req.body;

  const client = create();
  const response = await client.add(requestBody.data)

  const dbPayLoad: any = {
    cid: response.path,
    type: requestBody.type,
    date: Date.now()
  }

  if (requestBody.type === 0) dbPayLoad['name'] = requestBody.name;

  await storeToDb(dbPayLoad);

  res.status(200).json({ cid: response.path, content: "Added Successfully!" });

}

const retrieveData = async (
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData | any>
) => {

  const query = req.query;

  if (query['cid']) retriveByCid(req, res)
  else {

    const rawList = await fs.readFileSync(LOCAL_DB, 'utf-8');
    const parsedList: Array<any> = JSON.parse(rawList);

    res.status(200).json({ cid: '/', content: parsedList });
  }
};

const retriveByCid = async (
  req: NextApiRequest,
  res: NextApiResponse<BasicIpfsData | any>
) => {

  const cid: any = req.query['cid'];

  const client = create();

  let content: any = '';

  const retrivedData = await client.cat(cid);

  for await (const chunk of retrivedData) { content += chunk.toString() }

  res.status(200).json({ cid, content });
}

const storeToDb = async (value: any) => {

  const rawList = await fs.readFileSync(LOCAL_DB, 'utf-8');

  const parsedList: Array<any> = JSON.parse(rawList);

  parsedList.push(value);

  await fs.writeFileSync(LOCAL_DB, JSON.stringify(parsedList));
}

const checkDbExisits = async () => {

  if (!fs.existsSync(LOCAL_DB)) {
    await fs.writeFileSync(LOCAL_DB, JSON.stringify([]));
  }
}
