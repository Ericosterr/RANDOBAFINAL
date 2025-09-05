import type { RequestHandler } from "express";
import axios from "axios";

export const handleBitrixContact: RequestHandler = async (req, res) => {
  const raw = process.env.BITRIX_WEBHOOK_URL;
  if (!raw) {
    return res.status(500).json({ error: { message: "Missing BITRIX_WEBHOOK_URL server env" } });
  }

  const base = raw.endsWith("/") ? raw : `${raw}/`;

  try {
    const { name, email, phone, subject, message, source } = req.body ?? {};

    const payload = {
      fields: {
        TITLE: subject || "Website Contact",
        NAME: name || "",
        PHONE: phone ? [{ VALUE: String(phone), VALUE_TYPE: "WORK" }] : [],
        EMAIL: email ? [{ VALUE: String(email), VALUE_TYPE: "WORK" }] : [],
        COMMENTS: message || "",
        SOURCE_ID: "WEB",
        UTM_SOURCE: source || "website",
        OPENED: "Y",
      },
      params: { REGISTER_SONET_EVENT: "Y" },
    };

    const url = `${base}crm.lead.add.json`;
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });

    const data = response.data;
    if (data && data.result) {
      return res.json({ ok: true, leadId: data.result });
    }

    // Normalized error shape from Bitrix response
    const messageOut = data?.error_description || data?.error?.description || "Unknown Bitrix error";
    return res.status(400).json({ ok: false, error: { message: messageOut }, raw: data });
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data;
    const messageOut = data?.error_description || data?.error?.description || err?.message || "Unknown error";
    return res.status(status).json({ error: { message: messageOut }, raw: data });
  }
};
