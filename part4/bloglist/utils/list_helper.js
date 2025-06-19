export const dummy = (blogs) => 1

export const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

export const favoriteBlog = (blogs) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return sortedBlogs[0]
}
