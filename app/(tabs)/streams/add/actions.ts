"use server";

import { z } from "zod";

const title = z.string();
export const startStream = async (_: any, formData: FormData) => {
  const results = title.safeParse(formData.get("title"));

  if (!results.success) {
    return results.error.flatten();
  }

  // cloudflare API 연동(소통)
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
    },
    body: JSON.stringify({
      meta: {
        name: results.data,
      },
      recording: {
        mode: "automatic",
      },
    }),
  });

  const data = await response.json();
  console.log(data);
};
