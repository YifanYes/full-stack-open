export const dummy = (blogs) => 1

export const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)
