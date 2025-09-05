import type { RequestHandler } from "express";
import axios from "axios";

export const handleBitrixContact: RequestHandler = async (req, res) => {
  const BITRIX_WEBHOOK_URL = process.env.BITRIX_WEBHOOK_URL;
  if (!BITRIX_WEBHOOK_URL) {
    return res.status(500).json({ error: "Missing BITRIX_WEBHOOK_URL server env" });
  }

  try {
    const { name, email, phone, subject, message, source } = req.body ?? {};

    const payload = {
      fields: {
        TITLE: subject || "Website Contact - Courses",
        NAME: name || "",
        PHONE: phone ? [{ VALUE: String(phone), VALUE_TYPE: "WORK" }] : [],
        EMAIL: email ? [{ VALUE: String(email), VALUE_TYPE: "WORK" }] : [],
        COMMENTS: message || "",
        SOURCE_ID: "WEB",
        UTM_SOURCE: source || "courses",
      },
      params: { REGISTER_SONET_EVENT: "Y" },
    };

    const url = `${BITRIX_WEBHOOK_URL}crm.lead.add.json`;
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 15000,
    });

    if (response.data && response.data.result) {
      return res.json({ ok: true, leadId: response.data.result });
    }

    return res.status(400).json({ ok: false, data: response.data });
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data || { message: err?.message || "Unknown error" };
    return res.status(status).json({ error: data });
  }
};
