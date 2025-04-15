'use client';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://example.com/electronics.jpg',
    description: 'Devices and gadgets',
    icon: 'https://example.com/electronics-icon.png',
    parentIds: null,
    slug: 'electronics',
    isBrand: false,
  },
  {
    id: 2,
    name: 'Fashion',
    image: 'https://example.com/fashion.jpg',
    description: 'Clothing and accessories',
    icon: 'https://example.com/fashion-icon.png',
    parentIds: null,
    slug: 'fashion',
    isBrand: false,
  },
  {
    id: 3,
    name: 'Home & Garden',
    image: 'https://example.com/home-garden.jpg',
    description: 'Furniture and decor',
    icon: 'https://example.com/home-garden-icon.png',
    parentIds: null,
    slug: 'home-and-garden',
    isBrand: false,
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    image: 'https://example.com/sports-outdoors.jpg',
    description: 'Sporting goods and outdoor gear',
    icon: 'https://example.com/sports-outdoors-icon.png',
    parentIds: null,
    slug: 'sports-and-outdoors',
    isBrand: false,
  },
  {
    id: 5,
    name: 'Mobile Phones',
    image: 'https://example.com/mobile-phones.jpg',
    description: 'Smartphones and accessories',
    icon: 'https://example.com/mobile-phones-icon.png',
    parentIds: [1],
    slug: 'mobile-phones',
    isBrand: false,
  },
  {
    id: 6,
    name: 'Laptops',
    image: 'https://example.com/laptops.jpg',
    description: 'Portable computers',
    icon: 'https://example.com/laptops-icon.png',
    parentIds: [1],
    slug: 'laptops',
    isBrand: false,
  },
  {
    id: 7,
    name: 'Samsung',
    image: 'https://example.com/samsung.jpg',
    description: 'Samsung products',
    icon: 'https://example.com/samsung-icon.png',
    parentIds: [5, 6],
    slug: 'samsung',
    isBrand: true,
  },
  {
    id: 8,
    name: 'Apple',
    image: 'https://example.com/apple.jpg',
    description: 'Apple products',
    icon: 'https://example.com/apple-icon.png',
    parentIds: [5],
    slug: 'apple',
    isBrand: true,
  },
  {
    id: 9,
    name: 'Nike',
    image: 'https://example.com/nike.jpg',
    description: 'Nike products',
    icon: 'https://example.com/nike-icon.png',
    parentIds: [2],
    slug: 'nike',
    isBrand: true,
  },
  {
    id: 10,
    name: 'Adidas',
    image: 'https://example.com/adidas.jpg',
    description: 'Adidas products',
    icon: 'https://example.com/adidas-icon.png',
    parentIds: [2],
    slug: 'adidas',
    isBrand: true,
  },
];

export default function Home() {
  interface Category {
    id: number;
    name: string;
    image: string;
    description: string;
    icon: string;
    parentIds: number[] | null;
    slug: string;
    isBrand: boolean;
    children?: Category[];
  }

  class CategoryManager {
    private categories: Category[];
    public tree: Category[];
    public brands: Category[];

    constructor(categories: Category[]) {
      this.categories = categories;
      this.tree = this.buildTree();
      this.brands = this.findBrands();
    }

    private buildTree(): Category[] {
      const map = new Map<number, Category>(
        this.categories.map((c) => [c.id, { ...c, children: [] }])
      );
      const tree: Category[] = [];

      this.categories.forEach((c) => {
        if (!c.parentIds) {
          tree.push(map.get(c.id)!);
        } else {
          c.parentIds.forEach((pid) => {
            const parent = map.get(pid);
            if (
              parent &&
              !parent.children!.some((child) => child.id === c.id)
            ) {
              parent.children!.push(map.get(c.id)!);
            }
          });
        }
      });

      return tree;
    }

    private findBrands(): Category[] {
      return this.categories.filter((category) => category.isBrand);
    }

    public getBrandsByParent(parentId: number): Category[] {
      const descendantIds = new Set<number>();

      const collectDescendantIds = (category: Category) => {
        category.children?.forEach((child) => {
          descendantIds.add(child.id);
          collectDescendantIds(child);
        });
      };

      const parent = this.tree.find((c) => c.id === parentId);
      if (parent) {
        collectDescendantIds(parent);
      }

      return this.brands.filter((brand) =>
        brand.parentIds?.some(
          (pid) => descendantIds.has(pid) || pid === parentId
        )
      );
    }

    public getCategoryPath(categoryId: number): Category[][] {
      const paths: Category[][] = [];
      const category = this.categories.find((c) => c.id === categoryId);
      if (!category) return [];

      const buildPath = (node: Category, currentPath: Category[]) => {
        if (node.id === categoryId) {
          paths.push([...currentPath, node]);
          return;
        }

        node.children?.forEach((child) => {
          buildPath(child, [...currentPath, node]);
        });
      };

      this.tree.forEach((root) => buildPath(root, []));
      return paths;
    }
  }

  // Usage example
  const manager = new CategoryManager(categories);
  console.log('Category Tree:', manager.tree);
  console.log('All Brands:', manager.brands);
  console.log('Electronics Brands:', manager.getBrandsByParent(1));
  console.log('Paths to Samsung:', manager.getCategoryPath(7));
  return <></>;
}
