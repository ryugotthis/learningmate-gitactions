import React from 'react';

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="110"
    height="40"
    viewBox="0 0 110 40"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_1449_10846)">
      <path
        d="M8.42871 26.859L10.2214 23.5248C10.283 23.4097 10.3925 23.3509 10.502 23.3509V9L8.42871 26.859Z"
        fill="#038E56"
      />
      <path
        d="M9.9402 9.34787L1.08612 25.8178C0.837509 26.2808 1.1477 26.859 1.64491 26.859H8.42574L10.499 9C10.2823 9 10.0634 9.11514 9.9402 9.34787Z"
        fill="#23AC6F"
      />
      <path
        d="M10.4995 23.3509C10.609 23.3509 10.7162 23.4097 10.7801 23.5248L12.5728 26.859L10.4995 9V23.3509Z"
        fill="#038E56"
      />
      <path
        d="M19.9124 25.8178L11.0606 9.34787C10.9351 9.11514 10.7185 9 10.4995 9L12.5705 26.859H19.3513C19.8508 26.859 20.161 26.2808 19.9124 25.8178Z"
        fill="#23AC6F"
      />
      <path
        d="M10.7664 30.8297C10.6478 31.06 10.3514 31.06 10.2351 30.8297L9.35251 29.1053L8.46996 27.3809C8.35137 27.1506 8.49961 26.8591 8.73678 26.8591H10.4996H12.2624C12.4996 26.8591 12.6478 27.1482 12.5292 27.3809L11.6467 29.1053L10.7664 30.8297Z"
        fill="#038E56"
      />
    </g>
    <path
      d="M28.754 13.698H33.452C34.622 13.698 35.216 14.274 35.216 15.444V18.81C35.216 19.98 34.622 20.556 33.452 20.556H30.59C30.41 20.556 30.338 20.628 30.338 20.808V23.148C30.338 23.328 30.41 23.4 30.59 23.4H31.148C32.786 23.4 33.938 23.292 35.414 23.076C36.098 22.968 36.638 23.202 36.764 23.94C36.908 24.678 36.458 25.2 35.774 25.308C34.37 25.542 32.516 25.686 30.896 25.686H29.312C28.142 25.686 27.53 25.11 27.53 23.94V20.052C27.53 18.882 28.214 18.306 29.384 18.306H32.174C32.354 18.306 32.426 18.252 32.426 18.036V16.254C32.426 16.074 32.354 15.984 32.174 15.984H28.754C28.052 15.984 27.53 15.588 27.53 14.85C27.53 14.094 28.052 13.698 28.754 13.698ZM38.636 18.054V14.22C38.636 13.374 39.23 12.906 40.076 12.906C40.922 12.906 41.516 13.374 41.516 14.22V28.296C41.516 29.142 40.922 29.61 40.076 29.61C39.23 29.61 38.636 29.142 38.636 28.296V20.466H36.872C36.116 20.466 35.576 20.07 35.576 19.26C35.576 18.45 36.116 18.054 36.872 18.054H38.636ZM54.6373 20.79V14.22C54.6373 13.374 55.2313 12.906 56.0773 12.906C56.9233 12.906 57.5173 13.374 57.5173 14.22V20.79C57.5173 21.636 56.9233 22.104 56.0773 22.104C55.2313 22.104 54.6373 21.636 54.6373 20.79ZM51.6313 22.482C55.1053 22.482 57.5173 23.652 57.5173 26.136C57.5173 28.62 55.1053 29.79 51.6313 29.79C48.1573 29.79 45.7453 28.62 45.7453 26.136C45.7453 23.652 48.1573 22.482 51.6313 22.482ZM51.6313 27.594C53.3413 27.594 54.6373 27.162 54.6373 26.136C54.6373 25.11 53.3413 24.678 51.6313 24.678C49.9213 24.678 48.6253 25.11 48.6253 26.136C48.6253 27.162 49.9213 27.594 51.6313 27.594ZM46.8433 14.544V18.432C46.8433 18.612 46.8973 18.684 47.0773 18.684H47.5813C49.0393 18.684 50.6773 18.522 51.8293 18.342C52.5133 18.234 53.0533 18.45 53.1793 19.17C53.3233 19.908 52.8913 20.484 52.1533 20.61C50.6233 20.88 48.9133 20.988 47.3833 20.988H45.7813C44.5933 20.988 43.9993 20.412 43.9993 19.224V14.544C43.9993 13.734 44.6113 13.23 45.4213 13.23C46.2313 13.23 46.8433 13.734 46.8433 14.544ZM70.8006 14.31V27.864C70.8006 28.674 70.3326 29.088 69.5226 29.088C68.7126 29.088 68.2446 28.674 68.2446 27.864V20.214H66.6966V23.544C66.6966 24.714 66.1386 25.236 64.9686 25.236H61.1706C60.0006 25.236 59.4606 24.714 59.4606 23.544V15.354C59.4606 14.184 60.0006 13.662 61.1706 13.662H64.9686C66.1386 13.662 66.6966 14.184 66.6966 15.354V17.982H68.2446V14.31C68.2446 13.5 68.7126 13.086 69.5226 13.086C70.3326 13.086 70.8006 13.5 70.8006 14.31ZM74.3466 14.148V28.368C74.3466 29.178 73.8606 29.61 73.0506 29.61C72.2406 29.61 71.7546 29.178 71.7546 28.368V14.148C71.7546 13.338 72.2406 12.906 73.0506 12.906C73.8606 12.906 74.3466 13.338 74.3466 14.148ZM64.1766 22.698V16.2C64.1766 15.984 64.1226 15.93 63.9066 15.93H62.2866C62.0886 15.93 62.0346 15.984 62.0346 16.2V22.698C62.0346 22.914 62.0886 22.968 62.2866 22.968H63.9066C64.1226 22.968 64.1766 22.914 64.1766 22.698ZM87.2477 28.278V14.238C87.2477 13.374 87.8417 12.906 88.6877 12.906C89.5517 12.906 90.1277 13.374 90.1277 14.238V28.278C90.1277 29.142 89.5517 29.61 88.6877 29.61C87.8417 29.61 87.2477 29.142 87.2477 28.278ZM85.1237 19.494C85.1237 23.076 83.6117 25.416 80.4257 25.416C77.2397 25.416 75.7277 23.076 75.7277 19.494C75.7277 15.912 77.2397 13.572 80.4257 13.572C83.6117 13.572 85.1237 15.912 85.1237 19.494ZM80.4257 23.004C81.8657 23.004 82.3157 21.438 82.3157 19.494C82.3157 17.55 81.8657 15.984 80.4257 15.984C78.9857 15.984 78.5357 17.55 78.5357 19.494C78.5357 21.438 78.9857 23.004 80.4257 23.004ZM104.437 15.966H96.769C96.571 15.966 96.517 16.02 96.517 16.218V17.226H104.167C104.923 17.226 105.409 17.586 105.409 18.342C105.409 19.098 104.923 19.44 104.167 19.44H96.517V20.592C96.517 20.79 96.571 20.844 96.769 20.844H104.617C105.373 20.844 105.859 21.24 105.859 21.996C105.859 22.752 105.373 23.148 104.617 23.148H95.509C94.339 23.148 93.727 22.572 93.727 21.402V15.408C93.727 14.238 94.339 13.662 95.509 13.662H104.437C105.193 13.662 105.679 14.058 105.679 14.814C105.679 15.57 105.193 15.966 104.437 15.966ZM106.453 27.54H92.953C92.143 27.54 91.657 27.126 91.657 26.316C91.657 25.506 92.143 25.092 92.953 25.092H106.453C107.263 25.092 107.749 25.506 107.749 26.316C107.749 27.126 107.263 27.54 106.453 27.54Z"
      fill="#17AF6D"
    />
    <defs>
      <clipPath id="clip0_1449_10846">
        <rect width="19" height="22" fill="white" transform="translate(1 9)" />
      </clipPath>
    </defs>
  </svg>
);

export default Logo;
