import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { company } from '../../config/company';

const FloatingContact = () => {
  const whatsappNumber = company.whatsapp.replace(/[^0-9]/g, '');
  const phoneNumber = company.phone.replace(/[^\d+]/g, '');

  if (!whatsappNumber && !phoneNumber) return null;

  return (
    <div className="fixed right-4 bottom-5 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group flex items-center gap-2"
        >
          <span className="rounded-full bg-dark-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100 sm:opacity-100">
            Chat with us
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-xl text-white shadow-xl transition-transform hover:scale-105">
            <FaWhatsapp />
          </span>
        </a>
      )}
      {phoneNumber && (
        <a
          href={`tel:${phoneNumber}`}
          aria-label="Call us"
          className="group flex items-center gap-2"
        >
          <span className="rounded-full bg-dark-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100 sm:opacity-100">
            Call us
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-lg text-white shadow-xl transition-transform hover:scale-105">
            <FaPhoneAlt />
          </span>
        </a>
      )}
    </div>
  );
};

export default FloatingContact;
