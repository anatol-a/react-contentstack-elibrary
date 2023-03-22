import HeroSection from "../sections/HeroSection";
import ImgTextSection from '../sections/ImgTextSection';
import CTALineSection from '../sections/CTALineSection';
import LastBooksSection from '../sections/LastBooksSection';
import IconTextBucketsSection from '../sections/IconTextBucketsSection';
// import LastBooksSection from './LastBooksSection';

export default function RenderComponents(props) {
  const { pageComponents, contentTypeUid, entryUid, locale } =
    props;
  return (
    <div data-pageref={entryUid} data-contenttype={contentTypeUid} data-locale={locale}>
      {pageComponents?.map(( component, key ) => {
        if (component.hero) {
          return (
            <HeroSection
              content={component.hero}
              key={`component-${key}`}
            />
          );
        }
        if (component.img_text) {
          return (
            <ImgTextSection
              content={component.img_text}
              key={`component-${key}`}
            />
          );
        }
        if (component.cta_line) {
          return (
            <CTALineSection
              content={component.cta_line}
              key={`component-${key}`}
            />
          );
        }
        if (component.last_books) {
          return (
            <LastBooksSection
              content={component.last_books}
              key={`component-${key}`}
            />
          );
        }
        if (component.icon_text_buckets) {
          return (
            <IconTextBucketsSection
              content={component.icon_text_buckets}
              key={`component-${key}`}
            />
          );
        }
      })}
    </div>
  );
}
