import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, BoxProps, useColorMode } from '@chakra-ui/core';

interface LogoProps extends BoxProps {
  main: string;
  accent?: string;
}

type LogoColors = {
  main: string;
  accent: string;
};

const colors: { light: LogoColors; dark: LogoColors } = {
  light: {
    main: 'black',
    accent: '#32cc2f',
  },
  dark: {
    main: 'white',
    accent: '#48BB46',
  },
};

const Logo: FunctionComponent<LogoProps> = ({ main = '#393939', accent = '#48BB46', ...rest }) => {
  const { colorMode } = useColorMode();

  const [logoColors, setLogoColors] = useState<LogoColors>(colors['dark']);

  useEffect(() => {
    setLogoColors(colors[colorMode]);
  }, [colorMode]);

  return (
    <Box {...rest}>
      <svg height={'100%'} viewBox={'0 0 868 278'} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M205.919 148.421l35.011-81.3491c2.829-6.5709-.213-14.1921-6.803-17.0163-6.583-2.8242-14.218.2129-17.047 6.7909l-39.404 91.5745h28.243z"
          fill={logoColors.main}
        />
        <path
          d="M166.522 174.328l-18.028 41.895c-2.829 6.571.213 14.192 6.803 17.016 6.583 2.824 14.218-.213 17.047-6.791l22.428-52.12h-28.25zM60.4688 136c0-7.18 5.8159-13 12.9916-13H247.477c7.176 0 12.992 5.82 12.992 13s-5.816 13-12.992 13H73.4604c-7.1757 0-12.9916-5.82-12.9916-13z"
          fill={logoColors.accent}
        />
        <path
          d="M89.3659 233.947c-6.6142-2.82-9.6784-10.422-6.8356-16.989L151.443 57.8331c2.843-6.5605 10.507-9.5999 17.129-6.7802 6.614 2.8198 9.678 10.4218 6.835 16.9894L106.494 227.167c-2.843 6.56-10.5068 9.6-17.1281 6.78zM53.0156 21.375H26.1562V256.5h26.8594v21.375H0V0h53.0156v21.375zM814 0h53.156v277.875H814V256.5h27.141V21.375H814V0zM260.138 218.035c4.816 0 8.471-.258 10.965-.774v-17.286c-.86-.258-2.107-.516-3.741-.774s-3.44-.387-5.418-.387c-1.72 0-3.483.129-5.289.387-1.72.258-3.311.731-4.773 1.419-1.376.688-2.494 1.677-3.354 2.967-.86 1.204-1.29 2.752-1.29 4.644 0 3.698 1.161 6.278 3.483 7.74 2.322 1.376 5.461 2.064 9.417 2.064zm-1.29-58.179c5.16 0 9.503.645 13.029 1.935s6.321 3.096 8.385 5.418c2.15 2.322 3.655 5.16 4.515 8.514.946 3.268 1.419 6.88 1.419 10.836v40.893c-2.408.516-6.063 1.118-10.965 1.806-4.816.774-10.277 1.161-16.383 1.161-4.042 0-7.74-.387-11.094-1.161-3.354-.774-6.235-2.021-8.643-3.741-2.322-1.72-4.171-3.956-5.547-6.708-1.29-2.752-1.935-6.149-1.935-10.191 0-3.87.731-7.138 2.193-9.804 1.548-2.666 3.612-4.816 6.192-6.45 2.58-1.72 5.547-2.924 8.901-3.612 3.44-.774 7.009-1.161 10.707-1.161 1.72 0 3.526.129 5.418.387 1.892.172 3.913.516 6.063 1.032v-2.58c0-1.806-.215-3.526-.645-5.16-.43-1.634-1.204-3.053-2.322-4.257-1.032-1.29-2.451-2.279-4.257-2.967-1.72-.688-3.913-1.032-6.579-1.032-3.612 0-6.923.258-9.933.774s-5.461 1.118-7.353 1.806l-1.935-12.642c1.978-.688 4.859-1.376 8.643-2.064 3.784-.688 7.826-1.032 12.126-1.032zM301.57 195.331c0-4.988.774-9.632 2.322-13.932 1.548-4.386 3.741-8.17 6.579-11.352 2.924-3.182 6.45-5.676 10.578-7.482 4.128-1.806 8.772-2.709 13.932-2.709 6.364 0 12.384 1.161 18.06 3.483l-3.354 12.771c-1.806-.774-3.87-1.419-6.192-1.935-2.236-.516-4.644-.774-7.224-.774-6.106 0-10.75 1.935-13.932 5.805-3.182 3.784-4.773 9.159-4.773 16.125 0 6.708 1.505 12.04 4.515 15.996 3.01 3.87 8.084 5.805 15.222 5.805 2.666 0 5.289-.258 7.869-.774s4.816-1.161 6.708-1.935l2.193 12.9c-1.72.86-4.343 1.634-7.869 2.322-3.44.688-7.009 1.032-10.707 1.032-5.762 0-10.793-.86-15.093-2.58-4.214-1.806-7.74-4.257-10.578-7.353-2.752-3.182-4.816-6.923-6.192-11.223-1.376-4.386-2.064-9.116-2.064-14.19zM381.767 187.849c1.978-2.064 4.085-4.257 6.321-6.579 2.236-2.408 4.429-4.773 6.579-7.095 2.15-2.408 4.171-4.687 6.063-6.837 1.978-2.236 3.655-4.171 5.031-5.805h18.447c-4.3 4.816-8.858 9.804-13.674 14.964-4.73 5.16-9.503 10.191-14.319 15.093 2.58 2.15 5.289 4.773 8.127 7.869 2.838 3.01 5.59 6.235 8.256 9.675 2.666 3.44 5.16 6.88 7.482 10.32 2.322 3.44 4.257 6.622 5.805 9.546h-18.06c-1.548-2.666-3.354-5.461-5.418-8.385-1.978-2.924-4.128-5.762-6.45-8.514s-4.687-5.332-7.095-7.74c-2.408-2.494-4.773-4.601-7.095-6.321V229h-15.609v-97.524l15.609-2.58v58.953zM430.444 195.589c0-5.934.86-11.137 2.58-15.609 1.806-4.472 4.171-8.17 7.095-11.094 2.924-3.01 6.278-5.246 10.062-6.708 3.784-1.548 7.654-2.322 11.61-2.322 9.288 0 16.512 2.881 21.672 8.643 5.246 5.762 7.869 14.362 7.869 25.8 0 .86-.043 1.849-.129 2.967 0 1.032-.043 1.978-.129 2.838h-44.505c.43 5.418 2.322 9.632 5.676 12.642 3.44 2.924 8.385 4.386 14.835 4.386 3.784 0 7.224-.344 10.32-1.032 3.182-.688 5.676-1.419 7.482-2.193l2.064 12.771c-.86.43-2.064.903-3.612 1.419-1.462.43-3.182.817-5.16 1.161-1.892.43-3.956.774-6.192 1.032s-4.515.387-6.837.387c-5.934 0-11.094-.86-15.48-2.58-4.386-1.806-7.998-4.257-10.836-7.353-2.838-3.182-4.945-6.88-6.321-11.094-1.376-4.3-2.064-8.987-2.064-14.061zm45.279-6.966c0-2.15-.301-4.171-.903-6.063-.602-1.978-1.505-3.655-2.709-5.031-1.118-1.462-2.537-2.58-4.257-3.354-1.634-.86-3.612-1.29-5.934-1.29-2.408 0-4.515.473-6.321 1.419-1.806.86-3.354 2.021-4.644 3.483-1.204 1.462-2.15 3.139-2.838 5.031-.688 1.892-1.161 3.827-1.419 5.805h29.025zM546.323 175.594c-1.29-.43-3.096-.86-5.418-1.29-2.236-.516-4.859-.774-7.869-.774-1.72 0-3.569.172-5.547.516-1.892.344-3.225.645-3.999.903V229h-15.609v-64.242c3.01-1.118 6.751-2.15 11.223-3.096 4.558-1.032 9.589-1.548 15.093-1.548 1.032 0 2.236.086 3.612.258 1.376.086 2.752.258 4.128.516 1.376.172 2.709.43 3.999.774 1.29.258 2.322.516 3.096.774l-2.709 13.158zM582.356 216.874c5.848 0 10.105-.989 12.771-2.967 2.666-1.978 3.999-4.773 3.999-8.385 0-2.15-.473-3.999-1.419-5.547-.86-1.548-2.15-2.924-3.87-4.128-1.634-1.29-3.655-2.451-6.063-3.483-2.408-1.118-5.16-2.193-8.256-3.225-3.096-1.118-6.106-2.322-9.03-3.612-2.838-1.376-5.375-3.053-7.611-5.031-2.15-1.978-3.913-4.343-5.289-7.095-1.29-2.752-1.935-6.063-1.935-9.933 0-8.084 2.795-14.405 8.385-18.963 5.59-4.644 13.201-6.966 22.833-6.966 5.59 0 10.535.645 14.835 1.935 4.386 1.204 7.826 2.537 10.32 3.999l-5.031 13.158c-2.924-1.634-6.149-2.881-9.675-3.741-3.44-.86-7.009-1.29-10.707-1.29-4.386 0-7.826.903-10.32 2.709-2.408 1.806-3.612 4.343-3.612 7.611 0 1.978.387 3.698 1.161 5.16.86 1.376 2.021 2.623 3.483 3.741 1.548 1.118 3.311 2.15 5.289 3.096 2.064.946 4.3 1.849 6.708 2.709 4.214 1.548 7.955 3.139 11.223 4.773 3.354 1.548 6.149 3.44 8.385 5.676 2.322 2.15 4.085 4.73 5.289 7.74 1.204 2.924 1.806 6.493 1.806 10.707 0 8.084-2.881 14.362-8.643 18.834-5.676 4.386-14.018 6.579-25.026 6.579-3.698 0-7.095-.258-10.191-.774-3.01-.43-5.719-.989-8.127-1.677-2.322-.688-4.343-1.376-6.063-2.064-1.72-.774-3.096-1.462-4.128-2.064l4.773-13.287c2.322 1.29 5.461 2.58 9.417 3.87 3.956 1.29 8.729 1.935 14.319 1.935zM628.801 143.731l15.609-2.58v20.382h23.994v13.029H644.41v27.477c0 5.418.86 9.288 2.58 11.61 1.72 2.322 4.644 3.483 8.772 3.483 2.838 0 5.332-.301 7.482-.903 2.236-.602 3.999-1.161 5.289-1.677l2.58 12.384c-1.806.774-4.171 1.548-7.095 2.322-2.924.86-6.364 1.29-10.32 1.29-4.816 0-8.858-.645-12.126-1.935-3.182-1.29-5.719-3.139-7.611-5.547-1.892-2.494-3.225-5.461-3.999-8.901-.774-3.526-1.161-7.525-1.161-11.997v-58.437zM707.229 218.035c4.816 0 8.471-.258 10.965-.774v-17.286c-.86-.258-2.107-.516-3.741-.774s-3.44-.387-5.418-.387c-1.72 0-3.483.129-5.289.387-1.72.258-3.311.731-4.773 1.419-1.376.688-2.494 1.677-3.354 2.967-.86 1.204-1.29 2.752-1.29 4.644 0 3.698 1.161 6.278 3.483 7.74 2.322 1.376 5.461 2.064 9.417 2.064zm-1.29-58.179c5.16 0 9.503.645 13.029 1.935s6.321 3.096 8.385 5.418c2.15 2.322 3.655 5.16 4.515 8.514.946 3.268 1.419 6.88 1.419 10.836v40.893c-2.408.516-6.063 1.118-10.965 1.806-4.816.774-10.277 1.161-16.383 1.161-4.042 0-7.74-.387-11.094-1.161-3.354-.774-6.235-2.021-8.643-3.741-2.322-1.72-4.171-3.956-5.547-6.708-1.29-2.752-1.935-6.149-1.935-10.191 0-3.87.731-7.138 2.193-9.804 1.548-2.666 3.612-4.816 6.192-6.45 2.58-1.72 5.547-2.924 8.901-3.612 3.44-.774 7.009-1.161 10.707-1.161 1.72 0 3.526.129 5.418.387 1.892.172 3.913.516 6.063 1.032v-2.58c0-1.806-.215-3.526-.645-5.16-.43-1.634-1.204-3.053-2.322-4.257-1.032-1.29-2.451-2.279-4.257-2.967-1.72-.688-3.913-1.032-6.579-1.032-3.612 0-6.923.258-9.933.774s-5.461 1.118-7.353 1.806l-1.935-12.642c1.978-.688 4.859-1.376 8.643-2.064 3.784-.688 7.826-1.032 12.126-1.032zM751.628 143.731l15.609-2.58v20.382h23.994v13.029h-23.994v27.477c0 5.418.86 9.288 2.58 11.61 1.72 2.322 4.644 3.483 8.772 3.483 2.838 0 5.332-.301 7.482-.903 2.236-.602 3.999-1.161 5.289-1.677l2.58 12.384c-1.806.774-4.171 1.548-7.095 2.322-2.924.86-6.364 1.29-10.32 1.29-4.816 0-8.858-.645-12.126-1.935-3.182-1.29-5.719-3.139-7.611-5.547-1.892-2.494-3.225-5.461-3.999-8.901-.774-3.526-1.161-7.525-1.161-11.997v-58.437z"
          fill={logoColors.main}
        />
      </svg>
    </Box>
  );
};

export default Logo;
