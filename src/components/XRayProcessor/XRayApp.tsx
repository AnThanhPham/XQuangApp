import React, { useState } from 'react';
import { Tabs, Typography } from 'antd';
import { AppstoreOutlined, ExperimentOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import XRayProcessor from './XRayProcessor';
import XRayGallery from './XRayGallery';

const { Title } = Typography;

const XRayApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('processor');

  const navTabs: TabsProps['items'] = [
    { 
      key: 'processor', 
      label: (
        <span>
          <ExperimentOutlined />
          Processor
        </span>
      )
    },
    { 
      key: 'gallery', 
      label: (
        <span>
          <AppstoreOutlined />
          Gallery
        </span>
      )
    },
  ];

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
      }}>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>X-Ray Image Processor</Title>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        marginTop: '80px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Tabs
          activeKey={activeTab}
          items={navTabs}
          onChange={setActiveTab}
          centered
          size="large"
          style={{ width: '100%', maxWidth: '600px' }}
        />
      </div>

      {/* Main Content Container */}
      <div style={{ marginTop: '20px' }}>
        {activeTab === 'processor' ? <XRayProcessor /> : <XRayGallery />}
      </div>
    </>
  );
};

export default XRayApp;