
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blog';
import ReactMarkdown from 'react-markdown';
import '../components/Blog/Blog.css';

const BlogDetail = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <main className="blog-detail-container container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem' }}>Post not found</h2>
          <Link to="/blog" className="btn btn-outline">Back to Blog</Link>
        </div>
      </main>
    );
  }

  // Mock markdown content
  const markdownContent = `
# ${post.title}
*Published on ${new Date(post.date).toLocaleDateString()}*

${post.excerpt}

## Introduction
This is a mock markdown content. In a real application, this would be fetched from a .md file or a CMS.

### The Problem
When building modern web applications, we often face challenges with state management and performance.

### The Solution
Here is some example code:
\`\`\`javascript
const greeting = "Hello World";
console.log(greeting);
\`\`\`

## Conclusion
Building this portfolio is a great way to showcase skills.
  `;

  return (
    <main className="blog-detail-container">
      <article className="container">
        <Link to="/blog" className="btn btn-outline" style={{ marginBottom: '3rem' }}>
          <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Back to Blog
        </Link>

        <div className="blog-post-content">
          <header className="blog-detail-header">
            <div className="blog-tags">
              {post.tags.map((tag, i) => (
                <span key={i} className="blog-tag">{tag}</span>
              ))}
            </div>
            <h1 className="blog-detail-title">{post.title}</h1>
            <div className="blog-detail-meta">
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>5 min read</span>
            </div>
          </header>

          <div className="markdown-body">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogDetail;
