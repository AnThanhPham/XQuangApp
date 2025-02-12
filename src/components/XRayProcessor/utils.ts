export const processImageAPI = async (imageData: string, modelId: string) => {
  try {
    const response = await fetch('your-api-endpoint', {
      method: 'POST',
      body: JSON.stringify({
        image: imageData,
        model: modelId
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

export const MODELS = [
  { id: "model1", name: "Model 1" },
  { id: "model2", name: "Model 2" },
  { id: "model3", name: "Model 3" },
  { id: "model4", name: "Model 4" },
  { id: "model5", name: "Model 5" },
];