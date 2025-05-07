import React, { useState, useEffect } from 'react';
import { Card, Typography, Pagination, Row, Col } from 'antd';

const { Title } = Typography;

interface GalleryImage {
  id: number;
  original: string;
  processed: string;
}

const XRayGallery: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const imagesPerPage = 5; // Showing 5 pairs per page

  // Load gallery images
  useEffect(() => {
    // In a real application, you would fetch these from an API or import them
    const loadGalleryImages = () => {
      const loadedImages: GalleryImage[] = [];
      const ids1 = ['009', '010', '015', '019','024','030', '034',
        '047', '068', '075','086', '098', '113', '116', '119', '134' , '151'];

      const ids2 = ['007','023', '026', '036', '039'
        ,'050', '060', '061', '062', '073','075', '078', '089'];

      // Generate 60 sample image pairs
      ids1.forEach(id => {
        loadedImages.push({
          id: parseInt(id),
          original: `/images/original/JPCLN${id}.png`,
          processed: `/images/processed/JPCLN${id}.png`
        });
      });

      ids1.forEach(id => {
        loadedImages.push({
          id: parseInt(id),
          original: `/images/original/JPCLN${id}-r.png`,
          processed: `/images/processed/JPCLN${id}-r.png`
        });
      });

      ids2.forEach(id => {
        loadedImages.push({
          id: parseInt(id),
          original: `/images/original/JPCNN${id}.png`,
          processed: `/images/processed/JPCNN${id}.png`
        });
      });

      ids2.forEach(id => {
        loadedImages.push({
          id: parseInt(id),
          original: `/images/original/JPCNN${id}-r.png`,
          processed: `/images/processed/JPCNN${id}-r.png`
        });
      });
      
      
      setGalleryImages(loadedImages);
    };
    
    loadGalleryImages();
  }, []);

  // Get current images for pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage);

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>
        X-Ray Image Gallery - Before and After Bone Removal
      </Title>
      
      <div style={{ marginBottom: '20px' }}>
        {currentImages.map((image) => (
          <Card 
            key={image.id} 
            title={`Image Set ${image.id}`} 
            style={{ marginBottom: '20px' }}
          >
            <Row gutter={24} align="middle">
              <Col span={12}>
                <div style={{ textAlign: 'center' }}>
                  <Typography.Text strong>Original X-Ray</Typography.Text>
                  <div style={{ 
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10px'
                  }}>
                    <img
                      src={image.original}
                      alt={`Original X-Ray ${image.id}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>
              </Col>
              
              <Col span={12}>
                <div style={{ textAlign: 'center' }}>
                  <Typography.Text strong>Processed X-Ray (Bones Removed)</Typography.Text>
                  <div style={{ 
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10px'
                  }}>
                    <img
                      src={image.processed}
                      alt={`Processed X-Ray ${image.id}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={galleryImages.length}
          pageSize={imagesPerPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default XRayGallery;