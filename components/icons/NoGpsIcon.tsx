import { memo, FC } from "react";
import { SvgXml } from "react-native-svg";

const NoGpsIcon: FC = () => {
  const svgMarkup = `
  <svg width="250" height="200" viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M207 65C210.866 65 214 68.134 214 72C214 75.866 210.866 79 207 79H167C170.866 79 174 82.134 174 86C174 89.866 170.866 93 167 93H189C192.866 93 196 96.134 196 100C196 103.866 192.866 107 189 107H178.826C173.952 107 170 110.134 170 114C170 116.577 172 118.911 176 121C179.866 121 183 124.134 183 128C183 131.866 179.866 135 176 135H93C89.134 135 86 131.866 86 128C86 124.134 89.134 121 93 121H54C50.134 121 47 117.866 47 114C47 110.134 50.134 107 54 107H94C97.866 107 101 103.866 101 100C101 96.134 97.866 93 94 93H69C65.134 93 62 89.866 62 86C62 82.134 65.134 79 69 79H109C105.134 79 102 75.866 102 72C102 68.134 105.134 65 109 65H207ZM207 93C210.866 93 214 96.134 214 100C214 103.866 210.866 107 207 107C203.134 107 200 103.866 200 100C200 96.134 203.134 93 207 93Z" fill="#5FD5D9"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M72.7707 94H71.8228C65.7592 94 60.8438 89.0917 60.8438 83.037C60.8438 76.9824 65.7592 72.0741 71.8228 72.0741C71.8619 72.0741 71.901 72.0743 71.9401 72.0747C72.9161 63.5831 79.8646 57 88.2914 57C97.1731 57 104.413 64.3132 104.748 73.4661C110.118 73.8128 114.844 79.0396 114.844 84.4897C114.844 88.9647 111.53 94 107.604 94H80.302" fill="#55C0C3"/>
<path d="M72.7707 94H71.8228C65.7592 94 60.8438 89.0917 60.8438 83.037C60.8438 76.9824 65.7592 72.0741 71.8228 72.0741C71.8619 72.0741 71.901 72.0743 71.9401 72.0747C72.9161 63.5831 79.8646 57 88.2914 57C97.1731 57 104.413 64.3132 104.748 73.4661C110.118 73.8128 114.844 79.0396 114.844 84.4897C114.844 88.9647 111.53 94 107.604 94H80.302" stroke="#368183" stroke-width="2.5" stroke-linecap="round"/>
<path d="M133.1 139.242C132.924 139.462 132.727 139.663 132.511 139.842C130.801 141.254 128.294 140.993 126.9 139.242C116.618 126.324 108.936 115.134 103.831 105.664C98.7111 96.1666 96.25 88.5216 96.25 82.6608C96.25 63.6341 111.382 48.25 130 48.25C148.618 48.25 163.75 63.6341 163.75 82.6608C163.75 88.5216 161.289 96.1666 156.169 105.664C151.064 115.134 143.382 126.324 133.1 139.242L134.078 140.02L133.1 139.242Z" fill="#55C0C3" stroke="#368183" stroke-width="2.5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M104.023 98.2466C104.862 100.138 105.84 102.139 106.963 104.252C111.743 113.243 118.975 123.94 128.725 136.363C129.311 137.11 130.329 137.206 131.026 136.621C131.117 136.545 131.201 136.459 131.276 136.363C141.026 123.94 148.258 113.243 153.037 104.252C157.855 95.1881 160 88.1869 160 83.0645C160 70.4006 152.701 59.5591 142.27 54.7111C140.87 59.5108 138.96 64.0926 136.601 68.3937C142.252 70.9559 146.191 76.7076 146.191 83.3922C146.191 92.461 138.942 99.8127 130 99.8127C123.974 99.8127 118.718 96.4741 115.93 91.5212C112.216 94.1399 108.23 96.3986 104.023 98.2466Z" fill="#4BA6A9"/>
<path d="M112.921 138.23C113.601 138.109 114.053 137.459 113.931 136.78C113.81 136.1 113.16 135.648 112.481 135.77L112.921 138.23ZM105.508 137.4C104.846 137.598 104.471 138.295 104.669 138.956C104.867 139.618 105.563 139.993 106.225 139.795L105.508 137.4ZM102.206 141.234C102.84 140.961 103.132 140.226 102.859 139.592C102.586 138.958 101.851 138.665 101.217 138.938L102.206 141.234ZM148.047 135.866C147.369 135.74 146.716 136.187 146.59 136.866C146.463 137.545 146.911 138.197 147.59 138.324L148.047 135.866ZM112.481 135.77C109.957 136.221 107.616 136.769 105.508 137.4L106.225 139.795C108.229 139.195 110.476 138.668 112.921 138.23L112.481 135.77ZM101.217 138.938C99.0329 139.878 97.2097 140.963 95.9133 142.191C94.6152 143.421 93.75 144.892 93.75 146.565H96.25C96.25 145.815 96.6302 144.956 97.6326 144.006C98.6367 143.055 100.169 142.111 102.206 141.234L101.217 138.938ZM93.75 146.565C93.75 148.663 95.1011 150.435 97.0049 151.85C98.9322 153.282 101.641 154.519 104.876 155.535C111.362 157.574 120.244 158.815 130 158.815V156.315C120.426 156.315 111.808 155.093 105.626 153.15C102.528 152.177 100.111 151.043 98.496 149.843C96.8576 148.626 96.25 147.504 96.25 146.565H93.75ZM130 158.815C139.756 158.815 148.638 157.574 155.124 155.535C158.359 154.519 161.068 153.282 162.995 151.85C164.899 150.435 166.25 148.663 166.25 146.565H163.75C163.75 147.504 163.142 148.626 161.504 149.843C159.889 151.043 157.472 152.177 154.374 153.15C148.192 155.093 139.574 156.315 130 156.315V158.815ZM166.25 146.565C166.25 143.797 163.925 141.591 160.86 139.937C157.693 138.227 153.258 136.836 148.047 135.866L147.59 138.324C152.665 139.269 156.821 140.598 159.673 142.137C162.627 143.731 163.75 145.302 163.75 146.565H166.25Z" fill="#368183"/>
<circle cx="130" cy="83" r="15.75" stroke="#368183" stroke-width="2.5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M172.789 57.2238C171.875 54.9372 170.063 53.1254 167.776 52.2107L166 51.5L167.776 50.7894C170.063 49.8746 171.875 48.0628 172.789 45.7763L173.5 44L174.211 45.7763C175.125 48.0628 176.937 49.8746 179.224 50.7894L181 51.5L179.224 52.2107C176.937 53.1254 175.125 54.9372 174.211 57.2237L173.5 59L172.789 57.2238Z" stroke="#368183" stroke-width="2.5" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M152.691 128H152C147.582 128 144 124.418 144 120C144 115.582 147.582 112 152 112C152.029 112 152.057 112 152.085 112C152.797 105.804 157.86 101 164 101C170.472 101 175.747 106.337 175.991 113.016C179.904 113.269 183.348 117.083 183.348 121.06C183.348 124.326 180.933 128 178.072 128H158.178" fill="#55C0C3"/>
<path d="M152.691 128H152C147.582 128 144 124.418 144 120C144 115.582 147.582 112 152 112C152.029 112 152.057 112 152.085 112C152.797 105.804 157.86 101 164 101C170.472 101 175.747 106.337 175.991 113.016C179.904 113.269 183.348 117.083 183.348 121.06C183.348 124.326 180.933 128 178.072 128H158.178" stroke="#368183" stroke-width="2.5" stroke-linecap="round"/>
</svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const SvgImage = () => <SvgXml xml={svgMarkup} />;
  return <SvgImage />;
};

export default memo(NoGpsIcon);
