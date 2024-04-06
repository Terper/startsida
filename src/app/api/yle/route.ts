import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

const GET = async () => {
  const response = await fetch(
    "https://svenska.yle.fi/nyheter/senaste-nytt.rss"
  );

  const text = await response.text();
  const data = await parseStringPromise(text, {
    trim: true,
    async: true,
    explicitArray: false,
    ignoreAttrs: true,
  });

  const items = data.rss.channel.item;

  return NextResponse.json({
    items: items,
  });
};

export { GET };
