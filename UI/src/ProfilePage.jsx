import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import { useState } from "react";

const ProfilePage = ({ userData, refresh }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      {editMode ? (
        <ProfileEdit
          userData={userData}
          setEdit={setEditMode}
          refresh={refresh}
        />
      ) : (
        <Profile userData={userData} setEdit={setEditMode} />
      )}
    </>
  );
};

export default ProfilePage;
