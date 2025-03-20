import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url, type }) => {
  const baseUrl = 'https://d1530z8p59hoso.cloudfront.net';
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />{' '}
      {/* SEO(검색 엔진) 최적화에 사용 */}
      {/* 🔹 SNS 공유 미리보기 (OG 태그)  */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url ? `${baseUrl}/${url}` : baseUrl} />
      <meta property="og:type" content={type} />
      {/* 🔹 Twitter 카드 설정  */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/${image}`} />
    </Helmet>
  );
};

export default SEO;
