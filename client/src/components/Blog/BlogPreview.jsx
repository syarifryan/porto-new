import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { blogPosts } from '../../data/blog';
import './Blog.css';

const BlogPreview = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="blog" className="section blog-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Notes & Thoughts
        </motion.h2>

        <div className="blog-grid" ref={ref}>
          {blogPosts.map((post, index) => (
            <motion.div 
              key={post.slug}
              className="blog-card neo-card hover-target"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="blog-header">
                <span className="blog-date">
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                <div className="blog-tags">
                  {post.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="blog-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <h3 className="blog-title">
                <Link to={`/blog/${post.slug}`} className="hover-target">{post.title}</Link>
              </h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              
              <Link to={`/blog/${post.slug}`} className="blog-read-more hover-target">
                Read Article <FiArrowRight className="read-more-icon" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
