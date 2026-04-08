import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function researchBatikRifaiyah() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Lakukan riset mendalam tentang Batik Rifaiyah dari Desa Kalipucang Wetan, Batang. Berikan informasi terstruktur dalam bahasa Indonesia yang mencakup: 1. Sejarah dan asal-usul (hubungannya dengan KH Ahmad Rifa'i). 2. Karakteristik unik (filosofi, larangan menggambar makhluk hidup secara utuh). 3. Motif-motif utama (misal: Pelo Ati, Gribigan, Ila-Ili) beserta maknanya. 4. Proses pembuatan (tradisional, kidung/sholawat saat membatik). 5. Kondisi saat ini di Desa Kalipucang Wetan.",
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    return response.text;
  } catch (error) {
    console.error("Research error:", error);
    return null;
  }
}
