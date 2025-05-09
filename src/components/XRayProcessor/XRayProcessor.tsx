import React, { useState, useEffect } from 'react';
import { Card, Select, Button, Tabs, Typography, message, Spin } from 'antd';
import type { TabsProps } from 'antd';

interface ProcessedImage {
  originalPath: string | null;
  processedPath: string | null;
}

interface ImageFile {
  name: string;
  path: string;
}

const XRayProcessor: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('1');
  const [availableImages, setAvailableImages] = useState<ImageFile[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<ProcessedImage>({
    originalPath: null,
    processedPath: null
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(true);

  const models: TabsProps['items'] = [
    { key: 'cnn', label: 'CNN' },
    { key: 'rug', label: 'Res-UNet-GAN' },
    { key: 'aub', label: 'Att-UNet-Base' },
    { key: 'aus', label: 'Att-UNet-Small' },
    { key: 'aut', label: 'Att-UNet-Tiny' },
  ];

  const API_ENDPOINT = 'http://localhost:8000';

  // Fetch available images on component mount
  useEffect(() => {
    fetchAvailableImages();
  }, []);

  const fetchAvailableImages = async () => {
    setIsLoadingImages(true);
    try {
      const response = await fetch(`${API_ENDPOINT}/list-images`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      // Map image names to objects with path and name
      const imageFiles = data.images.map((filename: string) => ({
        name: filename,
        path: `/images/original/${filename}`
      }));
      
      setAvailableImages(imageFiles);
    } catch (error) {
      console.error("Error fetching images:", error);
      message.error('Failed to load available images!');
    } finally {
      setIsLoadingImages(false);
    }
  };

  const handleImageSelect = (filename: string) => {
    setSelectedImage(filename);
    setImages({
      originalPath: `/images/original/${filename}`,
      processedPath: null
    });
  };

  const processImage = async () => {
    if (!selectedImage) {
      message.error("Please select an image first.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINT}/process-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: selectedImage,
          model: selectedModel
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      setImages({
        originalPath: result.originalPath,
        processedPath: result.processedPath
      });

      message.success('Image retrieved successfully!');
    } catch (error) {
      console.error("Error retrieving image:", error);
      message.error(error instanceof Error ? error.message : 'Failed to retrieve processed image!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Tabs */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Tabs
          activeKey={selectedModel}
          items={models}
          onChange={setSelectedModel}
          centered
        />
      </div>

      {/* Image Selection */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Select
          style={{ width: 300 }}
          placeholder={isLoadingImages ? "Loading images..." : "Select an X-Ray Image"}
          loading={isLoadingImages}
          onChange={handleImageSelect}
          value={selectedImage}
          options={availableImages.map(img => ({ value: img.name, label: img.name }))}
        />
      </div>

      {/* Image Cards */}
      <div style={{ 
        width: '100%',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ flex: '1 0' }}>
          <Card title="Original Image" style={{ width: '100%' }}>
            <div style={{ 
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {images.originalPath ? (
                <img
                  src={images.originalPath}
                  alt="Original"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <Typography.Text type="secondary">No image selected</Typography.Text>
              )}
            </div>
          </Card>
        </div>

        <div style={{ flex: '1 0' }}>
          <Card title="Processed Image" style={{ width: '100%' }}>
            <div style={{ 
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {isLoading ? (
                <Spin tip="Processing..." />
              ) : images.processedPath ? (
                <img
                  src={images.processedPath}
                  alt="Processed"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <Typography.Text type="secondary">No processed image yet</Typography.Text>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Process Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
          type="primary"
          size="large"
          onClick={processImage}
          disabled={!selectedImage || isLoading}
          loading={isLoading}
        >
          Show Processed Image
        </Button>
      </div>
    </>
  );
};

export default XRayProcessor;