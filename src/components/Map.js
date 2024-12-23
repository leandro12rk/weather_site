
function Map(longitude, latitude) {
  return (
    <iframe
      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7881.234579617418!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca84fe8130bfb%3A0x2fc975ffce312d0c!2sBethania%2C%20Panama%20City%2C%20Panam%C3%A1%20Province!5e0!3m2!1sen!2spa!4v1734973847176!5m2!1sen!2spa`}
      width="600"
      height="450"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
  );
}
