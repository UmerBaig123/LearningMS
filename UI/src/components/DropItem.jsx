import "./DropItem.css";

const DropItem = ({ title, onClick, icon, style, idName, bar }) => {
  return (
    <>
      <div
        style={{ ...style }}
        id={idName}
        className="dropItem"
        onClick={onClick}
      >
        <div
          style={{
            flexDirection: "row",
            alignItems: "center",
            display: "flex",
          }}
        >
          {icon ? (
            <img
              src={icon}
              style={{
                width: 25,
                height: 25,
                marginRight: 10,
                marginLeft: 10,
              }}
            />
          ) : (
            <></>
          )}
          {title}
        </div>
      </div>
      {bar ? <div className="line" style={{ width: "100%" }} /> : <></>}
    </>
  );
};

export default DropItem;
