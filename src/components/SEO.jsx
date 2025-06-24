import { Helmet } from 'react-helmet';

export default function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title} | JobPortal</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}