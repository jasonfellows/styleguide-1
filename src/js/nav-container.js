import React from 'react';
import localLinks from 'local-links';

import View from './components/view/view';

export default React.createClass({
  displayName: 'NavContainer',

  componentDidMount() {
    this.makeActiveLink();
  },

  componentDidUpdate() {
    this.makeActiveLink();
  },

  makeActiveLink() {
    let self = this;
    let pathname = window.location.pathname;
    let navItems = self.refs.navList.getDOMNode().querySelectorAll('.nav-item');

    for(let i = 0; i < navItems.length; i++) {
      let link = navItems.item(i).children.item(0);

      if(localLinks.active(link, pathname)) {
        navItems.item(i).classList.add('bg-grey-3');
        navItems.item(i).classList.remove('blue-light');
        navItems.item(i).classList.add('blue');
        console.log(navItems.item(i).classList);
      } else {
        navItems.item(i).classList.remove('bg-grey-3');
        navItems.item(i).classList.add('blue-light');
        navItems.item(i).classList.remove('blue');
      }
    }
  },

  handleClick(e) {
    let pathname = localLinks.getLocalPathname(e);

    if(pathname){
      e.preventDefault();
      window.router.history.navigate(pathname, {trigger: true});
    } else {
      return false;
    }
  },

  render() {
    return (
      <div className="main flex tall">
        <View />
        <nav className="nav nav-primary col-2 tall bg-grey-95 white" role="navigation" onClick={this.handleClick}>
          <ul className="nav-list" ref="navList">
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/">Home</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/layout">Layout</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/base">Base Styles</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/nav">Navigation</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/tables">Tables + Lists</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/forms">Forms</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/buttons">Buttons</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/icons">Icons</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/popovers">Popovers</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/modals">Modals</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/view">View</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/cards">Cards</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/animations">Animations</a></li>
            <li className="nav-item py3 px4 blue-light"><a className="nav-link semibold" href="/accordions">Accordions</a></li>
          </ul>
        </nav>
        <section className="content-container col-10 flex-auto tall">{this.props.children}</section>
      </div>
    );
  }
});
