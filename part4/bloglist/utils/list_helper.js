import _ from 'lodash'

export const dummy = (blogs) => 1

export const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

export const favoriteBlog = (blogs) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return sortedBlogs[0]
}

export const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(_.keys(counts), (author) => counts[author])

  return {
    author: topAuthor,
    blogs: counts[topAuthor]
  }
}
