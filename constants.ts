
import { Project, ProjectStatus, Product, GalleryItem, Review } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Emerald Heights Residence',
    description: 'A luxurious sustainable living complex in the heart of the city.',
    status: ProjectStatus.ONGOING,
    image: 'https://picsum.photos/seed/build1/1200/800',
    category: 'Residential',
  },
  {
    id: 'p2',
    title: 'The Obsidian Tower',
    description: 'Modern office skyscraper with state-of-the-art smart systems.',
    status: ProjectStatus.FINISHED,
    image: 'https://picsum.photos/seed/build2/1200/800',
    category: 'Commercial',
    completionDate: 'June 2023'
  },
  {
    id: 'p3',
    title: 'Grand Plaza Renovation',
    description: 'Revitalization of the historic downtown plaza and retail hub.',
    status: ProjectStatus.PLANNED,
    image: 'https://picsum.photos/seed/build3/1200/800',
    category: 'Urban Development',
  },
  {
    id: 'p4',
    title: 'Pine Ridge Villa',
    description: 'Minimalist wood-and-glass retreat integrated into natural slopes.',
    status: ProjectStatus.FINISHED,
    image: 'https://picsum.photos/seed/build4/1200/800',
    category: 'Residential',
    completionDate: 'December 2023'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'pr1',
    name: 'Eco-Ceramic Tiles',
    price: 45.99,
    description: 'High-durability sustainable ceramic tiles for modern interiors.',
    image: 'https://picsum.photos/seed/tile/600/600',
    category: 'Finishing',
    rating: 4.8
  },
  {
    id: 'pr2',
    name: 'Reinforced Steel Beam (6m)',
    price: 189.00,
    description: 'Industrial grade structural support for heavy-duty frameworks.',
    image: 'https://picsum.photos/seed/steel/600/600',
    category: 'Structural',
    rating: 5.0
  },
  {
    id: 'pr3',
    name: 'Smart Insulation Board',
    price: 24.50,
    description: 'Maximum thermal efficiency boards with fire-resistant coating.',
    image: 'https://picsum.photos/seed/iso/600/600',
    category: 'Insulation',
    rating: 4.5
  },
  {
    id: 'pr4',
    name: 'Vertix Premium Cement',
    price: 12.99,
    description: 'Quick-dry, ultra-strong adhesive cement for all-weather building.',
    image: 'https://picsum.photos/seed/cement/600/600',
    category: 'Raw Materials',
    rating: 4.9
  }
];

export const GALLERY: GalleryItem[] = [
  { id: 'g1', url: 'https://picsum.photos/seed/g1/800/800', caption: 'Foundation Pouring', tag: 'Construction' },
  { id: 'g2', url: 'https://picsum.photos/seed/g2/800/800', caption: 'Steel Framework Assembly', tag: 'Infrastructure' },
  { id: 'g3', url: 'https://picsum.photos/seed/g3/800/800', caption: 'Interior Finishing', tag: 'Design' },
  { id: 'g4', url: 'https://picsum.photos/seed/g4/800/800', caption: 'Solar Panel Installation', tag: 'Green Energy' },
  { id: 'g5', url: 'https://picsum.photos/seed/g5/800/800', caption: 'Site Surveying', tag: 'Planning' },
  { id: 'g6', url: 'https://picsum.photos/seed/g6/800/800', caption: 'Landscaping Finalization', tag: 'Design' },
];

export const REVIEWS: Review[] = [
  { id: 'r1', author: 'Mark S.', rating: 5, content: 'Excellent quality of materials. The steel beams were perfect.', date: '2024-01-15', targetId: 'pr2' },
  { id: 'r2', author: 'Elena R.', rating: 4, content: 'Tiles look beautiful, but delivery was a day late.', date: '2024-02-10', targetId: 'pr1' },
];
