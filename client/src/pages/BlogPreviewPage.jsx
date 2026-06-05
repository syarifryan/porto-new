import React, { useEffect } from 'react';
import BlogPreview from '../components/Blog/BlogPreview';

const BlogPreviewPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <BlogPreview />;
};

export default BlogPreviewPage;
