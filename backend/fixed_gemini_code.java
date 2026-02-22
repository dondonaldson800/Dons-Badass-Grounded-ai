package com.example;

import com.google.common.collect.ImmutableList;
import com.google.genai.Client;
import com.google.genai.ResponseStream;
import com.google.genai.types.*;
import com.google.gson.Gson;
import org.apache.tika.mime.MimeTypeException;
import org.apache.tika.mime.MimeTypes;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * GeminiImageGenerator - Fixed version
 * Generates images and text using Google Gemini 3 Pro Image Preview
 */
public class GeminiImageGenerator {
  
  /**
   * Saves binary content to a file
   */
  static void saveBinaryFile(String fileName, byte[] content) {
    try {
      FileOutputStream out = new FileOutputStream(fileName);
      out.write(content);
      out.close();
      System.out.println("Saved file: " + fileName);
    } catch (IOException e) {
      System.err.println("Error saving file: " + e.getMessage());
    }
  }

  public static void main(String[] args) {
    // Get API key from environment
    String apiKey = System.getenv("GEMINI_API_KEY");
    if (apiKey == null || apiKey.isEmpty()) {
      System.err.println("ERROR: GEMINI_API_KEY environment variable not set");
      return;
    }

    // Initialize client
    Client client = Client.builder().apiKey(apiKey).build();
    Gson gson = new Gson();
    MimeTypes allTypes = MimeTypes.getDefaultMimeTypes();

    // Setup Google Search tool
    List<Tool> tools = new ArrayList<>();
    tools.add(
      Tool.builder()
        .googleSearch(GoogleSearch.builder())
        .build()
    );

    // Configure model
    String model = "gemini-3-pro-image-preview";
    
    // User prompt - customize this
    String userPrompt = "Create a futuristic logo for a tech company called 'Empire AI' with dark theme and neon accents";
    
    List<Content> contents = ImmutableList.of(
      Content.builder()
        .role("user")
        .parts(ImmutableList.of(Part.fromText(userPrompt)))
        .build()
    );

    // Generation config
    GenerateContentConfig config = GenerateContentConfig
      .builder()
      .imageConfig(
        ImageConfig
          .builder()
          .aspectRatio("16:9")
          .imageSize("1K")
          .personGeneration("allow")
          .build()
      )
      .responseModalities(ImmutableList.of("IMAGE", "TEXT"))
      .tools(tools)
      .build();

    // Generate content
    System.out.println("Generating content with prompt: " + userPrompt);
    ResponseStream<GenerateContentResponse> responseStream = 
      client.models.generateContentStream(model, contents, config);

    int imageCount = 0;
    
    // Process response
    for (GenerateContentResponse res : responseStream) {
      if (res.candidates().isEmpty() || 
          res.candidates().get().get(0).content().isEmpty() || 
          res.candidates().get().get(0).content().get().parts().isEmpty()) {
        continue;
      }

      List<Part> parts = res.candidates().get().get(0).content().get().parts().get();
      
      for (Part part : parts) {
        if (part.inlineData().isPresent()) {
          // Handle image data
          String fileName = "generated_image_" + imageCount;
          Blob inlineData = part.inlineData().get();
          String fileExtension;
          
          try {
            fileExtension = allTypes.forName(
              inlineData.mimeType().orElse("image/png")
            ).getExtension();
          } catch (MimeTypeException e) {
            fileExtension = ".png";
          }
          
          saveBinaryFile(fileName + fileExtension, inlineData.data().get());
          imageCount++;
        } else {
          // Handle text response
          System.out.println("Text response: " + part.text());
        }
      }
    }

    responseStream.close();
    System.out.println("Generation complete. Created " + imageCount + " image(s).");
  }
}
