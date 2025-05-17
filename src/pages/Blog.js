function Blog() {
  const posts = [
    {
      title: 'Top 10 Interview Tips',
      content: 'Prepare thoroughly, research the company, and practice common questions...',
    },
    {
      title: 'How to Write a Winning Resume',
      content: 'Highlight your achievements, use action verbs, and tailor it to the job...',
    },
    {
      title: 'Salary Trends in 2025',
      content: 'IT and healthcare sectors are seeing significant salary increases...',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Career Resources
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{post.content}</p>
            <a
              href="#"
              className="mt-4 inline-block text-primary hover:underline dark:text-blue-400"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;