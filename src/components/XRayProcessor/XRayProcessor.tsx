import React, { useState } from 'react';
import { Card, Upload, Button, Tabs, Space, Row, Col, Typography, Layout, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title } = Typography;
const { Header, Content } = Layout;

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

      const response = await fetch('your-api-endpoint', { // Replace with your API endpoint
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

  const ImageDisplay: React.FC<{ imageUrl: string | null; title: string }> = ({ imageUrl, title }) => (
    <Card
      title={title}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Typography.Text type="secondary">
              {title === 'Original Image' ? 'No image uploaded' : 'No processed image yet'}
            </Typography.Text>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Header style={{
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Title level={3} style={{ margin: 0 }}>X-Ray Image Processor</Title>
      </Header>

      <Content style={{ 
        padding: '24px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column',
        flex: 1 // Content chiếm toàn bộ không gian
      }}>
        <div style={{ width: '100%' }}> {/* Chiếm toàn bộ chiều rộng để căn giữa */}
          <Tabs
            activeKey={selectedModel}
            items={models}
            onChange={setSelectedModel}
            style={{ marginBottom: 24 }}
          />

          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Upload
              beforeUpload={handleImageUpload}
              accept="image/*"
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} size="large">Upload X-Ray Image</Button>
            </Upload>

            <Row gutter={[24, 24]} style={{ marginTop: 20 }}>
              <Col xs={24} md={12}>
                <ImageDisplay
                  imageUrl={images.original}
                  title="Original Image"
                />
              </Col>
              <Col xs={24} md={12}>
                <ImageDisplay
                  imageUrl={images.processed}
                  title="Processed Image"
                />
              </Col>
            </Row>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
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
          </Space>
        </div>
      </Content>
    </Layout>
  );
};

export default XRayProcessor;