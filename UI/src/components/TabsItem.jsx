import "./tabsItem.css";

const TabsItem = ({ title, onClick, icon, style, idName, selected }) => {
  return (
    <>
      <div
        style={style}
        id={idName}
        onClick={onClick}
        className={selected ? "tab selected" : "tab"}
      >
        <img
          src={icon}
          style={{ width: 40, height: 40, marginRight: 25, marginLeft: 25 }}
        />
        {title}
      </div>
    </>
  );
};

export default TabsItem;
