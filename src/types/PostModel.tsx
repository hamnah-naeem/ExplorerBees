export interface PostModel {
    id: string;
    event_name: string;
    description: string;
    is_media: string;
    user_email: string;
    repost_id: string;
    location: string;
    location_address: string;
    hive_id: string;
    is_private: string;
    is_question: string;
    is_poll: string;
    is_poll_type: string;
    poll_end_date: string;
    is_featured: string;
    is_buzz: string;
    event_id: string;
    is_event: string;
    event_start_date: string;
    event_end_date: string;
    created_at: string;
    time: string;
    is_following: string;
    total_likes: string;
    total_comments: string;
    total_reposts: string;
    username: string;
    name: string;
    user_image: string;
    account_verify: string;
    weighted_score: string;
    is_like: string;
    shared_post: string;
    media: any[]; // Or replace with a more specific type if known
    tags: any[];  // Or replace with a more specific type if known
    suggested_post: number;
}