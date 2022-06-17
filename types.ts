export type Tweet = {
  text: string
  id: string
  author: {
    name: string
    profile_image_url: string
    username: string
    verified: boolean
  }
  media: {
    media_key: string
    width: number
    height: number
    url: string
    type: 'photo' | 'video'
  }[]
  public_metrics: {
    retweet_count: number
    reply_count: number
    like_count: number
    quote_count: number
  }
  created_at: string
  referenced_tweets: Tweet & {
    type: string
  }[]
  type?: string
}
