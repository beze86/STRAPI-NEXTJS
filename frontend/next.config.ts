import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const generateRemotePatterns = (): Array<{
  protocol: 'http' | 'https' | undefined;
  hostname: string;
  port?: string;
  pathname: string;
}> => {
  const domains =
    process.env.NEXT_PUBLIC_IMAGE_DOMAINS ||
    (isProd ? 'my.future.domain.io' : 'localhost');
  return domains.split(',').map((domain) => {
    const [hostname, port] = domain.split(':');
    return {
      protocol: isProd ? 'https' : 'http',
      hostname,
      port,
      pathname: '/**',
    };
  });
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: generateRemotePatterns(),
  },
};

export default nextConfig;
