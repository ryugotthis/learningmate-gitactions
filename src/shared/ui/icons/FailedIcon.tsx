const FailedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.2032 14.5469L13.4375 6.6875H10.7344L10.9688 14.5469H13.2032ZM10.6719 16.7344C10.6563 17.5312 11.2969 18.1562 12.0782 18.1562C12.8282 18.1562 13.4844 17.5312 13.5 16.7344C13.4844 15.9688 12.8282 15.3438 12.0782 15.3438C11.2969 15.3438 10.6563 15.9688 10.6719 16.7344Z"
      fill="#ff485e"
    />
  </svg>
);
export default FailedIcon;
