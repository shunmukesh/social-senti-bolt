import axios from 'axios';
import { Platform } from '../../types';

// Initialize platform-specific API clients
const platformApis = {
  Facebook: axios.create({
    baseURL: 'https://graph.facebook.com/v18.0',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_FACEBOOK_API_TOKEN}`
    }
  }),
  
  Instagram: axios.create({
    baseURL: 'https://graph.instagram.com/v18.0',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_INSTAGRAM_API_TOKEN}`
    }
  }),
  
  X: axios.create({
    baseURL: 'https://api.twitter.com/2',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_TWITTER_API_TOKEN}`
    }
  })
};

export async function fetchAccountData(platform: Platform, username: string) {
  try {
    const api = platformApis[platform];
    if (!api) {
      throw new Error(`Unsupported platform: ${platform}`);
    }
    
    // Platform-specific endpoint mapping
    const endpoints = {
      Facebook: `/users/${username}?fields=id,name,picture,created_time,fan_count,friend_count`,
      Instagram: `/users/${username}?fields=id,username,profile_picture,media_count,follower_count,following_count`,
      X: `/users/by/username/${username}?user.fields=created_at,public_metrics,profile_image_url`
    };
    
    const response = await api.get(endpoints[platform]);
    return normalizeAccountData(platform, response.data);
  } catch (error) {
    console.error(`Error fetching account data from ${platform}:`, error);
    throw error;
  }
}

export async function reportAccount(platform: Platform, accountId: string, evidence: any[]) {
  try {
    const api = platformApis[platform];
    
    // Platform-specific report endpoints
    const endpoints = {
      Facebook: '/reports',
      Instagram: '/reports',
      X: '/reports/create'
    };
    
    const response = await api.post(endpoints[platform], {
      account_id: accountId,
      report_type: 'fake_account',
      evidence
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error reporting account to ${platform}:`, error);
    throw error;
  }
}

function normalizeAccountData(platform: Platform, data: any) {
  // Normalize platform-specific data into a common format
  switch (platform) {
    case 'Facebook':
      return {
        id: data.id,
        username: data.name,
        profileImage: data.picture?.data?.url,
        followerCount: data.fan_count,
        followingCount: data.friend_count,
        creationDate: data.created_time
      };
      
    case 'Instagram':
      return {
        id: data.id,
        username: data.username,
        profileImage: data.profile_picture,
        followerCount: data.follower_count,
        followingCount: data.following_count,
        postCount: data.media_count
      };
      
    case 'X':
      return {
        id: data.id,
        username: data.username,
        profileImage: data.profile_image_url,
        followerCount: data.public_metrics.followers_count,
        followingCount: data.public_metrics.following_count,
        postCount: data.public_metrics.tweet_count,
        creationDate: data.created_at
      };
      
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}