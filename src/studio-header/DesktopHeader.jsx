import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Skeleton } from '@edx/paragon';
import { Menu, MenuTrigger, MenuContent } from './Menu';
import { LinkedLogo, Logo } from './Logo';
import messages from './Header.messages';
import { CaretIcon, CaretIconV2 } from './Icons';
import useGetConfig from '../hooks/useGetConfig';
import DefaultLogo from '../assets/images/NavLogo-placeholder.svg';

const DesktopHeader = (props) => {
 const renderMainMenu = () => {
   const { mainMenu } = props;

   if (!Array.isArray(mainMenu)) {
     return mainMenu;
   }

   return mainMenu.map((menuItem) => {
     const {
       type,
       href,
       content,
       submenuContent,
     } = menuItem;

     if (type === 'item') {
       return (
         <a key={`${type}-${content}`} className="nav-link" href={href}>{content}</a>
       );
     }

     return (
       <Menu key={`${type}-${content}`} tag="div" className="nav-item" respondToPointerEvents>
         <MenuTrigger tag="a" className="nav-link d-inline-flex align-items-center" href={href}>
           {content} <CaretIcon role="img" aria-hidden focusable="false" />
         </MenuTrigger>
         <MenuContent className="pin-left pin-right shadow py-2">
           {submenuContent}
         </MenuContent>
       </Menu>
     );
   });
 };

 const renderUserMenu = () => {
   const {
     userMenu,
    //  avatar, //temporarily disabled
     username,
     intl,
   } = props;

   return (
     <Menu transitionClassName="menu-dropdown" transitionTimeout={250}>
       <MenuTrigger
         tag="button"
         aria-label={intl.formatMessage(messages['header.label.account.menu.for'], { username })}
         className="btn d-inline-flex align-items-center pl-2 pr-3"
       >
         {/* to march studio design this avatar temporarily disabled */}
         {/* <Avatar size="1.5em" src={avatar} alt="" className="mr-2" /> */}
         {username} <CaretIconV2 role="img" aria-hidden focusable="false" className="ml-2" />
       </MenuTrigger>
       <MenuContent className="mb-0 dropdown-menu show dropdown-menu-right pin-right shadow py-2">
         {userMenu.map(({ type, href, content }) => (
           <a className={`dropdown-${type}`} key={`${type}-${content}`} href={href}>{content}</a>
         ))}
       </MenuContent>
     </Menu>
   );
 };

 const {
   logo,
   logoAltText,
   logoDestination,
   intl,
 } = props;
 const logoProps = { src: logo, alt: logoAltText, href: logoDestination };

 const {
  headerLogo, loading: isLogoLoading,
} = useGetConfig();

const logoContent = logoDestination === null ? <Logo className="logo" src={headerLogo ?? DefaultLogo} alt={logoAltText} /> : <LinkedLogo className="logo" {...logoProps} src={headerLogo ?? DefaultLogo} />;

 return (
   <header className="site-header-desktop">
     <div className="px-5">
       <div className="nav-container position-relative d-flex align-items-center justify-content-center">
         {isLogoLoading ? <Skeleton height={32} width={112} className="mb-1" /> : logoContent}
         {props.courseLockUp}
         <nav
           aria-label={intl.formatMessage(messages['header.label.main.nav'])}
           className="nav main-nav"
         >
           {renderMainMenu()}
         </nav>
         <nav
           aria-label={intl.formatMessage(messages['header.label.secondary.nav'])}
           className="nav secondary-menu-container align-items-center ml-auto"
         >
           {renderUserMenu()}
         </nav>
       </div>
     </div>
   </header>
 );
};

DesktopHeader.propTypes = {
 mainMenu: PropTypes.oneOfType([
   PropTypes.node,
   PropTypes.array,
 ]),
 userMenu: PropTypes.arrayOf(PropTypes.shape({
   type: PropTypes.oneOf(['item', 'menu']),
   href: PropTypes.string,
   content: PropTypes.string,
 })),
 logo: PropTypes.string,
 logoAltText: PropTypes.string,
 logoDestination: PropTypes.string,
 courseId: PropTypes.string,
 avatar: PropTypes.string,
 username: PropTypes.string,
 loggedIn: PropTypes.bool,
 courseLockUp: PropTypes.node.isRequired,
 intl: intlShape.isRequired,
};

DesktopHeader.defaultProps = {
 mainMenu: [],
 userMenu: [],
 logo: null,
 logoAltText: null,
 logoDestination: null,
 courseId: null,
 avatar: null,
 username: null,
 loggedIn: false,
};

export default injectIntl(DesktopHeader);
