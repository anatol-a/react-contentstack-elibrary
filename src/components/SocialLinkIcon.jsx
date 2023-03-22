export default function SocialLinkIcon({ socialLink }) {
  const iconUrl = socialLink?.iconConnection?.edges[0]?.node?.url;

  return (
    <a href={socialLink?.url} className="footer-socials__item" target="_blank">
      <img src={iconUrl} alt={`${socialLink.title} icon`}/>
    </a>
  );
}
