import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({currentUser, openEditProfileModal, handleLogOut}) {

  const getInitial = (name) => {
    if (name) {
      return name[0].toUpperCase();
    }
    return "?";
  }; 

  return (
    <div className="sidebar__content">
      <div className="sidebar__profile">
     {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="Profile avatar"
                className="sidebar__avatar"
              />
            ) : (
              <div className="sidebar__placeholder">
                {getInitial(currentUser.name)}
              </div>
            )}
      <p className="sidebar__username">{currentUser.name}</p>
      </div>
    <div className="sidebar__btns">
      <button className="sidebar__edit-profile" type="button" onClick={openEditProfileModal}>Change profile data</button>
      <button className="sidebar__logout" type="button" onClick={handleLogOut}>Log out</button>
    </div>
    </div> 
    );
 
}

export default SideBar;
