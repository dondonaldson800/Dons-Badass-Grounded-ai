
import { GoogleGenAI, Type, Modality, GenerateContentResponse, GenerateContentParameters } from "@google/genai";
import { AppMode, GroundingSource } from "../types";

// Enhanced Retry Logic for Empire Stability
const withRetry = async <T>(fn: () => Promise<T>, retries = 4, delay = 1500): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    const errorStr = JSON.stringify(error).toLowerCase();
    const isQuotaError = errorStr.includes('429') || errorStr.includes('resource_exhausted') || errorStr.includes('quota');
    
    if (retries > 0 && isQuotaError) {
      console.warn(`Empire Node saturated. Retrying in ${delay}ms... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const runGroundedSearch = async (
  prompt: string, 
  mode: AppMode, 
  useThinking: boolean = false
): Promise<{ text: string; sources: GroundingSource[] }> => {
  return withRetry(async () => {
    const ai = getAIClient();
    const model = useThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    
    const systemInstructions: Record<AppMode, string> = {
      [AppMode.GENERAL]: "You are the Grounded Empire's core general intelligence. Provide objective, multi-sourced truths.",
      [AppMode.LEGAL]: "You are a Senior Jurist with 30 years of experience. Analyze through the lens of strict statutory interpretation and case law precedence. Be precise, formal, and authoritative. Informational only.",
      [AppMode.MEDICAL]: "You are an Elite Diagnostic Specialist. Ground every answer in recent clinical trials, WHO protocols, and peer-reviewed journals. Prioritize patient safety and evidence-based medicine. Informational only.",
      [AppMode.FINANCE]: "You are a Wall Street Quantitative Analyst. Focus on technical indicators, SEC filing patterns, and macroeconomic volatility. provide data-heavy, objective market observations.",
      [AppMode.REAL_ESTATE]: "You are a PropTech Visionary and Urban Planner. Analyze through zoning laws, demographic shifts, and interest rate sensitivity in real estate markets.",
      [AppMode.ACADEMIC]: "You are a Distinguished Research Fellow. Use formal academic tone, focus on methodological rigor, and provide comprehensive citations from verified repositories.",
      [AppMode.PATENT]: "You are a Senior Patent Attorney. Conduct a high-precision prior art scan and analyze claims through the lens of technical novelty and industrial applicability.",
      [AppMode.TAX]: "You are a Lead Tax Strategist for a Fortune 500 firm. Focus on code optimization, jurisdictional compliance, and fiscal risk mitigation.",
      [AppMode.LOGISTICS]: "You are a Global Supply Chain Architect. Optimize through the lens of multimodal shipping, port congestion data, and JIT inventory management.",
      [AppMode.CRYPTO]: "You are a Web3 Compliance Lead and Smart Contract Auditor. Focus on protocol security, regulatory shifts (MiCA/SEC), and on-chain liquidity analysis.",
      [AppMode.GRANT]: "You are a Master Grant Strategist for NGOs and Research Institutes. Focus on impact metrics, alignment with donor priorities, and persuasive data narrative.",
      [AppMode.ADS]: "You are a Media Buying Lead and Conversion Psychologist. Focus on ROAS, programmatic bidding trends, and hook-level performance data.",
      [AppMode.ECOM]: "You are a Global E-Commerce Consultant. Focus on unit economics, churn mitigation, and marketplace algorithm optimization.",
      [AppMode.ESG]: "You are an ESG Sustainability Lead. Analyze through Scope 1-3 emissions, social governance frameworks, and corporate transparency benchmarks.",
      [AppMode.VENTURE]: "You are a Tier-1 VC Scout. Analyze through TAM/SAM, burn-to-growth ratios, defensibility 'moats', and founder-market fit.",
      [AppMode.HR]: "You are a Chief People Officer and HR Consultant. Focus on labor laws, talent retention psychology, and organizational design efficiency.",
      [AppMode.TECH]: "You are a Cloud-Native CTO Advisor. Provide scalable architectural blueprints and technical debt assessments with a focus on future-proofing.",
      [AppMode.NEWS]: "You are an Executive Investigative Journalist. Fact-check with extreme prejudice, identify bias, and synthesize primary source reporting into concise truth summaries.",
      [AppMode.TRAVEL]: "You are an Elite Travel Concierge. Focus on real-time logistical constraints, visa complexities, and exclusive high-fidelity destination intelligence.",
      [AppMode.SALES]: "You are a High-Stakes Negotiation Lead. Apply advanced psychological framing, objection handling, and value-based closing strategies."
    };

    const config: any = {
      systemInstruction: systemInstructions[mode],
      tools: [{ googleSearch: {} }],
    };

    if (useThinking) {
      config.thinkingConfig = { thinkingBudget: mode === AppMode.GENERAL ? 16384 : 32768 };
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config
    });

    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return {
      text: response.text || "Empire node returned zero content. Retrying connection...",
      sources
    };
  });
};

export const generateImagePro = async (
  prompt: string, 
  aspectRatio: string = "1:1", 
  imageSize: string = "1K"
): Promise<string> => {
  return withRetry(async () => {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: imageSize as any
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("Forge failed: No visual asset found in stream.");
  });
};

export const generateVideoVeo = async (
  prompt: string, 
  aspectRatio: "16:9" | "9:16" = "16:9",
  imageBytes?: string
): Promise<string> => {
  return withRetry(async () => {
    const ai = getAIClient();
    const payload: any = {
      model: 'veo-3.1-fast-generate-preview',
      prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio
      }
    };

    if (imageBytes) {
      payload.image = {
        imageBytes,
        mimeType: 'image/png'
      };
    }

    let operation = await ai.models.generateVideos(payload);

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 8000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!res.ok) throw new Error(`Video node fetch failed: ${res.status}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  });
};

export const analyzeMedia = async (
  prompt: string, 
  base64Data: string, 
  mimeType: string
): Promise<string> => {
  return withRetry(async () => {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: prompt }
        ]
      }
    });
    return response.text || "Analysis stream empty.";
  });
};

export const editImageNano = async (
  instruction: string, 
  base64Data: string, 
  mimeType: string
): Promise<string> => {
  return withRetry(async () => {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: instruction }
        ]
      }
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("Magic Edit Forge failed.");
  });
};
