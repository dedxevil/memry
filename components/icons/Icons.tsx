import React from 'react';

interface IconProps {
  className?: string;
}

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const BotIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5l.415-.415a.45.45 0 00-.08-.707l-.415-.415a.45.45 0 00-.707.08L7.5 6.75v.75c0 .248.202.45.45.45h.75a.45.45 0 00.45-.45v-.75zm0 0h.375m-3.75 0h.375m-3.75 0h.375m0 0h.375m2.625 0h.375m-3.75 0h.375m-3.75 0h.375m0 0h.375m2.625 0h.375M15.75 7.5l.415-.415a.45.45 0 00-.08-.707l-.415-.415a.45.45 0 00-.707.08L15 6.75v.75c0 .248.202.45.45.45h.75a.45.45 0 00.45-.45v-.75zm0 0h.375m-3.75 0h.375m-3.75 0h.375m0 0h.375m2.625 0h.375m-3.75 0h.375m-3.75 0h.375m0 0h.375m2.625 0h.375m-3.75 1.5a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h3a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-3zm-9 1.5a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h3a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-3z" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const CogIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const MemryLogo: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 374.999991">
    <defs>
      <clipPath id="cb77d5b8c2">
        <path d="M 192 169 L 360.339844 169 L 360.339844 337.828125 L 192 337.828125 Z M 192 169 " clipRule="nonzero" />
      </clipPath>
    </defs>
    <g clipPath="url(#cb77d5b8c2)">
      <path fill="#fe96e2" d="M 276.558594 169.976562 C 322.875 169.976562 360.339844 207.488281 360.339844 253.855469 C 360.339844 300.226562 322.875 337.738281 276.558594 337.738281 C 230.246094 337.738281 192.78125 300.226562 192.78125 253.855469 C 192.78125 207.488281 230.246094 169.976562 276.558594 169.976562 Z M 276.558594 169.976562 " fillOpacity="1" fillRule="nonzero" />
    </g>
    <path fill="#9674ff" d="M 316.753906 161.492188 C 316.847656 183.925781 311.578125 206.074219 301.503906 226.054688 C 277.125 274.96875 227.140625 305.882812 172.542969 305.882812 C 150.140625 305.976562 128.019531 300.699219 108.0625 290.613281 L 28.613281 317.097656 C 21.367188 319.546875 14.589844 312.761719 16.941406 305.597656 L 43.394531 226.054688 C 33.320312 206.074219 28.050781 183.925781 28.144531 161.492188 C 28.144531 106.828125 59.019531 56.785156 107.875 32.375 C 127.925781 22.195312 150.046875 16.917969 172.449219 17.011719 L 180.921875 17.011719 C 254.15625 21.0625 312.707031 79.589844 316.753906 153.011719 Z M 316.753906 161.492188 " fillOpacity="1" fillRule="nonzero" />
    <path fill="#7428ea" d="M 301.410156 226.054688 C 308.753906 211.445312 313.554688 195.800781 315.53125 179.683594 C 303.859375 173.558594 290.585938 169.976562 276.464844 169.976562 C 230.246094 169.976562 192.6875 207.488281 192.6875 253.855469 C 192.6875 271.574219 198.148438 288.070312 207.558594 301.546875 C 247.847656 291.367188 282.394531 264.222656 301.410156 226.054688 Z M 301.410156 226.054688 " fillOpacity="1" fillRule="nonzero" />
    <path fill="#b7b7f9" d="M 229.304688 174.121094 C 229.304688 176.480469 227.421875 178.457031 224.976562 178.457031 L 196.265625 178.457031 L 196.265625 207.203125 C 196.265625 209.558594 194.382812 211.539062 191.933594 211.539062 L 159.269531 211.539062 C 156.917969 211.539062 154.941406 209.652344 154.941406 207.203125 L 154.941406 178.457031 L 126.230469 178.457031 C 123.875 178.457031 121.898438 176.574219 121.898438 174.121094 L 121.898438 141.417969 C 121.898438 139.0625 123.78125 137.082031 126.230469 137.082031 L 154.941406 137.082031 L 154.941406 108.429688 C 154.941406 106.074219 156.824219 104.097656 159.269531 104.097656 L 191.933594 104.097656 C 194.289062 104.097656 196.265625 105.980469 196.265625 108.429688 L 196.265625 137.175781 L 224.976562 137.175781 C 227.328125 137.175781 229.304688 139.0625 229.304688 141.511719 Z M 229.304688 174.121094 " fillOpacity="1" fillRule="nonzero" />
  </svg>
);

export const ChevronDoubleLeftIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
  </svg>
);

export const ChevronDoubleRightIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
);

export const ChatBubbleOvalLeftEllipsisIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const SendIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

export const AlertIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);