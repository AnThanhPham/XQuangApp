import React, { useState } from 'react';
import { Card, Upload, Button, Tabs, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title } = Typography;

interface ProcessedImage {
  original: string | null;
  processed: string | null;
}

const XRayProcessor: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('1');
  const [images, setImages] = useState<ProcessedImage>({
    original: null,
    processed: null
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const models: TabsProps['items'] = [
    { key: '1', label: 'Model 1' },
    { key: '2', label: 'Model 2' },
    { key: '3', label: 'Model 3' },
    { key: '4', label: 'Model 4' },
    { key: '5', label: 'Model 5' },
  ];

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages({
        original: reader.result as string,
        processed: null
      });
    };
    reader.readAsDataURL(file);
    return false;
  };

  const processImage = async () => {
    setIsLoading(true);
    try {
      if (!images.original) {
        message.error("Please upload an image first.");
        return;
      }

      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: images.original,
          model: selectedModel
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || response.statusText);
      }

      const result = await response.json();
      setImages(prev => ({
        ...prev,
        processed: result.processedImage
      }));
    } catch (error: unknown) {
      console.error('Error processing image:', error);
      if (error instanceof Error) {
        message.error(`Image processing failed: ${error.message}`);
      } else if (typeof error === 'string') {
        message.error(`Image processing failed: ${error}`);
      } else {
        message.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div style={{
        background: '#fff',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 99,
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0'
        // width: '100%',
        // borderBottom: '1px solid #f0f0f0',
        // background: '#fff',
        // padding: '16px 0',
        // // position: 'fixed',
        // top: 0,
        // zIndex: 1000,
        // display: 'flex',
        // justifyContent: 'center'
      }}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>X-Ray Image Processor</Title>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{
        marginTop: '80px',
      }}>
        {/* Tabs */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Tabs
            activeKey={selectedModel}
            items={models}
            onChange={setSelectedModel}
            centered
          />
        </div>

        {/* Upload Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Upload
            beforeUpload={handleImageUpload}
            accept="image/*"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} size="large">Upload X-Ray Image</Button>
          </Upload>
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
                {images.original ? (
                  <img
                    src={images.original}
                    alt="Original"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <Typography.Text type="secondary">No image uploaded</Typography.Text>
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
                {images.processed ? (
                  <img
                    src={images.processed}
                    alt="Processed"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
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
            disabled={!images.original || isLoading}
            loading={isLoading}
          >
            Process Image
          </Button>
        </div>
      </div>
    </>
  );
};

export default XRayProcessor;