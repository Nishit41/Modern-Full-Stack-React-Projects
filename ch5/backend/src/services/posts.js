import { Post } from '../db/models/post.js'


export async function createPost({ title, author, contents, tags }) {
    const post = new Post({ title, author, contents, tags })
    return await post.save()
  }

  export async function getPostById(postId) {
    return await Post.findById(postId)
  }

  async function listPosts(
    query = {},
    { sortBy = 'createdAt', sortOrder = 'descending' } = {},
  ) {  return await Post.find(query).sort({ [sortBy]: sortOrder })
}
export async function deletePost(postId) {
  return await Post.findByIdAndDelete(postId);
}

export async function updatePost(postId, updateData) {
    return await Post.updateOne(
      { _id: postId },  
      { $set: updateData } 
    );
}

export async function listAllPosts(options) {
    return await listPosts({}, options)
  }

  export async function listPostsByAuthor(author, options) {
    return await listPosts({ author }, options)
  }

  export async function listPostsByTag(tags, options) {
    return await listPosts({ tags }, options)
  }

