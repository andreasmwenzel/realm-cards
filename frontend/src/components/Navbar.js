import React, { useState } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useRealmApp } from "../realm/RealmApp";

export default function Navbar() {
  const { user, logOut } = useRealmApp();
  const profile = user?.profile;
  const email = profile?.email;

  console.log(user);
  let history = useHistory();

  return (
    <Menu
      fixed="top"
      //inverted={!fixed}
      //pointing={!fixed}
      //secondary={!fixed}
      size="large"
      id="Navbar"
    >
      <Container>
        <Menu.Item as="a" onClick={() => history.push("/")}>
          Home
        </Menu.Item>
        <Menu.Item as="a" onClick={() => history.push("/about")}>
          About
        </Menu.Item>
        {email ? (
          <Menu.Item position="right">
            <Button
              as="a"
              style={{ marginLeft: "0.5em" }}
              onClick={() => history.push("/user")}
            >
              {email}
            </Button>
            <Button
              as="a"
              style={{ marginLeft: "0.5em" }}
              onClick={() => {
                logOut();
                history.push("/");
              }}
            >
              Log Out
            </Button>
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <Button as="a" onClick={() => history.push("/login")}>
              Log in
            </Button>
            <Button
              as="a"
              //inverted={!fixed}
              primary
              onClick={() => history.push("/signup")}
              style={{ marginLeft: "0.5em" }}
            >
              Sign Up
            </Button>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
}

// import PropTypes from "prop-types";
// import React, { Component } from "react";
// import {
//   Button,
//   Container,
//   Divider,
//   Icon,
//   Menu,
//   Responsive,
//   Segment,
//   Sidebar,
//   Visibility,
// } from "semantic-ui-react";

// // Heads up!
// // We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// // For more advanced usage please check Responsive docs under the "Usage" section.
// const getWidth = () => {
//   const isSSR = typeof window === "undefined";
//   return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
// };

// class Navbar extends Component {
//   state = {};

//   hideFixedMenu = () => this.setState({ fixed: false });
//   showFixedMenu = () => this.setState({ fixed: true });
//   handleSidebarHide = () => this.setState({ sidebarOpened: false });
//   handleToggle = () => this.setState({ sidebarOpened: true });

//   render() {
//     const { children } = this.props;
//     const { fixed } = this.state;
//     const { sidebarOpened } = this.state;

//     return (
//       <div>
//         <Responsive
//           getWidth={getWidth}
//           minWidth={Responsive.onlyTablet.minWidth}
//         >
//           <Visibility
//             once={false}
//             onBottomPassed={this.showFixedMenu}
//             onBottomPassedReverse={this.hideFixedMenu}
//           >
//             <Segment
//               inverted
//               textAlign="center"
//               style={{ minHeight: 700, padding: "1em 0em" }}
//               vertical
//             >
//               <Menu
//                 fixed={fixed ? "top" : null}
//                 inverted={!fixed}
//                 pointing={!fixed}
//                 secondary={!fixed}
//                 size="large"
//               >
//                 <Container>
//                   <Menu.Item as="a" active>
//                     Home
//                   </Menu.Item>
//                   <Menu.Item as="a">Work</Menu.Item>
//                   <Menu.Item as="a">Company</Menu.Item>
//                   <Menu.Item as="a">Careers</Menu.Item>
//                   <Menu.Item position="right">
//                     <Button as="a" inverted={!fixed}>
//                       Log in
//                     </Button>
//                     <Button
//                       as="a"
//                       inverted={!fixed}
//                       primary={fixed}
//                       style={{ marginLeft: "0.5em" }}
//                     >
//                       Sign Up
//                     </Button>
//                   </Menu.Item>
//                 </Container>
//               </Menu>
//               {children}
//             </Segment>
//           </Visibility>
//         </Responsive>
//         <Responsive
//           as={Sidebar.Pushable}
//           getWidth={getWidth}
//           maxWidth={Responsive.onlyMobile.maxWidth}
//         >
//           <Sidebar
//             as={Menu}
//             animation="push"
//             inverted
//             onHide={this.handleSidebarHide}
//             vertical
//             visible={sidebarOpened}
//           >
//             <Menu.Item as="a" active>
//               Home
//             </Menu.Item>
//             <Menu.Item as="a">Work</Menu.Item>
//             <Menu.Item as="a">Company</Menu.Item>
//             <Menu.Item as="a">Careers</Menu.Item>
//             <Menu.Item as="a">Log in</Menu.Item>
//             <Menu.Item as="a">Sign Up</Menu.Item>
//           </Sidebar>

//           <Sidebar.Pusher dimmed={sidebarOpened}>
//             <Segment
//               inverted
//               textAlign="center"
//               style={{ minHeight: 350, padding: "1em 0em" }}
//               vertical
//             >
//               <Container>
//                 <Menu inverted pointing secondary size="large">
//                   <Menu.Item onClick={this.handleToggle}>
//                     <Icon name="sidebar" />
//                   </Menu.Item>
//                   <Menu.Item position="right">
//                     <Button as="a" inverted>
//                       Log in
//                     </Button>
//                     <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
//                       Sign Up
//                     </Button>
//                   </Menu.Item>
//                 </Menu>
//               </Container>
//               {React.Children.map(this.props.children, (child) => {
//                 return React.cloneElement(child, {
//                   mobile: true,
//                 });
//               })}
//             </Segment>
//           </Sidebar.Pusher>
//         </Responsive>
//       </div>
//     );
//   }
// }
// Navbar.propTypes = {
//   children: PropTypes.node,
// };

// export default Navbar;

/*   
    ====================================
      MOBILE
    ====================================

      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>

 */
