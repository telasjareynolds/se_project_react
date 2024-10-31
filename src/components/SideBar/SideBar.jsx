import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar__content">
      <img src={avatar} alt="Profile avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Matt Rife</p>
    </div>
  );
}

export default SideBar;
