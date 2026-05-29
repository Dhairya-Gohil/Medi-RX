// Updated & Fixed Version

import axios from "axios";
import Chat from "../models/Chat.js";
import DoctorReview from "../models/DoctorReview.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* APIs */
const ML_API = "http://127.0.0.1:8000/predict";
const RAG_API = "http://127.0.0.1:8001/chat";

/* Gemini */
const genAI = new GoogleGenerativeAI(
  ""
);

/* =========================
   SEND MESSAGE
========================= */

export const sendMessage = async (req, res) => {

  try {

    const { message, chatId } = req.body;

    if (!message?.trim()) {

      return res.status(400).json({
        error: "Message required"
      });
    }

    /* =========================
       GEMINI MODEL
    ========================= */

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    /* =========================
       DETECT LANGUAGE
    ========================= */

    const detectPrompt = `
Detect language of this text.

Return ONLY one word:
english
hindi
gujarati

Text:
${message}
`;

    const detectResult =
      await model.generateContent(
        detectPrompt
      );

    const detectedLanguage =
      detectResult.response
        .text()
        .trim()
        .toLowerCase();

    /* =========================
       TRANSLATE TO ENGLISH
    ========================= */

    let englishMessage = message;

    if (
      detectedLanguage === "hindi" ||
      detectedLanguage === "gujarati"
    ) {

      const translatePrompt = `
Translate this medical symptom text to English.

Return ONLY translated English text.

Text:
${message}
`;

      const translated =
        await model.generateContent(
          translatePrompt
        );

      englishMessage =
        translated.response
          .text()
          .trim();
    }

    /* =========================
       ML PREDICTION
    ========================= */

    const mlResponse = await axios.post(
      ML_API,
      {
        symptoms: englishMessage
      }
    );

    const predictionData = mlResponse.data;

    const diseases =
      predictionData?.results?.map(
        (item) => item.disease
      ) || [];

    /* =========================
       GENERATE DISEASE RESPONSES
    ========================= */

    const diseaseResponses = [];

    for (const diseaseObj of predictionData.results) {

      const diseasePrompt = `
You are MediRx AI Assistant.

IMPORTANT:
- Explain ONLY this disease:
${diseaseObj.disease}

STRICT RULES:
- Ignore all other diseases
- Use ONLY medicines provided
- Reply in same language as user
- Plain clean text only
- No markdown
- No **
- No bullet points
- No numbered lists
- No ---
- Keep formatting clean

USER LANGUAGE:
${detectedLanguage}

Symptoms:
${englishMessage}

Medicines:
${JSON.stringify(
  diseaseObj.medicines
)}

Generate EXACTLY in this format:

Disease Name:
...

Why it matches symptoms:
...

Recommended Medicines:
Medicine Name:
Price:
Dosage:
Safety / Pregnancy / Contraindications:
Advice:
...

Warning:
...
`;

      const diseaseResponse =
        await axios.post(
          RAG_API,
          {
            message: diseasePrompt
          }
        );

      diseaseResponses.push({

        disease:
          diseaseObj.disease,

        response:
          diseaseResponse.data.reply
      });
    }

    /* =========================
       FINAL CLEAN RESPONSE
    ========================= */

    const finalReply =
      diseaseResponses;

    /* =========================
       OPTIONAL TRANSLATION
    ========================= */

    let translatedReply = finalReply;

    if (detectedLanguage === "hindi") {

      const hindiPrompt = `
Translate this medical response to Hindi.

IMPORTANT:
- Keep formatting same
- Do not add markdown
- Keep medicine names unchanged

Response:
${finalReply}
`;

      const hindiResult =
        await model.generateContent(
          hindiPrompt
        );

      translatedReply =
        hindiResult.response.text();
    }

    if (detectedLanguage === "gujarati") {

      const gujaratiPrompt = `
Translate this medical response to Gujarati.

IMPORTANT:
- Keep formatting same
- Do not add markdown
- Keep medicine names unchanged

Response:
${finalReply}
`;

      const gujaratiResult =
        await model.generateContent(
          gujaratiPrompt
        );

      translatedReply =
        gujaratiResult.response.text();
    }

    /* =========================
       FIND OR CREATE CHAT
    ========================= */

    let chat;

    if (chatId) {

      chat = await Chat.findById(chatId);
    }

    if (!chat) {

      chat = await Chat.create({

        user: req.user.id,

        title:
          message.substring(0, 40),

        messages: []
      });
    }

    /* =========================
       PUSH USER MESSAGE
    ========================= */

    chat.messages.push({

      role: "user",

      content: message
    });

    /* =========================
       PUSH AI MESSAGE
    ========================= */

    chat.messages.push({

      role: "assistant",

      content:  JSON.stringify(translatedReply),

      reviewStatus: "pending",

      doctorNotes: ""
    });

    await chat.save();

    /* =========================
       CREATE DOCTOR REVIEW
    ========================= */

    await DoctorReview.create({

      user: req.user.id,

      chat: chat._id,

      symptoms: message,

      aiResponse: diseaseResponses,

      predictedDiseases:
        predictionData.results,

      status: "pending"
    });

    /* =========================
       RESPONSE
    ========================= */

    res.json({

      success: true,

      prediction:
        predictionData.results,

      diseases,

      reply: translatedReply,

      chatId: chat._id,

      messages: chat.messages
    });

  } catch (error) {

    console.log(
      "ERROR in sendMessage:",
      error?.response?.data ||
      error.message
    );

    res.status(500).json({

      error:
        "Failed to generate response"
    });
  }
};

/* =========================
   GET CHAT HISTORY
========================= */

export const getChatHistory = async (
  req,
  res
) => {

  try {

    const chats = await Chat.find({

      user: req.user.id

    }).sort({
      updatedAt: -1
    });

    const formattedChats =
      chats.map((chat) => ({

        id: chat._id,

        title: chat.title,

        messages: chat.messages,

        updatedAt: chat.updatedAt
      }));

    res.json(formattedChats);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      error:
        "Failed to load history"
    });
  }
};