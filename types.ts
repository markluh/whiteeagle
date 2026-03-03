
export enum ProjectStatus {
  ONGOING = 'Ongoing',
  FINISHED = 'Finished',
  PLANNED = 'Planned'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  image: string;
  category: string;
  completionDate?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  targetId: string; // ID of product or project
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  tag: string;
}
