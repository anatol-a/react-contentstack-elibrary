export default function SocialLinkIcon({ socialLink }) {
  console.log('socialLink - ', socialLink)
  const iconUrl = socialLink?.iconConnection?.edges[0]?.node?.url;

  return (
    <a href={socialLink?.url} className="footer-socials__item">
      <img src={iconUrl} alt={`${socialLink.title} icon`}/>
    </a>
  );
}
