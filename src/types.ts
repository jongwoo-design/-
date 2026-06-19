/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Types for the Fun Company Application Platform

export interface Application {
  id: string;
  name: string;
  phone: string;
  birthDate: string; // YYYY-MM-DD
  gender: string;
  residence: string; // Jung-gu resident check
  motivation: string;
  interests: string[]; // ['cafe', 'wood', 'leather', 'mentoring', 'project']
  submittedAt: string;
  status: 'pending' | 'interviewing' | 'accepted' | 'completed';
  diagnosticScore: {
    isolation: number; // LSNS simplified score (0-12)
    seclusion: number; // HQ simplified score (0-12)
  };
}

export interface ActivityDiary {
  id: string;
  title: string;
  category: 'cafe' | 'wood' | 'leather' | 'emotion' | 'campaign';
  stage: string;
  author: string;
  date: string;
  content: string;
  imageUrl?: string;
  tags: string[];
}

export interface CheeringMessage {
  id: string;
  nickname: string;
  message: string;
  emoji: string;
  createdAt: string;
  phone?: string;
}
