import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/all';
import { useState, useContext } from 'react';
import Switch from 'react-switch';
import { shade } from 'polished';

import './Header.css';

export default function Header() {
  const [sideBar, setSideBar] = useState(false);

  return (
      <div className="header">
        Object Cloud
      </div>
  )
}