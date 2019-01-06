
export default class Post {
  constructor(data, type, createdAt, user, dateString) {
    this.data = data
    this.type = type
    this.createdAt = createdAt
    this.user = user
    this.dateString = dateString
  }
}