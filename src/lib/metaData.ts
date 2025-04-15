import metaData from '@/data/meataData.json';

type Meta = {
  title: string;
  description: string;
  image?: string;
};

type MetaInput =
  | { path: string }
  | { title: string; description: string; image?: string };

export function getMetaData(input: MetaInput) {
  let meta: Meta;

  if ('path' in input) {
    const data = metaData as Record<string, Meta>;
    meta = data[input.path] || {
      title: 'Default Title',
      description: 'Default description for your app.',
    };
  } else {
    meta = {
      title: input.title,
      description: input.description,
      image: input.image,
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: meta.image
      ? {
          images: [
            {
              url: meta.image,
              width: 1200,
              height: 630,
              alt: meta.title,
            },
          ],
        }
      : undefined,
  };
}
