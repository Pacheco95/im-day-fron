import React from 'react';

const WhatsAppLink: React.FC = () => {
  const message = encodeURIComponent(
    'Você está disponível para trabalhar hoje?'
  );
  return (
    <a
      href={`https://wa.me/+5531993662423?text=${message}`}
      target="_blank"
      rel="noreferrer"
    >
      <img
        className="transform scale-50 m-0 -ml-3 object-none self-start"
        src="https://img.icons8.com/fluency/48/000000/whatsapp.png"
        alt="whatsapp icon"
      />
    </a>
  );
};

export default WhatsAppLink;
