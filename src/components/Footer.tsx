import Link from 'next/link';
import Image from 'next/image';
import { FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  const socialLinks = [
    { href: "https://x.com/sanam_official", icon: <FaXTwitter className="h-5 w-5" />, name: 'X (formerly Twitter)' },
    { href: "https://www.instagram.com/sanamband/", icon: <FaInstagram className="h-5 w-5" />, name: 'Instagram' },
    { href: "https://www.youtube.com/c/SANAM", icon: <FaYoutube className="h-5 w-5" />, name: 'YouTube' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300 h-full w-full flex items-center">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt="SANAM logo" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-semibold text-white">SANAM</span>
            </div>
            <p className="mt-4 max-w-xs text-sm">
              Music that bridges hearts and generations. India&apos;s most beloved independent band creating authentic connections through melody.
            </p>
            <div className="mt-8 flex gap-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <p className="font-semibold text-white">Quick Links</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><Link href="/music" className="hover:opacity-75">Music</Link></li>
                <li><Link href="/tour" className="hover:opacity-75">Tour Dates</Link></li>
                <li><Link href="/about" className="hover:opacity-75">About Band</Link></li>
                <li><Link href="/merchandise" className="hover:opacity-75">Merchandise</Link></li>
                <li><Link href="/contact" className="hover:opacity-75">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Connect</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li><a href="mailto:management@sanam.in" className="hover:opacity-75">management@sanam.in</a></li>
                {/* Note: Phone number is a placeholder */}
                <li><a href="tel:+919876543210" className="hover:opacity-75">+91 98765 43210</a></li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-center text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} SANAM. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}