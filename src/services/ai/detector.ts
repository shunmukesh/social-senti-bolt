import * as tf from '@tensorflow/tfjs';
import { Account } from '../../types';

// Load pre-trained model for account analysis
let model: tf.LayersModel | null = null;

export async function initializeModel() {
  try {
    // In a real application, this would load from a hosted model
    model = await tf.loadLayersModel('/models/fake-account-detector.json');
    return true;
  } catch (error) {
    console.error('Failed to load AI model:', error);
    return false;
  }
}

export async function analyzeAccount(account: Partial<Account>): Promise<{
  confidenceScore: number;
  detectionReasons: string[];
}> {
  if (!model) {
    throw new Error('AI model not initialized');
  }

  // Extract features for analysis
  const features = extractAccountFeatures(account);
  
  // Convert features to tensor
  const inputTensor = tf.tensor2d([features]);
  
  // Get prediction
  const prediction = model.predict(inputTensor) as tf.Tensor;
  const confidenceScore = (await prediction.data())[0];
  
  // Clean up tensors
  inputTensor.dispose();
  prediction.dispose();
  
  // Generate detection reasons
  const detectionReasons = generateDetectionReasons(account, features, confidenceScore);
  
  return {
    confidenceScore,
    detectionReasons
  };
}

function extractAccountFeatures(account: Partial<Account>): number[] {
  const features = [];
  
  // Account age in days
  const creationDate = account.creationDate ? new Date(account.creationDate) : new Date();
  const accountAge = (new Date().getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24);
  features.push(accountAge);
  
  // Follower/Following ratio
  const followerRatio = account.followerCount && account.followingCount 
    ? account.followerCount / account.followingCount 
    : 0;
  features.push(followerRatio);
  
  // Post frequency (posts per day)
  const postsPerDay = account.postCount ? account.postCount / accountAge : 0;
  features.push(postsPerDay);
  
  // Bio analysis
  if (account.bio) {
    const suspiciousTerms = new Set([
      'official', 'verified', 'real', 'authentic', 'genuine',
      'dm', 'message', 'contact', 'urgent', 'emergency',
      'classified', 'confidential', 'secret', 'restricted'
    ]);
    
    const words = account.bio.toLowerCase().split(/\s+/);
    const suspiciousCount = words.filter(word => suspiciousTerms.has(word)).length;
    features.push(suspiciousCount / words.length);
  } else {
    features.push(0);
  }
  
  // Network analysis
  const networkScore = account.networkConnections 
    ? account.networkConnections.reduce((acc, conn) => acc + conn.suspiciousScore, 0) / account.networkConnections.length
    : 0;
  features.push(networkScore);
  
  return features;
}

function generateDetectionReasons(
  account: Partial<Account>, 
  features: number[], 
  confidenceScore: number
): string[] {
  const reasons: string[] = [];
  
  // Account age
  if (features[0] < 30) {
    reasons.push('Recently created account (less than 30 days old)');
  }
  
  // Follower ratio
  if (features[1] > 100) {
    reasons.push('Suspicious follower-to-following ratio');
  }
  
  // Post frequency
  if (features[2] > 24) {
    reasons.push('Unusually high posting frequency (more than 24 posts per day)');
  }
  
  // Bio analysis
  if (features[3] > 0.3) {
    reasons.push('Bio contains suspicious terminology');
  }
  
  // Network analysis
  if (features[4] > 0.7) {
    reasons.push('Strong connections to other suspicious accounts');
  }
  
  // Add confidence-based reason
  if (confidenceScore > 0.8) {
    reasons.push('Multiple behavioral patterns match known fake account characteristics');
  }
  
  return reasons;
}