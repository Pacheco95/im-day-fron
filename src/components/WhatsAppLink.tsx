import React from 'react';
import { DateTime } from 'luxon';

interface WhatsAppLinkProps {
  date: DateTime;
}

const WhatsAppLink = ({ date }: WhatsAppLinkProps): JSX.Element => {
  const dateStr = date.toFormat('dd/MM (EEEE)');
  const message = `Olá! Você está disponível para trabalhar no dia ${dateStr}?`;

  return (
    <a href={`https://wa.me/?text=${message}`} target="_blank" rel="noreferrer">
      <img
        className="transform scale-50 m-0 -ml-3 object-none self-start"
        src="https://img.icons8.com/fluency/48/000000/whatsapp.png"
        alt="whatsapp icon"
      />
    </a>
  );
};

export default WhatsAppLink;
